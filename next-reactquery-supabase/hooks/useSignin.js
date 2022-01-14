import { useMutation } from 'react-query'
import supabase from 'app/supabase'

const signin = async (userData) => {
  const { data, error: signInError } = await supabase.auth.signIn(userData)

  if (signInError) {
    throw signInError
  }

  return data
}

export const useSignin = (userData) => {
  return useMutation('signin', () => signin(userData))
}
