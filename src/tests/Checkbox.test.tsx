import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../components/Checkbox';

// テスト用のダミーのprefTypeデータ
const dummyPref = {
  prefCode: 1,
  prefName: 'Dummy Prefecture',
};

// updatePrefListをモック化する
const mockUpdatePrefList = jest.fn();

test('チェックボックスをクリックすると、updatePrefListが呼び出される', () => {
  // コンポーネントをレンダリング
  const { getByLabelText } = render(
    <Checkbox pref={dummyPref} updatePrefList={mockUpdatePrefList} />
  );

  // チェックボックス要素を取得してクリックする
  const checkbox = getByLabelText(dummyPref.prefName);
  fireEvent.click(checkbox);

  // updatePrefListが呼び出されたことを確認する
  expect(mockUpdatePrefList).toHaveBeenCalledWith(dummyPref);
});
