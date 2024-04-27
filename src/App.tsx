import React, { useState } from 'react';
import './App.css';
import CheckboxList from './components/CheckboxList';
import Graph from './components/Graph';
import Title from './components/Title';
import SelectBox from './components/SelectBox';
import type { prefType } from './types/prefType';
import type { optionType } from './types/optionType';

function App(): JSX.Element  {
  // 選択された都道府県のリスト
  const [prefList, setPrefList] = useState<prefType[]>([])
  // セレクトボックスの選択
  const [option, setOption] = useState<optionType>('総人口')
  const handleOption: (value: optionType) => void = (value) => {
    setOption(value)
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

  return (
    <div className='App'>
      <div className='main-container'>
        <Title/>
        <CheckboxList prefList={prefList} updatePrefList ={updatePrefList}/>
        <div>
          <SelectBox handleOption={handleOption}/>
          <Graph prefList={prefList} option={option}/>
        </div>
      </div>
    </div>
  );
}

export default App;
