import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from '../components/Checkbox'
import { dummyPrefData } from '../data/dummyPrefData'

test('チェックボックスをクリックすると、updatePrefListが呼び出される', () => {
  const mockUpdatePrefList = jest.fn()
  
  const { getByLabelText } = render(
    <Checkbox pref={dummyPrefData[0]} updatePrefList={mockUpdatePrefList} />,
  )

  const checkbox = getByLabelText(dummyPrefData[0].prefName)
  fireEvent.click(checkbox)

  expect(mockUpdatePrefList).toHaveBeenCalledWith(dummyPrefData[0])
})
