import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { registerServiceWorker } from '@/pwa'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

function isAppleFallback() {
  const userAgent = navigator.userAgent
  return /iphone|ipad|ipod|macintosh/i.test(userAgent) &&
    !/crios|fxios|chrome|android/i.test(userAgent)
}

function isChromium() {
  return /chrome|chromium|crios|edg\//i.test(navigator.userAgent)
}

export default function InstallPrompt() {
  const { pathname } = useLocation()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [standalone, setStandalone] = useState(isStandalone)

  useEffect(() => {
    registerServiceWorker()

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }
    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setStandalone(true)
    }
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => setStandalone(isStandalone())

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    mediaQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [])

  if (pathname !== '/app' || standalone || dismissed) return null

  const fallback = !deferredPrompt && !isChromium()
  if (!deferredPrompt && !fallback) return null

  const apple = isAppleFallback()

  async function install() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <aside className="install-banner" aria-label="Install until">
      <div>
        <p className="install-banner-title">Keep until close</p>
        {deferredPrompt ? (
          <p className="install-banner-copy">Install the until app for quick access from your device.</p>
        ) : (
          <details className="install-instructions" open>
            <summary>How to install</summary>
            <p className="install-banner-copy">
              {apple
                ? 'Use your browser menu, then choose Add to Home Screen or Add to Dock.'
                : 'Use your browser menu and choose the option to install or add this app to your home screen.'}
            </p>
          </details>
        )}
      </div>
      <div className="install-banner-actions">
        {deferredPrompt ? (
          <Button type="button" size="sm" onClick={install}>Install until</Button>
        ) : null}
        <Button type="button" size="sm" variant="ghost" onClick={() => setDismissed(true)} aria-label="Dismiss install prompt">
          Not now
        </Button>
      </div>
    </aside>
  )
}
