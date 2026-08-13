import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePwaInstall } from '@/components/pwa-install-context'

export default function InstallPrompt() {
  const { pathname } = useLocation()
  const { showInstallPrompt } = usePwaInstall()

  useEffect(() => {
    if (pathname === '/app') showInstallPrompt('automatic')
  }, [pathname, showInstallPrompt])

  return null
}
