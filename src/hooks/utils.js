import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useRedirectAfterLoad(destination, checkIfShouldRedirect) {
  const router = useRouter()

  const [isRouterReady, setIsRouterReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    router.isReady && setIsRouterReady(true)
  }, [router.isReady])

  useEffect(() => {
    if (!isRouterReady) return

    const shouldRedirect = checkIfShouldRedirect
      ? checkIfShouldRedirect(router)
      : true
    if (shouldRedirect) router.push(destination)

    setIsRedirecting(shouldRedirect)
    setIsLoading(false)
  }, [destination, checkIfShouldRedirect, isRouterReady, router])

  return { isLoading, isRedirecting }
}
