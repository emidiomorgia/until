import { act, renderHook, waitFor } from '@testing-library/react'
import { type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePwaInstall } from './pwa-install-context'
import { PwaInstallProvider } from './pwa-install-provider'

describe('PwaInstallProvider', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })

  afterEach(() => localStorage.clear())

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

  it('persists the installed state after the library success event', async () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => getInstallElement().dispatchEvent(new CustomEvent('pwa-install-success-event')))

    await waitFor(() => expect(result.current.isPwaInstalled).toBe(true))
    expect(result.current.isStandalone).toBe(false)
    expect(localStorage.getItem('until-pwa-installed')).toBe('true')
  })

  it('persists the installed state when launched in standalone mode', async () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    await waitFor(() => expect(result.current.isPwaInstalled).toBe(true))
    expect(localStorage.getItem('until-pwa-installed')).toBe('true')
  })

  it('keeps the installed state when the installed PWA opens in a browser tab', () => {
    localStorage.setItem('until-pwa-installed', 'true')

    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    expect(result.current.isStandalone).toBe(false)
    expect(result.current.isPwaInstalled).toBe(true)
  })

  it('does not reopen the automatic dialog after a dismissal', async () => {
    localStorage.setItem('until-pwa-install-banner-dismissed', 'true')
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => result.current.showInstallPrompt('automatic'))
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })

  it('records dismissals reported by the library', () => {
    renderHook(() => usePwaInstall(), { wrapper })

    act(() => getInstallElement().dispatchEvent(new CustomEvent('pwa-user-choice-result-event', {
      detail: { message: 'dismissed' },
    })))

    expect(localStorage.getItem('until-pwa-install-banner-dismissed')).toBe('true')
  })
})
