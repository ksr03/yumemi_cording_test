# 概要
ゆめみフロントエンドコーディングテストのリポジトリです。

## 実行方法
1. ```yarn install```/```npm install```で依存関係のインストール
2. [RESAS API](https://opendata.resas-portal.go.jp/)に登録してAPIキーを取得する
3. ディレクトリ直下に.envを作成し、ファイル内に次のコードを記述
 ```
REACT_APP_API_KEY="ここに取得したAPIキー"
```
3. ```npm run start```で実行
4. [http://localhost:3000](http://localhost:3000)にアクセス

### テストの実行
```npm run test```

### フォーマット
```npm run fmt```

### lint
```npm run lint```

