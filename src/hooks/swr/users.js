import useSWR from 'swr'

import {
  ENDPOINT_USERS_PARTICIPANTS_PROFILE,
  ENDPOINT_USERS_PROFILE
} from 'services/users'
import { fetcher } from 'services/general'

export function useUserProfile() {
  const { data, error, mutate } = useSWR(ENDPOINT_USERS_PROFILE, fetcher)

  return {
    error,
    data: data?.data.data,
    isLoading: !error && !data,
    mutate
  }
}

export function useParticipantProfile() {
  const { data, error, mutate } = useSWR(
    ENDPOINT_USERS_PARTICIPANTS_PROFILE,
    fetcher
  )

  return {
    error,
    data: data?.data?.data,
    isLoading: !error && !data,
    mutate
  }
}
