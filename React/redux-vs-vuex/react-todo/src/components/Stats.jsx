import { useAppContext } from '../context'

export default function Stats() {
  const { selectors } = useAppContext()
  const stats = selectors.selectTodoStats()

  return (
    <div className='row'>
      <h3>Statistics</h3>
      <table className='table text-center'>
        <thead>
          <tr>
            {Object.keys(stats).map(([first, ...rest], index) => (
              <th scope='col' key={index}>
                {`${first.toUpperCase()}${rest.join('').toLowerCase()}`}
              </th>
            ))}
          </tr>
          <tr>
            {Object.values(stats).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  )
}
