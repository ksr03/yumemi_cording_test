import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Checkbox from './Checkbox';

interface prefectureType {
  prefCode: number
  prefName: string 
  isChecked: boolean
}

interface responseType {
  message: string
  result: prefectureType[]
}

function CheckboxList(): JSX.Element {
  const baseURL = 'https://opendata.resas-portal.go.jp/'

  // 都道府県データのリスト
  const [prefList, setPrefList] = useState<prefectureType[] | null>(null)
  
  /**
   * 指定された都道府県のisCheckedを反転させる
   * @param prefCode 指定する都道府県のprefCode 
   */
  const handleIsChecked: (prefCode: number) => void = (prefCode) => {
    setPrefList(prev => {
      if (prev === null) return null;
      return prev.map(pref => {
        if(pref.prefCode === prefCode) {
          return {
            ...pref,
            isChecked: !pref.isChecked
          }
        }
        return pref
      })
    })
  }

  useEffect(() => {
    // 都道府県データを取得
    axios
    .get<responseType>(baseURL + 'api/v1/prefectures', {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
    .then((response) => {
      const newPrefList = response.data.result.map((pref) => ({
        ...pref,
        isChecked: false
      }))
      setPrefList(newPrefList)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  return (
    <div className='checkbox-container'>
      <h2 className='checkbox-title'>都道府県</h2>
      <div className='checkbox-wrapper'>
        {prefList?.map((item, index) => {
          return <Checkbox key={index} prefCode={item.prefCode} prefName={item.prefName} handleIsChecked={handleIsChecked}/>
        })}
      </div>
    </div>
  )
}

export default CheckboxList