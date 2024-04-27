import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from "highcharts";
import type { SeriesOptionsType } from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import type { prefType } from '../types/prefType';
import { baseURL } from '../data/baseURL';
import highchartsAccessibility from "highcharts/modules/accessibility";

interface responseType {
  message: string
  result: {
    boundaryYear: number
    data: Array<{
      data: Array<{year: number; value: number}>
      label: string
    }>
  }
}

interface Props {
  prefList: prefType[]
  option: string
}

function Graph(props: Props): JSX.Element {
  // Highchartsのアクセシビリティモジュールの読み込み
  highchartsAccessibility(Highcharts);

  // 各都道府県の人口構成データ
  const [series, setSeries] = useState<SeriesOptionsType[]>([])
  // グラフの横軸目盛り
  const [categories, setCategories] = useState<string[]>([])

  // 各都道府県の人口構成データを取得する
  useEffect(() => {
    setSeries([])
    for (const pref of props.prefList) {
      axios
      .get<responseType>(baseURL + `api/v1/population/composition/perYear?prefCode=${pref.prefCode}&cityCode=-`, {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
      .then((response) => {
        if (categories.length === 0) setCategories(response.data.result.data[0].data.map(item => String(item.year)))
        setSeries(prev => {
          return [...prev, {
            name: pref.prefName,
            type: 'line',
            data: response.data.result.data.filter(item => item.label === props.option)[0].data.map(item => item.value)
          }]
        })
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }, [props.prefList, props.option])

  const options: Highcharts.Options = {
    title: {
      text: '人口推移'
    },
    xAxis: {
      title: {
        text: '年'
      },
      categories
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    series,
    accessibility: {
      enabled: true
    }
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options}/>
  )
}

export default Graph