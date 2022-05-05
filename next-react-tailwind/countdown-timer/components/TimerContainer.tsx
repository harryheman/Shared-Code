import { NumberBox } from './NumberBox'

type Props = {
  days: number | string
  hours: number | string
  minutes: number | string
  seconds: number | string
}

export const TimerContainer = (props: Props) => {
  let { days, hours, minutes, seconds } = props
  let [daysFlip, hoursFlip, minutesFlip, secondsFlip] = [
    false,
    false,
    false,
    false,
  ]

  if (
    [daysFlip, hoursFlip, minutesFlip, secondsFlip].every((item) => +item <= 0)
  ) {
    ;[daysFlip, hoursFlip, minutesFlip, secondsFlip] = [
      false,
      false,
      false,
      false,
    ]
  }

  if (seconds == 0) {
    if (minutes != 0) {
      seconds = 59
    }

    secondsFlip = false
    minutesFlip = true
  }
  if (minutes == 0) {
    if (hours != 0) {
      minutes = 59
    }

    minutesFlip = false
    hoursFlip = true
  }

  if (hours == 0) {
    hoursFlip = false

    if (days != 0) {
      daysFlip = true
    }
  }

  if (days < 10) {
    days = '0' + days
  }

  if (hours < 10) {
    hours = '0' + hours
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  return (
    <div className=" mt-2 rounded-xl  md:mt-20">
      <div className="grid grid-cols-2 gap-4 rounded-xl py-6 px-10 md:mt-2 md:flex md:items-center  md:justify-between md:px-6 md:py-8 ">
        <NumberBox num={days} unit="Days" flip={daysFlip} />
        <span className=" -mt-8 hidden text-5xl font-normal text-gray-50 md:inline-block md:text-7xl ">
          :
        </span>
        <NumberBox num={hours} unit="Hours" flip={hoursFlip} />
        <span className="-mt-8 hidden text-5xl font-normal text-gray-50 md:inline-block md:text-7xl ">
          :
        </span>
        <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
        <span className="-mt-8 hidden text-5xl font-normal text-gray-50 md:inline-block md:text-7xl ">
          :
        </span>
        <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
      </div>
    </div>
  )
}
