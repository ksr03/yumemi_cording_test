import React from 'react'
import type { prefType } from '../types/prefType'

interface Props {
  pref: prefType
  updatePrefList: (pref: prefType) => void
}

function Checkbox(props: Props): JSX.Element {
  // チェックボックスをクリックしたらリストに追加する
  const onChange: () => void = () => {
    props.updatePrefList(props.pref)
  }
  return (
    <>
      <label className="checkbox-wrapper">
        <input
          className="checkbox"
          type="checkbox"
          name="test"
          onChange={onChange}
        />
        {props.pref.prefName}
      </label>
    </>
  )
}

export default Checkbox
