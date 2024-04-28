import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import CheckboxList from '../components/CheckboxList'
import { dummyPrefData } from '../data/dummyPrefData'

describe('CheckboxList', () => {
  test('都道府県毎のチェックボックスが表示される', async () => {
    // handlePrefList関数のモックを設定する
    const mockHandlePrefList = jest.fn()

    // コンポーネントをレンダリング
    const { getByText } = render(
      <CheckboxList prefList={[]} handlePrefList={mockHandlePrefList} />,
    )

    await waitFor(() => {
      // 各都道府県のチェックボックスが表示されることを確認
      dummyPrefData.forEach((pref) => {
        expect(getByText(pref.prefName)).toBeInTheDocument()
      })
    })
  })

  test('都道府県を選択すると、handlePrefListが呼び出される', async () => {
    // handlePrefList関数のモックを設定する
    const mockHandlePrefList = jest.fn()

    // コンポーネントをレンダリング
    const { getByText } = render(
      <CheckboxList prefList={[]} handlePrefList={mockHandlePrefList} />,
    )

    // ダミーの都道府県を取得する
    const dummyPref = { prefCode: 1, prefName: '北海道' }

    // ラベルテキストが表示されるまで待機する
    await waitFor(() => {
      expect(getByText(dummyPref.prefName)).toBeInTheDocument()
    })

    // ラベル要素を取得してクリックする
    const label = getByText(dummyPref.prefName)
    fireEvent.click(label)

    // handlePrefListが呼び出されたことを確認する
    expect(mockHandlePrefList).toHaveBeenCalledWith([dummyPref])
  })
})
