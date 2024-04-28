import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../pages/Home'

describe('Home', () => {
  test('ページが正しく表示される', () => {
    // コンポーネントをレンダリング
    const { getByText, getByTestId } = render(<App />)

    // タイトルが表示されていることを確認
    expect(getByText('都道府県別の人口推移グラフ')).toBeInTheDocument()

    // チェックボックスリストが表示されていることを確認
    expect(getByText('都道府県')).toBeInTheDocument()

    // セレクトボックスが表示されていることを確認
    expect(getByTestId('select-box')).toBeInTheDocument()

    // グラフが表示されていることを確認
    expect(getByTestId('graph-container')).toBeInTheDocument()
  })

  test('都道府県を選択すると、グラフが更新される', async () => {
    // コンポーネントをレンダリング
    const { getByText, getByTestId } = render(<App />)

    // ラベルテキストが表示されるまで待機する
    await waitFor(() => {
      expect(getByText('東京都')).toBeInTheDocument()
    })

    // 東京のチェックボックスをクリックする
    userEvent.click(getByText('東京都'))

    // グラフが描画されるまで待機
    await waitFor(() => {
      expect(getByText('人口数')).toBeInTheDocument()
    })

    // グラフが更新されて老年人口のデータが表示されていることを確認
    expect(getByTestId('graph-container')).toHaveTextContent('東京都')
  })

  test('セレクトボックスを操作すると、グラフが更新される', async () => {
    // コンポーネントをレンダリング
    const { getByText, getByTestId } = render(<App />)

    // ラベルテキストが表示されるまで待機する
    await waitFor(() => {
      expect(getByText('東京都')).toBeInTheDocument()
    })

    // 東京のチェックボックスをクリックする
    userEvent.click(getByText('東京都'))

    // セレクトボックスを選択してオプションを変更する
    userEvent.selectOptions(getByTestId('select-box'), ['年少人口'])

    // グラフが描画されるまで待機
    await waitFor(() => {
      expect(getByText('人口数')).toBeInTheDocument()
    })

    // グラフが更新されて年少人口のデータが表示されていることを確認
    expect(getByTestId('graph-container')).toHaveTextContent('年少人口')
  })
})
