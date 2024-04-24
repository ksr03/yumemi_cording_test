import React from 'react';

interface Props {
    prefName: string
}

function Checkbox(props: Props): JSX.Element {
  return (
    <>
      <label className='checkbox-label'>
        <input className='checkbox' type='checkbox' name='test'/>
        {props.prefName}
      </label>
    </>
  )
}

export default Checkbox