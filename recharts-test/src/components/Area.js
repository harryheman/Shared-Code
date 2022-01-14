import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useWindowSize } from 'hooks'

export const MyArea = ({ rows }) => {
  const { width, height } = useWindowSize()

  return (
    <AreaChart
      width={width * 0.8}
      height={height * 0.8}
      data={rows}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='Страна' />
      <YAxis />
      <Tooltip />
      <Area
        type='monotone'
        dataKey='Городское население'
        stackId='1'
        stroke='#8884d8'
        fill='#8884d8'
      />
      <Area
        type='monotone'
        dataKey='Плотность (ч/км²)'
        stackId='1'
        stroke='#82ca9d'
        fill='#82ca9d'
      />
    </AreaChart>
  )
}
