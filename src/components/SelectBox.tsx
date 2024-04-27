import React from 'react';
import type { optionType } from '../types/optionType';

interface Props {
    handleOption: (value: optionType) => void
}

function SelectBox(props: Props): JSX.Element {
  return (
    <div className='select-box-wrapper' data-testid='select-box' defaultValue='総人口' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {props.handleOption(event.target.value as optionType)}}>
      <select className='select-box'>
        <option value='総人口'>総人口</option>
        <option value='年少人口'>年少人口</option>
        <option value='生産年齢人口'>生産年齢人口</option>
        <option value='老年人口'>老年人口</option>
      </select>
    </div>
  )
}

export default SelectBox