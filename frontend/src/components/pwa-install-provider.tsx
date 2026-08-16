import '@khmyznikov/pwa-install'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PWAInstallElement } from '@khmyznikov/pwa-install'
import { isPwaLaunch, registerServiceWorker } from '@/pwa'
import { PwaInstallContext, type PwaInstallContextValue } from '@/components/pwa-install-context'

function detectStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const installElementRef = useRef<PWAInstallElement | null>(null)
  const automaticPromptPendingRef = useRef(false)
  const [isStandalone, setIsStandalone] = useState(detectStandalone)
  const [isPwaInstalled, setIsPwaInstalled] = useState(() => isPwaLaunch(window.location.search))
  const [isRelatedAppsInstalled, setIsRelatedAppsInstalled] = useState(false)
  const [isInstallAvailable, setIsInstallAvailable] = useState(false)
  const [isDialogHidden, setIsDialogHidden] = useState(false)
  const [isInstallationStateReady, setIsInstallationStateReady] = useState(() =>
    detectStandalone() || isPwaLaunch(window.location.search),
  )

  useEffect(() => {
    registerServiceWorker()
    const installElement = installElementRef.current
    if (!installElement) return

    const syncLibraryState = () => {
      setIsInstallAvailable(installElement.isInstallAvailable)
      setIsDialogHidden(installElement.isDialogHidden)
    }

    void installElement.getInstalledRelatedApps()
      .then((relatedApps) => {
        setIsRelatedAppsInstalled(relatedApps.length > 0)
      })
      .finally(() => setIsInstallationStateReady(true))

    const handleInstallAvailable = () => {
      syncLibraryState()
      if (!automaticPromptPendingRef.current || installElement.isDialogHidden) return
      automaticPromptPendingRef.current = false
      installElement.showDialog()
    }
    const handleInstallSuccess = () => {
      setIsPwaInstalled(true)
      setIsInstallAvailable(false)
    }
    const handleUserChoice = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message
      if (message === 'dismissed') setIsDialogHidden(true)
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => {
      const standalone = detectStandalone()
      setIsStandalone(standalone)
      setIsPwaInstalled(standalone || isPwaLaunch(window.location.search))
    }

    installElement.addEventListener('pwa-install-available-event', handleInstallAvailable)
    installElement.addEventListener('pwa-install-success-event', handleInstallSuccess)
    installElement.addEventListener('pwa-user-choice-result-event', handleUserChoice)
    syncLibraryState()
    mediaQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      installElement.removeEventListener('pwa-install-available-event', handleInstallAvailable)
      installElement.removeEventListener('pwa-install-success-event', handleInstallSuccess)
      installElement.removeEventListener('pwa-user-choice-result-event', handleUserChoice)
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [])

  const showInstallPrompt = useCallback((mode: 'automatic' | 'manual' = 'manual') => {
    const installElement = installElementRef.current
    if (!installElement || isStandalone || isPwaInstalled || isRelatedAppsInstalled) return

    if (mode === 'automatic') {
      if (installElement.isDialogHidden) return
      automaticPromptPendingRef.current = true
      if (!installElement.isInstallAvailable) return
      automaticPromptPendingRef.current = false
      installElement.showDialog()
      return
    }

    installElement.showDialog(true)
  }, [isPwaInstalled, isRelatedAppsInstalled, isStandalone])

  const value = useMemo<PwaInstallContextValue>(() => ({
    isPwaInstalled: isStandalone || isPwaInstalled || isRelatedAppsInstalled,
    isInstallationStateReady,
    isInstallAvailable,
    isDialogHidden,
    isStandalone,
    showInstallPrompt,
  }), [isDialogHidden, isInstallAvailable, isInstallationStateReady, isPwaInstalled, isRelatedAppsInstalled, isStandalone, showInstallPrompt])

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
      <pwa-install
        ref={installElementRef}
        use-local-storage="true"
        manifest-url="/manifest.webmanifest"
        styles={{ '--tint-color': '#5e4ed5' }}
      />
    </PwaInstallContext.Provider>
  )
}
