import Link from 'next/link'

export const Logo = () => (
  <Link href="/">
    <div className="cursor-pointer rounded-xl p-3">
      <p className="font-mono text-xl font-semibold text-slate-400 dark:text-gray-50 md:text-xl lg:text-2xl">
        Logo
      </p>
    </div>
  </Link>
)
