import React from 'react'

function NotFound (): JSX.Element {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">このページは存在しません</p>
      <a href="/" className="not-found-link">
        ホームに戻る
      </a>
    </div>
  )
}

export default NotFound
