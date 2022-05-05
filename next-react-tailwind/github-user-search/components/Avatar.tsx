import Image from 'next/image'

export const Avatar = (props: { imageUrl: string }) => (
  <div className=" ml-8 h-[120px] w-[120px] rounded-full ring-[5px] ring-[#3b52d4] dark:ring-[#053bff] ">
    {props.imageUrl ? (
      <Image
        src={props.imageUrl}
        width="120"
        height="120"
        objectFit="cover"
        className="rounded-full "
      />
    ) : (
      <p className="pt-8 text-center font-mono text-lg font-bold text-gray-800 dark:text-gray-200">
        No Image Found
      </p>
    )}
  </div>
)
