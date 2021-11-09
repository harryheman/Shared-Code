import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { useWindowSize } from 'hooks'

export const MyLine = ({ rows }) => {
  const { width, height } = useWindowSize()

  return (
    <LineChart
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
      <Line
        type='monotone'
        dataKey='Население'
        stroke='#8884d8'
        activeDot={{ r: 8 }}
      />
      <Line type='monotone' dataKey='Площадь (км²)' stroke='#82ca9d' />
    </LineChart>
  )
}
