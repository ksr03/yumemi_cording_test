import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import type { prefType } from '../types/prefType';
import { getPrefectures } from '../hooks/getPrefectures';

interface Props {
  prefList: prefType[]
  handlePrefList: (target: prefType[]) => void
}

function CheckboxList(props: Props): JSX.Element {
  // 都道府県のデータ
  const [prefData, setPrefData] = useState<prefType[]>([])
  // 選択された都道府県のリスト
  const [prefList, setPrefList] = useState<prefType[]>([])

  /**
   * 都道府県のデータを取得してセットする
   */
  const fetchData = async(): Promise<void> => {
    try {
      setPrefData(await getPrefectures())
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * チェックされた都道府県をリストに追加する
   * @param target 対象となる都道府県
   */
  const updatePrefList: (target: prefType) => void = (target) => {
    setPrefList(prev => {
      // リストに都道府県があれば削除する
      if (prev?.some((pref) => pref.prefCode === target.prefCode))
        return prev.filter((pref) => pref !== target)
      // リストに都道府県が無ければ追加する
      else 
        return [...prev, target];
    })
  }

  useEffect(() => {
    fetchData().catch(error => {
      console.error(error)
    })
  }, []);

  useEffect(() => {
    props.handlePrefList(prefList)
  }, [prefList])
  
  return (
    <div className='pref-container'>
      <h2 className='checkbox-title'>都道府県</h2>
      <div className='checkbox-container'>
        {prefData?.map((pref, index) => {
          return <Checkbox key={index} pref={pref} updatePrefList={updatePrefList}/>
        })}
      </div>
    </div>
  )
}

export default CheckboxList