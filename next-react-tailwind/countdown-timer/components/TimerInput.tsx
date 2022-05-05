type Props = {
  value: number
  onClick(): void
  onChange(e: any): void
}

export const TimerInput = (props: Props) => {
  return (
    <div className="z-6 mx-auto flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
      <input
        className="font-redhat mr-4 w-40 rounded-lg px-2 py-1 text-xl outline-none md:text-2xl "
        name="Timer Input"
        type="number"
        placeholder="Enter No. of Days"
        value={props.value}
        onChange={props.onChange}
        min={0}
      />

      <button
        onClick={props.onClick}
        className="font-redhat rounded-xl bg-rose-300 px-4 py-2 text-xl font-semibold text-rose-500 transition duration-300 ease-in hover:bg-rose-500 hover:text-rose-100 md:text-xl"
      >
        {' '}
        Set value
      </button>
    </div>
  )
}
