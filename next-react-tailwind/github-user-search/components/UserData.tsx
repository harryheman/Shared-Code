import {
  LocationMarkerIcon,
  LinkIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid'

type Props = {
  blog: string
  location: string
  company: string | null
}

export const UserData = (props: Props) => {
  const { blog, location, company } = props

  return (
    <div className="grid grid-cols-1 gap-6 px-2 py-4 md:grid-cols-2 md:gap-x-10">
      <div className="flex items-center  space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
        <LocationMarkerIcon className="h-5 w-5 text-slate-500  dark:text-gray-100" />
        <p className="font-mono text-sm font-medium text-gray-900 dark:text-gray-300">
          {location ? location : 'Not Available'}
        </p>
      </div>

      <div className="flex items-center  space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
        <LinkIcon className="h-5 w-5 text-slate-500 dark:text-gray-100 " />
        <p className="decoration-3 font-sm font-mono text-sm font-medium text-gray-900 underline dark:text-gray-300">
          <a href={`https://${blog}`} target="_blank">
            {blog ? blog : 'Not Available'}
          </a>
        </p>
      </div>

      <div className="flex items-center  space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
        <OfficeBuildingIcon className="h-5 w-5 text-slate-500 dark:text-gray-100 " />
        <p className="font-sm font-mono text-sm font-medium text-gray-900 dark:text-gray-300">
          {company ? company : 'Not Available'}
        </p>
      </div>
    </div>
  )
}
