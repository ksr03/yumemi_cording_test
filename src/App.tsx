import React, { useState } from 'react';
import './style/App.css';
import CheckboxList from './components/CheckboxList';
import Graph from './components/Graph';
import Title from './components/Title';
import SelectBox from './components/SelectBox';
import type { prefType } from './types/prefType';
import type { optionType } from './types/optionType';

function App(): JSX.Element  {
  // 選択された都道府県のリスト
  const [prefList, setPrefList] = useState<prefType[]>([])
  const handlePrefList: (newPrefList: prefType[]) => void = (newPrefList) => {
    setPrefList(newPrefList)
  }
  
  // セレクトボックスの選択
  const [selectedOption, setOption] = useState<optionType>('総人口')
  const handleOption: (value: optionType) => void = (value) => {
    setOption(value)
  }

  return (
    <div className='App'>
      <div className='main-container'>
        <Title/>
        <CheckboxList prefList={prefList} handlePrefList ={handlePrefList}/>
        <div>
          <SelectBox handleOption={handleOption}/>
          <Graph prefList={prefList} selectedOption={selectedOption}/>
        </div>
      </div>
    </div>
  );
}

export default App;
