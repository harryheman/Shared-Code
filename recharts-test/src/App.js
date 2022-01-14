import { useEffect, useState } from 'react'
import './App.scss'

import { fetchCsv } from 'utils'
// eslint-disable-next-line
import { Table, MyLine, MyArea, MyBar, MyPie } from 'components'

const FIELD_WHITE_LIST = [
  'Страна',
  'Население',
  'Прирост',
  'Плотность (ч/км²)',
  'Площадь (км²)',
  'Мигранты',
  'Городское население',
  'Доля в мире'
]

const CSV_URL =
  'https://gist.githubusercontent.com/harryheman/9eddc3240d70cecdba170c6058d683b5/raw/150fad64598ae8c67cf3197738aecf6a21434a0f/population_by_country_2020.csv'

export const App = () => {
  const [csvData, setCsvData] = useState({})
  // eslint-disable-next-line
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetchCsv(CSV_URL).then((csvData) => setCsvData(csvData))
  }, [])

  useEffect(() => {
    if (Object.keys(csvData).length > 0) {
      let { headers, rows } = csvData
      headers = headers.filter((h) => FIELD_WHITE_LIST.includes(h))
      rows = rows
        .sort((a, b) => b['Population'] - a['Population'])
        .slice(2, 12)
        .map((r) =>
          Object.fromEntries(
            Object.entries(r)
              .filter(([k]) => FIELD_WHITE_LIST.includes(k))
              .map(([k, v]) => {
                if (v.includes('%')) {
                  v = v.replace(' %', '')
                }
                return [k, v]
              })
          )
        )
      setHeaders(headers)
      setRows(rows)
    }
  }, [csvData])

  // console.log(rows[0])

  return (
    <>
      {/* <Table headers={headers} rows={rows} /> */}
      {/* <MyLine rows={rows} /> */}
      {/* <MyArea rows={rows} /> */}
      {/* <MyBar rows={rows} /> */}
      <MyPie rows={rows} />
    </>
  )
}
