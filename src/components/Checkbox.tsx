import React from 'react';
import type { prefType } from '../types/prefType';

interface Props {
  pref: prefType
  updatePrefList: (pref: prefType) => void
}

function Checkbox(props: Props): JSX.Element {
  // チェックボックスをクリックしたらリストに追加する
  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    props.updatePrefList(props.pref)
  }
  return (
    <>
      <label className='checkbox-label'>
        <input className='checkbox' type='checkbox' name='test' onChange={onChange}/>
        {props.pref.prefName}
      </label>
    </>
  )
}

export default Checkbox