export const siteTitle = 'Hackathon by Sagara Technology'

export const tokenStorageKey = 'hsa2022-auth'

export const baseServiceURLDEV = '/api/v1'
export const baseServiceURLPROD =
  'https://api.hackathon.sagaratechnology.com/api/v1'
export const baseServiceURL = baseServiceURLDEV
export const authServiceURL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? `${baseServiceURL}/auth` + ''
export const usersServiceURL =
  process.env.NEXT_PUBLIC_USERS_SERVICE_URL ?? `${baseServiceURL}/users` + ''
export const eventsServiceURL =
  process.env.NEXT_PUBLIC_EVENTS_SERVICE_URL ?? `${baseServiceURL}/events` + ''
export const referencesServiceURL =
  process.env.NEXT_PUBLIC_REFERENCES_SERVICE_URL ?? `${baseServiceURL}` + ''
export const paymentsServiceURL =
  process.env.NEXT_PUBLIC_PAYMENTS_SERVICE_URL ?? `${baseServiceURL}` + ''
export const uploadServiceURL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? `${baseServiceURL}/upload`
