import '@khmyznikov/pwa-install'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PWAInstallElement } from '@khmyznikov/pwa-install'
import { isPwaLaunch, registerServiceWorker } from '@/pwa'
import { PwaInstallContext, type PwaInstallContextValue } from '@/components/pwa-install-context'

const BANNER_SEEN_STORAGE_KEY = 'until-pwa-install-banner-seen'

function readBannerSeenState() {
  try {
    return localStorage.getItem(BANNER_SEEN_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveBannerSeenState() {
  try {
    localStorage.setItem(BANNER_SEEN_STORAGE_KEY, 'true')
  } catch {
    // The prompt remains usable when storage is unavailable.
  }
}

function detectStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

export function PwaInstallProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
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
    if (!enabled) {
      setIsInstallAvailable(false)
      setIsDialogHidden(false)
      setIsInstallationStateReady(false)
      return
    }

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
      if (!automaticPromptPendingRef.current || readBannerSeenState()) return
      automaticPromptPendingRef.current = false
      saveBannerSeenState()
      installElement.showDialog()
    }
    const handleAppInstalled = () => {
      setIsPwaInstalled(true)
      setIsInstallAvailable(false)
    }
    const handleUserChoice = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message
      automaticPromptPendingRef.current = false
      if (message === 'dismissed') {
        setIsDialogHidden(true)
        saveBannerSeenState()
      }
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => {
      const standalone = detectStandalone()
      setIsStandalone(standalone)
      setIsPwaInstalled(standalone || isPwaLaunch(window.location.search))
    }

    installElement.addEventListener('pwa-install-available-event', handleInstallAvailable)
    installElement.addEventListener('pwa-user-choice-result-event', handleUserChoice)
    window.addEventListener('appinstalled', handleAppInstalled)
    syncLibraryState()
    mediaQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      installElement.removeEventListener('pwa-install-available-event', handleInstallAvailable)
      installElement.removeEventListener('pwa-user-choice-result-event', handleUserChoice)
      window.removeEventListener('appinstalled', handleAppInstalled)
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [enabled])

  const showInstallPrompt = useCallback((mode: 'automatic' | 'manual' = 'manual') => {
    const installElement = installElementRef.current
    if (!installElement || isStandalone || isPwaInstalled || isRelatedAppsInstalled) return

    if (mode === 'automatic') {
      if (readBannerSeenState()) return
      automaticPromptPendingRef.current = true
      if (!installElement.isInstallAvailable) return
      automaticPromptPendingRef.current = false
      saveBannerSeenState()
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
      {enabled ? (
        <pwa-install
          ref={installElementRef}
          manual-apple="true"
          manual-chrome="true"
          manifest-url="/manifest.webmanifest"
          styles={{ '--tint-color': '#5e4ed5' }}
        />
      ) : null}
    </PwaInstallContext.Provider>
  )
}
