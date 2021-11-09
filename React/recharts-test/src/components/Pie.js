import { useWindowSize } from 'hooks'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { getRandomColor } from 'utils'

const RADIAN = Math.PI / 180
const renderCustomLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, fill } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor='middle'
      style={{ filter: 'invert(100%)' }}
    >
      {value}%
    </text>
  )
}

const data = [
  { name: 'Буддизм', value: 7.1 },
  { name: 'Христианство', value: 31.4 },
  { name: 'Язычество', value: 5.9 },
  { name: 'Индуизм', value: 15 },
  { name: 'Иудаизм', value: 1 },
  { name: 'Ислам', value: 23.2 },
  { name: 'Другое', value: 1 },
  { name: 'Атеизм', value: 16.4 }
]

export const MyPie = () => {
  const { width, height } = useWindowSize()
  const min = Math.min(width, height)

  return (
    <PieChart width={min * 0.8} height={min * 0.8}>
      <Pie
        data={data}
        cx={(min / 2) * 0.8}
        cy={(min / 2) * 0.8}
        labelLine={false}
        label={renderCustomLabel}
        outerRadius={(min / 2) * 0.7}
        dataKey='value'
      >
        {data.map((_, i) => {
          const color = getRandomColor()
          return <Cell key={i} fill={color} />
        })}
      </Pie>
      <Tooltip formatter={() => ''} separator='' />
    </PieChart>
  )
}
