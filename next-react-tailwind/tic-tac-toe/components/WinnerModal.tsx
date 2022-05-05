import { XIcon } from './XIcon'
import { OIcon } from './OIcon'

type Props = {
  winner: string
  quitGame(): void
  startNewGame(): void
}

export const WinnerModal = (props: Props) => (
  <div className="absolute top-0 left-0 z-10 min-h-screen w-full bg-gray-900/90">
    <div className="mx-auto mt-52 flex h-[250px] w-[500px] flex-col items-center justify-center space-y-10 rounded-xl bg-[#1f3540] px-6 py-4">
      <h2 className="flex flex-col items-center justify-center space-y-6 text-2xl font-bold md:text-4xl">
        {props.winner === 'X' ? <XIcon /> : <OIcon />}
        <p className="uppercase text-[#30c4bd]">Takes the Round</p>
      </h2>

      <div className="flex items-center justify-center space-x-16">
        <button
          onClick={props.quitGame}
          className="button rounded-md bg-[#a8bdc8] px-4 py-1 hover:bg-[#718087] hover:ring-4 hover:ring-gray-400"
        >
          Quit
        </button>
        <button
          onClick={props.startNewGame}
          className="button rounded-md bg-[#f3b236] px-4 py-1 hover:bg-[#30c4bd] hover:ring-4 hover:ring-cyan-300"
        >
          Next Round
        </button>
      </div>
    </div>
  </div>
)
