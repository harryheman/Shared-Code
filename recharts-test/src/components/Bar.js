import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts'
import { useWindowSize } from 'hooks'

export const MyBar = ({ rows }) => {
  const { width, height } = useWindowSize()

  return (
    <BarChart
      width={width * 0.8}
      height={height * 0.8}
      data={rows}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='Страна' />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke='#000' />
      <Bar dataKey='Мигранты' fill='#8884d8' />
      <Bar dataKey='Прирост' fill='#82ca9d' />
    </BarChart>
  )
}
