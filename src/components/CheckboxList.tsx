import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Checkbox from './Checkbox';

interface prefectureType {
  prefCode: number
  prefName: string 
}

interface prefectureListType {
  message: string
  result: prefectureType[]
}

function CheckboxList(): JSX.Element {
  // 都道府県のリスト
  const [prefectureList, setPrefectureList] = useState<prefectureType[] | null>(null)

  useEffect(() => {
    axios
    .get<prefectureListType>('https://opendata.resas-portal.go.jp/api/v1/prefectures', {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
    .then((response) => {
      setPrefectureList(response.data.result)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  return (
    <div className='checkbox-container'>
      <h2 className='checkbox-title'>都道府県</h2>
      <div className='checkbox-wrapper'>
        {prefectureList?.map((item, index) => {
          return <Checkbox key={index} prefName={item.prefName}/>
        })}
      </div>
    </div>
  )
}

export default CheckboxList