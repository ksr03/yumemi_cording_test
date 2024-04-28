import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../pages/Home'

describe('Home', () => {
  test('ページが正しく表示される', () => {
    const { getByText, getByTestId } = render(<App />)

    expect(getByText('都道府県別の人口推移グラフ')).toBeInTheDocument()

    expect(getByText('都道府県')).toBeInTheDocument()

    expect(getByTestId('select-box')).toBeInTheDocument()

    expect(getByTestId('graph-container')).toBeInTheDocument()
  })

  test('都道府県を選択すると、グラフが更新される', async () => {
    const { getByText, getByTestId } = render(<App />)

    await waitFor(() => {
      expect(getByText('東京都')).toBeInTheDocument()
    })

    // 東京のチェックボックスをクリックする
    userEvent.click(getByText('東京都'))

    await waitFor(() => {
      expect(getByText('人口数')).toBeInTheDocument()
    })

    // グラフが更新されてデータが表示されていることを確認
    expect(getByTestId('graph-container')).toHaveTextContent('東京都')
  })

  test('セレクトボックスを操作すると、グラフが更新される', async () => {
    const { getByText, getByTestId } = render(<App />)

    await waitFor(() => {
      expect(getByText('東京都')).toBeInTheDocument()
    })

    userEvent.click(getByText('東京都'))

    // セレクトボックスを選択してオプションを変更する
    userEvent.selectOptions(getByTestId('select-box'), ['年少人口'])

    await waitFor(() => {
      expect(getByText('人口数')).toBeInTheDocument()
    })

    // グラフが更新されて年少人口のデータが表示されていることを確認
    expect(getByTestId('graph-container')).toHaveTextContent('年少人口')
  })
})
