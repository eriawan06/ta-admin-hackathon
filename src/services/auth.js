import { servicePostWithoutAuth } from '@/services/_config'

import { authServiceURL as baseURL } from 'config'

export const ENDPOINT_AUTH_LOGIN = baseURL + '/login/admin'

export const postAuthLogin = servicePostWithoutAuth(
  ENDPOINT_AUTH_LOGIN
)
