import { useQuery } from '@apollo/react-hooks'
import { LocalUser } from '../types'
import { GET_LOCALUSER } from '../gql'

export const useUser = (): LocalUser => {
  const { loading, error, data } = useQuery(GET_LOCALUSER)

  const empty = {
    __typename: '',
    nickname: '',
    picture: '',
    sub: '',
    name: '',
  }

  if (loading) {
    return empty
  }
  if (error) {
    console.error('User not found in GQL-cache')
    return empty
  }

  const { localUser } = data

  return localUser
}
