import React from 'react';

interface Props {
  prefCode: number
  prefName: string
  handleIsChecked: (prefCode: number) => void
}

function Checkbox(props: Props): JSX.Element {
  // チェックボックスをクリックしたらisCheckedを反転させる
  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    props.handleIsChecked(props.prefCode)
  }
  return (
    <>
      <label className='checkbox-label'>
        <input className='checkbox' type='checkbox' name='test' onChange={onChange}/>
        {props.prefName}
      </label>
    </>
  )
}

export default Checkbox