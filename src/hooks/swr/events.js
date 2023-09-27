import useSWR from 'swr'

import { ENDPOINT_EVENTS_LATEST_EVENT } from 'services/events'
import { fetcher } from 'services/general'

export function useLatestEvents() {
  const { data, error } = useSWR(ENDPOINT_EVENTS_LATEST_EVENT, fetcher)

  return {
    data: data?.data?.data,
    error,
    isLoading: !error && !data
  }
}
