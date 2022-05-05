import { CircularButton } from './CircularButton'

type Props = {
  adviceId: number
  adviceText: string
  getAdvice(): void
}

export const AdviceCard = (props: Props) => (
  <div className="relative mt-20 flex w-[380px] flex-col items-center justify-center rounded-xl bg-[#323a49]  px-8 pt-8 pb-16 md:h-[280px] md:w-[450px] ">
    <p className="text-md absolute top-8 mx-auto  font-medium uppercase text-emerald-400 md:text-lg ">
      Advice
      {'  '}
      <span className=" ml-2  font-bold ">#{props.adviceId}</span>
    </p>
    <div className="mt-4 text-center font-manrope text-lg font-semibold leading-8 text-gray-300 md:text-2xl">
      "{props.adviceText}"
    </div>
    <hr className="border-t-1 absolute  bottom-16 mx-auto mt-8 w-[380px] border-gray-500" />
    <div className="absolute -bottom-[30px] mx-auto ">
      <CircularButton getAdvice={props.getAdvice} />
    </div>
  </div>
)
