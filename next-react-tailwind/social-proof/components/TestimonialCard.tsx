import Image from 'next/image'

type Props = {
  customerName: string
  testimonialText: string
  imageUrl: string
}

export const TestimonialCard = (props: Props) => (
  <div
    className={`group mt-4 flex  w-3/4 cursor-pointer flex-col items-start rounded-2xl bg-gradient-to-r from-[#975297] to-[#502050] px-6 py-6 transition duration-1000 ease-in-out hover:bg-gradient-to-r hover:from-[#ce74ff] hover:to-[#743c8a] hover:shadow-md md:h-[240px] md:w-[420px] md:space-x-4 md:last:mt-32 md:even:mt-16 `}
  >
    <div className="flex space-x-5 pb-4  md:space-x-6 md:px-4 ">
      <div className="h-[50px] w-[50px] rounded-full ring-4 ring-fuchsia-400 group-hover:ring-fuchsia-100">
        <Image
          src={props.imageUrl}
          objectFit="contain"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      <div className=" flex flex-col items-start justify-start">
        <h2 className="text-md font-bold text-fuchsia-400 group-hover:text-fuchsia-100 md:text-2xl ">
          {props.customerName}
        </h2>
        <p className="md:text-md ml-1 text-xs font-extralight text-gray-100 group-hover:text-fuchsia-50">
          Verified Buyer
        </p>
      </div>
    </div>

    <div className="text-md font-500 py-2 text-fuchsia-200 md:text-lg">
      {props.testimonialText}
    </div>
  </div>
)
