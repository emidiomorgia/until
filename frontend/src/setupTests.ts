import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('@khmyznikov/pwa-install', () => {
  class MockPwaInstallElement extends HTMLElement {
    isDialogHidden = true
    isInstallAvailable = false
    isUnderStandaloneMode = false
    isRelatedAppsInstalled = false
    showDialog = vi.fn((forced = false) => {
      if (forced) this.isInstallAvailable = true
      this.isDialogHidden = false
    })
    hideDialog = vi.fn(() => {
      this.isDialogHidden = true
    })
    install = vi.fn()
    getInstalledRelatedApps = vi.fn(async () => [])

    connectedCallback() {
      this.isUnderStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      if (this.isUnderStandaloneMode) return

      queueMicrotask(() => {
        this.isInstallAvailable = true
        this.dispatchEvent(new CustomEvent('pwa-install-available-event'))
      })
    }
  }

  if (!customElements.get('pwa-install')) {
    customElements.define('pwa-install', MockPwaInstallElement)
  }

  return { PWAInstallElement: MockPwaInstallElement }
})

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
})
