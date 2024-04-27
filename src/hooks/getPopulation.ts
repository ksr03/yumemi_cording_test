import axios from 'axios';
import type { prefType } from '../types/prefType';
import type { populationType } from '../types/poplationType';
import { baseURL } from '../data/baseURL';

interface responseType {
  message: string
  result: {
    boundaryYear: number
    data: populationType[]
  }
}

interface Props {
  pref: prefType
}

/**
 * 指定した都道府県の人口構成データを取得する
 * @returns labelと人口推移データを持つ要素のリスト
 */
export async function getPopulation (props: Props): Promise<populationType[]> {
  try {
    const response = await axios.get<responseType>(baseURL + `api/v1/population/composition/perYear?prefCode=${props.pref.prefCode}&cityCode=-`, {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
    return response.data.result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}