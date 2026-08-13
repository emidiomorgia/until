import '@khmyznikov/pwa-install'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PWAInstallElement } from '@khmyznikov/pwa-install'
import { registerServiceWorker } from '@/pwa'
import { PwaInstallContext, type PwaInstallContextValue } from '@/components/pwa-install-context'

const INSTALLED_STORAGE_KEY = 'until-pwa-installed'
const DISMISSED_STORAGE_KEY = 'until-pwa-install-banner-dismissed'

function detectStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

function readInstalledState() {
  try {
    return localStorage.getItem(INSTALLED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveInstalledState() {
  try {
    localStorage.setItem(INSTALLED_STORAGE_KEY, 'true')
  } catch {
    // Keep the in-memory installed state when persistent storage is unavailable.
  }
}

function readDismissedState() {
  try {
    return localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveDismissedState() {
  try {
    localStorage.setItem(DISMISSED_STORAGE_KEY, 'true')
  } catch {
    // The library still keeps the dismissal in memory when storage is unavailable.
  }
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const installElementRef = useRef<PWAInstallElement | null>(null)
  const automaticPromptPendingRef = useRef(false)
  const [isStandalone, setIsStandalone] = useState(detectStandalone)
  const [isPwaInstalled, setIsPwaInstalled] = useState(readInstalledState)

  useEffect(() => {
    registerServiceWorker()

    if (detectStandalone()) {
      saveInstalledState()
      setIsPwaInstalled(true)
    }

    const installElement = installElementRef.current
    if (!installElement) return

    const markInstalled = () => {
      saveInstalledState()
      setIsPwaInstalled(true)
    }
    const handleInstallAvailable = () => {
      if (!automaticPromptPendingRef.current || readDismissedState()) return
      automaticPromptPendingRef.current = false
      installElement.showDialog()
    }
    const handleUserChoice = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message
      if (message === 'dismissed') saveDismissedState()
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => {
      const standalone = detectStandalone()
      setIsStandalone(standalone)
      if (standalone) markInstalled()
    }

    installElement.addEventListener('pwa-install-available-event', handleInstallAvailable)
    installElement.addEventListener('pwa-install-success-event', markInstalled)
    installElement.addEventListener('pwa-user-choice-result-event', handleUserChoice)
    mediaQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      installElement.removeEventListener('pwa-install-available-event', handleInstallAvailable)
      installElement.removeEventListener('pwa-install-success-event', markInstalled)
      installElement.removeEventListener('pwa-user-choice-result-event', handleUserChoice)
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [])

  const showInstallPrompt = useCallback((mode: 'automatic' | 'manual' = 'manual') => {
    const installElement = installElementRef.current
    if (!installElement || isStandalone || isPwaInstalled) return

    if (mode === 'automatic') {
      if (readDismissedState()) return
      automaticPromptPendingRef.current = true
      if (!installElement.isInstallAvailable) return
      automaticPromptPendingRef.current = false
      installElement.showDialog()
      return
    }

    installElement.showDialog(true)
  }, [isPwaInstalled, isStandalone])

  const value = useMemo<PwaInstallContextValue>(() => ({
    isPwaInstalled: isStandalone || isPwaInstalled,
    isStandalone,
    showInstallPrompt,
  }), [isPwaInstalled, isStandalone, showInstallPrompt])

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
      <pwa-install
        ref={installElementRef}
        manual-apple="true"
        manual-chrome="true"
        useLocalStorage
        manifest-url="/manifest.webmanifest"
        styles={{ '--tint-color': '#5e4ed5' }}
      />
    </PwaInstallContext.Provider>
  )
}
