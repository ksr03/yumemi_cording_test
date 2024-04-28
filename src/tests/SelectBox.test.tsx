import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SelectBox from '../components/SelectBox'
import type { optionType } from '../types/optionType'

test('セレクトボックスが正しく表示され、要素を選択するとhandleOptionが呼び出される', () => {
  const mockHandleOption = jest.fn()

  const { getByRole } = render(<SelectBox handleOption={mockHandleOption} />)

  const selectElement = getByRole('combobox')

  fireEvent.change(selectElement, { target: { value: '年少人口' } })

  // handleOptionが正しく呼び出されたことを確認
  expect(mockHandleOption).toHaveBeenCalledWith('年少人口' as optionType)
})
