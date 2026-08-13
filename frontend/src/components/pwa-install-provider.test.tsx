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

  it('captures an accepted native prompt and persists the installed state', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined)
    const event = new Event('beforeinstallprompt', { cancelable: true })
    Object.assign(event, {
      prompt,
      userChoice: Promise.resolve({ outcome: 'accepted' as const }),
    })
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => window.dispatchEvent(event))
    await waitFor(() => expect(result.current.canPromptInstall).toBe(true))
    await act(async () => {
      expect(await result.current.install()).toBe('prompted')
    })

    expect(prompt).toHaveBeenCalledTimes(1)
    expect(result.current.canPromptInstall).toBe(false)
    expect(result.current.isPwaInstalled).toBe(true)
    expect(localStorage.getItem('until-pwa-installed')).toBe('true')
  })

  it('persists the installed state after the browser installation event', async () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    act(() => window.dispatchEvent(new Event('appinstalled')))

    await waitFor(() => expect(result.current.isStandalone).toBe(true))
    expect(result.current.isPwaInstalled).toBe(true)
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

  it('returns the manual fallback when no native prompt is available', async () => {
    const { result } = renderHook(() => usePwaInstall(), { wrapper })

    await expect(result.current.install()).resolves.toBe('manual')
  })
})
