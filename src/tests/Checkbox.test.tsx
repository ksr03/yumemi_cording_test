import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from '../components/Checkbox'
import { dummyPrefData } from '../data/dummyPrefData'

// updatePrefListをモック化する
const mockUpdatePrefList = jest.fn()

test('チェックボックスをクリックすると、updatePrefListが呼び出される', () => {
  // コンポーネントをレンダリング
  const { getByLabelText } = render(
    <Checkbox pref={dummyPrefData[0]} updatePrefList={mockUpdatePrefList} />,
  )

  // チェックボックス要素を取得してクリックする
  const checkbox = getByLabelText(dummyPrefData[0].prefName)
  fireEvent.click(checkbox)

  // updatePrefListが呼び出されたことを確認する
  expect(mockUpdatePrefList).toHaveBeenCalledWith(dummyPrefData[0])
})
