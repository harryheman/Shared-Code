import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon } from '@heroicons/react/outline'
import { MoonIcon } from '@heroicons/react/solid'
import { Logo } from './Logo'

const ThemeSelector = (props: { mounted: boolean }) => {
  const { systemTheme, theme, setTheme } = useTheme()
  if (!props.mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <div className="flex cursor-pointer items-center">
      {currentTheme === 'dark' ? (
        <>
          <h2 className="text-md font-mono font-semibold uppercase tracking-wider dark:text-gray-50">
            Light
          </h2>
          <SunIcon
            className="ml-2 mb-2  inline-block h-8  w-8 animate-wiggle text-amber-400  "
            onClick={() => setTheme('light')}
          />
        </>
      ) : (
        <>
          <h2 className="text-md font-mono font-semibold uppercase tracking-wider text-slate-400">
            Dark
          </h2>
          <MoonIcon
            className="ml-2 mb-2 inline-block h-8 w-8 animate-wiggle_reverse text-slate-400"
            onClick={() => setTheme('dark')}
          />
        </>
      )}
    </div>
  )
}

export const Navbar = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="align-items mx-auto mt-4 flex max-w-md justify-between space-x-4 rounded-md p-2 md:max-w-2xl">
      <div>
        <Logo />
      </div>

      <ThemeSelector mounted={mounted} />
    </header>
  )
}
