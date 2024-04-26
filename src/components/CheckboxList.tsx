import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';
import type { prefType } from '../types/prefType';
import { baseURL } from '../data/baseURL';

interface responseType {
  message: string
  result: prefType[]
}

interface Props {
  prefList: prefType[]
  updatePrefList: (target: prefType) => void
}

function CheckboxList(props: Props): JSX.Element {
  // 取得した全都道府県のデータ
  const [prefData, setPrefData] = useState<prefType[]>([])

  useEffect(() => {
    // 全都道府県データを取得
    axios
    .get<responseType>(baseURL + 'api/v1/prefectures', {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
    .then((response) => {
      setPrefData(response.data.result)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);
  
  return (
    <div className='checkbox-container'>
      <h2 className='checkbox-title'>都道府県</h2>
      <div className='checkbox-wrapper'>
        {prefData?.map((item, index) => {
          return <Checkbox key={index} pref={item} updatePrefList={props.updatePrefList}/>
        })}
      </div>
    </div>
  )
}

export default CheckboxList