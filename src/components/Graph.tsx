import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import type { SeriesOptionsType } from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import type { prefType } from '../types/prefType';
import highchartsAccessibility from "highcharts/modules/accessibility";
import type { optionType } from '../types/optionType';
import { getPopulation } from '../hooks/getPopulation';
import type { populationType } from '../types/poplationType';

interface Props {
  prefList: prefType[]
  option: optionType
}

function Graph(props: Props): JSX.Element {
  // Highchartsのアクセシビリティモジュールの読み込み
  highchartsAccessibility(Highcharts);

  // 各都道府県の人口推移データ
  const [series, setSeries] = useState<SeriesOptionsType[]>([])
  // グラフの横軸目盛り
  const [categories, setCategories] = useState<string[]>([])

  /**
   * 指定された都道府県の人口推移データを取得してセットする
   * @param pref 都道府県
   */
  const fetchData = async(pref:prefType): Promise<void> => {
    try {
      const response: populationType[]  = await getPopulation({pref})
      if (categories.length === 0) setCategories(response[0].data.map(item => String(item.year)) ?? [])
      setSeries(prev => {
        return [...prev, {
          name: pref.prefName,
          type: 'line',
          data: response.filter(item => item.label === props.option)[0].data.map(item => item.value) ?? []
        }]
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setSeries([])
    // 選択された全ての都道府県の人口構成データをセットする
    for (const pref of props.prefList) {
      fetchData(pref).catch(error => {
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