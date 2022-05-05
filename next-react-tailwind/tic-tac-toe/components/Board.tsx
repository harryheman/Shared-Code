import { XIcon } from './XIcon'
import { OIcon } from './OIcon'

type TPlayer = {
  winner: string
  playerX: boolean
  squares: any[]
  handlePlayer(i: number): void
  restartGame(): void
}

type TSquare = {
  value: JSX.Element | string | null
  onClick(): void
}

const SQUARES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

export const Board = (props: TPlayer) => {
  const Square = ({ value, onClick }: TSquare) => (
    <button
      className="square"
      onClick={onClick}
      disabled={props.winner ? true : false}
    >
      {value}
    </button>
  )

  const getValue = (i: number) => {
    let value = null
    if (props.squares[i] === 'X') {
      value = <XIcon />
    } else if (props.squares[i] === 'O') {
      value = <OIcon />
    }
    return value
  }

  const renderSquare = (i: number) => (
    <Square key={i} value={getValue(i)} onClick={() => props.handlePlayer(i)} />
  )

  return (
    <div className="board">
      <div className=" md:[w-400px] flex w-[300px] items-center justify-center space-x-10 rounded-lg">
        <div>
          {props.playerX ? (
            <div className="w-28 rounded-lg bg-gray-700 px-4 py-1 text-xl font-medium uppercase text-white">
              <span className="text-2xl font-bold text-[#30c4bd]">X</span> Turn
            </div>
          ) : (
            <div className="w-28 rounded-lg bg-gray-700 px-4 py-1 text-xl font-medium uppercase  text-white">
              <span className=" text-2xl font-bold  text-[#f3b236]">O</span>{' '}
              Turn
            </div>
          )}
        </div>
        <button
          onClick={props.restartGame}
          className="button group rounded-md bg-[#f3b236] px-2 py-1 hover:bg-[#30c4bd] hover:ring-4 hover:ring-cyan-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="eas-in h-8 w-8 transition duration-300 group-hover:rotate-180  "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      {SQUARES.map((row, index) => (
        <div className="board-row" key={index}>
          {row.map((item) => renderSquare(item))}
        </div>
      ))}
    </div>
  )
}
