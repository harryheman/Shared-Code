import { useMutation, useQueryClient } from 'react-query'
import supabase from 'app/supabase'

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}
