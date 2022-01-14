import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSignin } from 'hooks/useSignin'
import { Loader } from 'components/ui/loader'

export default function Signin() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const signinMutation = useSignin(userData)

  if (signinMutation.isSuccess) {
    router.push('/')
  }

  const changeUserData = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value.trim() })
  }

  return (
    <div className='min-h-screen grid place-items-center text-xl'>
      <div className='w-2/3 lg:w-1/3 shadow-lg flex flex-col items-center'>
        <h1 className='text-4xl font-semibold'>Login</h1>
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>Email</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            name='email'
            value={userData.email}
            onChange={changeUserData}
          />
        </div>
        <div className='my-8 w-full lg:w-auto px-4'>
          <p>Password</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='password'
            name='password'
            value={userData.password}
            onChange={changeUserData}
          />
        </div>
        {signinMutation.isError && (
          <p className='text-sm mb-8 text-red-500'>
            {signinMutation.error.message}
          </p>
        )}
        <div className='mb-8 w-1/5'>
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded w-full'
            onClick={() => signinMutation.mutate()}
          >
            {signinMutation.isLoading ? (
              <span>
                <Loader height={30} width={30} />
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
