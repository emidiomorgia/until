import '@khmyznikov/pwa-install'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PWAInstallElement } from '@khmyznikov/pwa-install'
import { isPwaLaunch, registerServiceWorker } from '@/pwa'
import { PwaInstallContext, type PwaInstallContextValue } from '@/components/pwa-install-context'

const DISMISSED_STORAGE_KEY = 'until-pwa-install-banner-dismissed'
const LEGACY_INSTALL_PROMPT_STORAGE_KEY = 'pwa-hide-install'

function detectStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

function readDismissedState() {
  try {
    return sessionStorage.getItem(DISMISSED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveDismissedState() {
  try {
    sessionStorage.setItem(DISMISSED_STORAGE_KEY, 'true')
  } catch {
    // The library still keeps the dismissal in memory when storage is unavailable.
  }
}

function clearLegacyInstallPromptState() {
  try {
    localStorage.removeItem(LEGACY_INSTALL_PROMPT_STORAGE_KEY)
    localStorage.removeItem(DISMISSED_STORAGE_KEY)
  } catch {
    // The prompt remains usable when storage is unavailable.
  }
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const installElementRef = useRef<PWAInstallElement | null>(null)
  const automaticPromptPendingRef = useRef(false)
  const [isStandalone, setIsStandalone] = useState(detectStandalone)
  const [isPwaInstalled, setIsPwaInstalled] = useState(() => isPwaLaunch(window.location.search))
  const [isRelatedAppsInstalled, setIsRelatedAppsInstalled] = useState(false)
  const [isInstallAvailable, setIsInstallAvailable] = useState(false)

  useEffect(() => {
    registerServiceWorker()
    clearLegacyInstallPromptState()

    const installElement = installElementRef.current
    if (!installElement) return

    void installElement.getInstalledRelatedApps().then((relatedApps) => {
      setIsRelatedAppsInstalled(relatedApps.length > 0)
    })

    const handleInstallAvailable = () => {
      setIsInstallAvailable(true)
      if (!automaticPromptPendingRef.current || readDismissedState()) return
      automaticPromptPendingRef.current = false
      installElement.showDialog()
    }
    const handleInstallSuccess = () => {
      setIsInstallAvailable(false)
      setIsPwaInstalled(true)
    }
    const handleUserChoice = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message
      if (message === 'dismissed') saveDismissedState()
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
      if (readDismissedState()) return
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
    isInstallAvailable,
    isStandalone,
    showInstallPrompt,
  }), [isInstallAvailable, isPwaInstalled, isRelatedAppsInstalled, isStandalone, showInstallPrompt])

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
      <pwa-install
        ref={installElementRef}
        manual-apple="true"
        manual-chrome="true"
        manifest-url="/manifest.webmanifest"
        styles={{ '--tint-color': '#5e4ed5' }}
      />
    </PwaInstallContext.Provider>
  )
}
