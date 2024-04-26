import React from 'react';

interface Props {
    handleOption: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SelectBox(props: Props): JSX.Element {
  return (
    <div className='select-box-wrapper' defaultValue='総人口' onChange={props.handleOption}>
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