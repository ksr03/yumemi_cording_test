import axios from 'axios'
import type { prefType } from '../types/prefType'
import { baseURL } from '../data/baseURL'

interface responseType {
  message: string
  result: prefType[]
}

/**
 * 都道府県のデータを取得する
 * @returns prefCodeとprefNameを持つ要素のリスト
 */
export async function getPrefectures(): Promise<prefType[]> {
  try {
    const response = await axios.get<responseType>(
      baseURL + 'api/v1/prefectures',
      { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY } }
    )
    return response.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}
