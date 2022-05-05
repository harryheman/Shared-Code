type Props = {
  message: string
}

export const Header = (props: Props) => {
  return (
    <header className="mx-auto mt-2">
      <h1 className="text-2x1 md:text-4x1 font-redhat mx-auto mt-8 text-center font-bold text-rose-500">
        {props.message ? props.message : "We're launching soon"}
      </h1>
    </header>
  )
}
