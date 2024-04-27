import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsAccessibility from "highcharts/modules/accessibility";
import type { SeriesOptionsType } from 'highcharts';
import type { prefType } from '../types/prefType';
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
    chart: {
      marginRight: 50,
      marginLeft: 100,
    },
    title: {
      text: '人口推移',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans JP'
      }
    },
    subtitle: {
      text: props.option,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans JP',
      }
    },
    xAxis: {
      title: {
        text: '年',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Noto Sans JP',
          color: 'black'
        }
      },
      categories
    },
    yAxis: {
      title: {
        text: '人口数',
        style: { 
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Noto Sans JP',
          color: 'black'
        }
      }
    },
    legend: {
      itemStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans JP',
      }
    },
    series,
    accessibility: {
      enabled: true
    }
  }

  return (
    <div data-testid="graph-container">
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}

export default Graph