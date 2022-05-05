import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { ChoosePlayer, Board, WinnerModal } from '../components'

const WINING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(squares: any[]) {
  for (const pattern of WINING_PATTERNS) {
    const [a, b, c] = pattern

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const Home: NextPage = () => {
  const [isX, setIsX] = useState(true)
  const [newGame, setNewGame] = useState(false)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const winner = calculateWinner(squares)

  const handlePlayer = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = isX ? 'X' : 'O'
    setSquares(squares)
    setIsX(!isX)
  }

  const restartGame = () => {
    setIsX(true)
    setSquares(Array(9).fill(null))
  }
  const startNewGame = () => {
    restartGame()
    setNewGame(true)
  }
  const quitGame = () => {
    restartGame()
    setNewGame(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Tic-Tac-Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mt-4 text-4xl font-extrabold text-[#30c4bd] md:text-6xl ">
        Tic <span className="text-[#f3b236]">Tac </span> Toe
      </h1>

      {!newGame ? (
        <ChoosePlayer
          startNewGame={startNewGame}
          handlePlayerX={() => setIsX(true)}
          handlePlayerO={() => setIsX(false)}
        />
      ) : (
        <Board
          winner={winner}
          playerX={isX}
          squares={squares}
          handlePlayer={handlePlayer}
          restartGame={restartGame}
        />
      )}
      {winner && (
        <WinnerModal
          winner={winner}
          quitGame={quitGame}
          startNewGame={startNewGame}
        />
      )}
    </div>
  )
}

export default Home
