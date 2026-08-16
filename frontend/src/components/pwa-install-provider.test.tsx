import { act, renderHook, waitFor } from '@testing-library/react'
import { type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePwaInstall } from './pwa-install-context'
import { PwaInstallProvider } from './pwa-install-provider'

describe('PwaInstallProvider', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  function wrapper({ children }: { children: ReactNode }) {
    return <PwaInstallProvider>{children}</PwaInstallProvider>
  }

  function getInstallElement() {
    return document.querySelector('pwa-install') as HTMLElement & {
      showDialog: ReturnType<typeof vi.fn>
      isInstallAvailable: boolean
    }
  }

  it('opens the library dialog when automatic installation becomes available', async () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => result.current.showInstallPrompt('automatic'))

    await waitFor(() => expect(getInstallElement().showDialog).toHaveBeenCalledWith())
  })

  it('forces the library dialog open from a manual action', () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => result.current.showInstallPrompt('manual'))

    expect(getInstallElement().showDialog).toHaveBeenCalledWith(true)
  })

  it('recognizes a PWA launch from the URL query parameter', () => {
    window.history.replaceState({}, '', '/app?source=pwa')

    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    expect(result.current.isPwaInstalled).toBe(true)
    expect(result.current.isStandalone).toBe(false)
  })

  it('recognizes standalone mode as a PWA launch', async () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    await waitFor(() => expect(result.current.isPwaInstalled).toBe(true))
  })

  it('ignores the legacy persisted installed state in a browser tab', () => {
    localStorage.setItem('until-pwa-installed', 'true')

    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    expect(result.current.isStandalone).toBe(false)
    expect(result.current.isPwaInstalled).toBe(false)
  })

  it('preserves the library prompt state across provider mounts', () => {
    localStorage.setItem('pwa-hide-install', 'true')

    renderHook(() => usePwaInstall(), { wrapper })

    expect(localStorage.getItem('pwa-hide-install')).toBe('true')
  })

  it('does not reopen the automatic dialog after a dismissal', async () => {
    localStorage.setItem('until-pwa-install-banner-seen', 'true')
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => result.current.showInstallPrompt('automatic'))
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })

  it('records dismissals reported by the library', () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => getInstallElement().dispatchEvent(new CustomEvent('pwa-user-choice-result-event', {
      detail: { message: 'dismissed' },
    })))

    expect(result.current.isDialogHidden).toBe(true)
  })

  it('does not treat a cancelled native prompt as an installation', () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => getInstallElement().dispatchEvent(new CustomEvent('pwa-user-choice-result-event', {
      detail: { message: 'dismissed' },
    })))

    expect(result.current.isPwaInstalled).toBe(false)
  })

  it('does not trust the library success event without a native installation event', () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => getInstallElement().dispatchEvent(new CustomEvent('pwa-install-success-event')))

    expect(result.current.isPwaInstalled).toBe(false)
  })

  it('marks the app as installed only after the native appinstalled event', async () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => window.dispatchEvent(new Event('appinstalled')))

    await waitFor(() => expect(result.current.isPwaInstalled).toBe(true))
  })
})
