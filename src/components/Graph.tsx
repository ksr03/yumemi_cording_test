import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from "highcharts";
import type { SeriesOptionsType } from 'highcharts';
import HighchartsReact from "highcharts-react-official";

interface dataType {
  data: Array<{year: number; value: number}>
  label: string
}

interface resultType {
  boundaryYear: number
  data: dataType[]
}

interface responseType {
  message: string
  result: resultType
}

function Graph(): JSX.Element {
  const baseURL = 'https://opendata.resas-portal.go.jp/'

  const [data, setData] = useState<dataType | null>(null)

  useEffect(() => {
    // 人口構成データを取得
    axios
    .get<responseType>(baseURL + `api/v1/population/composition/perYear?prefCode=${15}&cityCode=-`, {headers: {'X-API-KEY': process.env.REACT_APP_API_KEY}})
    .then((response) => {
      setData(response.data.result.data[0])
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const poplationData: number[] = []
  const categories: string[] = []

  if (data?.data !== null) {
    for (const temp of data?.data ?? []) {
      poplationData.push(temp.value)
      categories.push(String(temp.year))
    }
  }

  const series: SeriesOptionsType = {
    name: 'name',
    type: 'line',
    data: poplationData
  }

  const options: Highcharts.Options = {
    title: {
      text: '人口推移'
    },
    xAxis: {
      title: {
        text: '年度'
      },
      categories: categories
    },
    yAxis: {
      title: {
        text: '人口'
      }
    },
    series: [series]
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </>
  )
}

export default Graph