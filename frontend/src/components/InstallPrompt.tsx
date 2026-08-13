import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { usePwaInstall } from '@/components/pwa-install-context'

export default function InstallPrompt() {
  const { pathname } = useLocation()
  const { showInstallPrompt } = usePwaInstall()
  const previousPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const previousPathname = previousPathnameRef.current
    previousPathnameRef.current = pathname

    if (pathname === '/app' && !previousPathname?.startsWith('/app/')) {
      showInstallPrompt('automatic')
    }
  }, [pathname, showInstallPrompt])

  return null
}
