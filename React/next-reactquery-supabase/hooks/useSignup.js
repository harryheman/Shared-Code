import { useMutation } from 'react-query'
import supabase from 'app/supabase'

const signup = async ({ email, password, username }) => {
  const { data: userWithUsername } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (userWithUsername) {
    throw new Error('User already exists')
  }

  const { data: userWithEmail } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (userWithEmail) {
    throw new Error('Email is already used')
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  })

  if (signUpError) {
    throw signUpError
  }

  return data
}

export const useSignup = (user) =>
  useMutation('signup', () => signup(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert({
          name: user.name,
          username: user.username,
          user_id: data.user.id
        })

      if (insertError) {
        throw insertError
      }

      return insertData
    }
  })
