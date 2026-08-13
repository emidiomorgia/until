import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePwaInstall } from '@/components/pwa-install-context'

const DISMISSED_STORAGE_KEY = 'until-pwa-install-banner-dismissed'

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
  const { canPromptInstall, install, isPwaInstalled } = usePwaInstall()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  if (pathname !== '/app' || isPwaInstalled || dismissed) return null

  const fallback = !canPromptInstall && !isChromium()
  if (!canPromptInstall && !fallback) return null

  const apple = isAppleFallback()

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_STORAGE_KEY, 'true')
    } catch {
      // Keep the in-memory dismissal when persistent storage is unavailable.
    }
    setDismissed(true)
  }

  return (
    <aside className="install-banner" aria-label="Install until">
      <div>
        <p className="install-banner-title">Keep until close</p>
        {canPromptInstall ? (
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
        {canPromptInstall ? (
          <Button type="button" size="sm" onClick={() => void install()}>Install until</Button>
        ) : null}
        <Button type="button" size="sm" variant="ghost" onClick={dismiss} aria-label="Dismiss install prompt">
          Not now
        </Button>
      </div>
    </aside>
  )
}
