import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { registerServiceWorker } from '@/pwa'
import { PwaInstallContext, type PwaInstallContextValue } from '@/components/pwa-install-context'

const INSTALLED_STORAGE_KEY = 'until-pwa-installed'

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

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

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isStandalone, setIsStandalone] = useState(detectStandalone)
  const [isPwaInstalled, setIsPwaInstalled] = useState(readInstalledState)

  useEffect(() => {
    registerServiceWorker()

    if (detectStandalone()) {
      saveInstalledState()
      setIsPwaInstalled(true)
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }
    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsStandalone(true)
      saveInstalledState()
      setIsPwaInstalled(true)
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => setIsStandalone(detectStandalone())

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    mediaQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [])

  const value = useMemo<PwaInstallContextValue>(() => ({
    canPromptInstall: deferredPrompt !== null,
    isPwaInstalled: isStandalone || isPwaInstalled,
    isStandalone,
    install: async () => {
      if (!deferredPrompt) return 'manual'

      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      if (outcome === 'accepted') {
        saveInstalledState()
        setIsPwaInstalled(true)
      }
      return 'prompted'
    },
  }), [deferredPrompt, isPwaInstalled, isStandalone])

  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>
}
