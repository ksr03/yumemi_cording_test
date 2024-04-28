import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import CheckboxList from '../components/CheckboxList'
import { dummyPrefData } from '../data/dummyPrefData'

describe('CheckboxList', () => {
  test('都道府県毎のチェックボックスが表示される', async () => {
    const mockHandlePrefList = jest.fn()

    const { getByText } = render(
      <CheckboxList prefList={[]} handlePrefList={mockHandlePrefList} />
    )

    await waitFor(() => {
      // 各都道府県のチェックボックスが表示されることを確認
      dummyPrefData.forEach((pref) => {
        expect(getByText(pref.prefName)).toBeInTheDocument()
      })
    })
  })

  test('都道府県を選択すると、handlePrefListが呼び出される', async () => {
    const mockHandlePrefList = jest.fn()

    const { getByText } = render(
      <CheckboxList prefList={[]} handlePrefList={mockHandlePrefList} />
    )

    await waitFor(() => {
      expect(getByText(dummyPrefData[0].prefName)).toBeInTheDocument()
    })

    // ラベル要素を取得してクリックする
    const label = getByText(dummyPrefData[0].prefName)
    fireEvent.click(label)

    // handlePrefListが呼び出されたことを確認する
    expect(mockHandlePrefList).toHaveBeenCalledWith([dummyPrefData[0]])
  })
})
