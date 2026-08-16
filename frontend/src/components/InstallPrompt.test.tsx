import { act, render, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import InstallPrompt from './InstallPrompt'
import { PwaInstallProvider } from './pwa-install-provider'

describe('PWA install prompt', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })

  function renderPrompt(path = '/app') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <PwaInstallProvider>
          <InstallPrompt />
        </PwaInstallProvider>
      </MemoryRouter>,
    )
  }

  function getInstallElement() {
    return document.querySelector('pwa-install') as HTMLElement & {
      showDialog: ReturnType<typeof vi.fn>
    }
  }

  it('requests the library dialog when the app route opens', async () => {
    renderPrompt()

    await waitFor(() => expect(getInstallElement().showDialog).toHaveBeenCalledWith())
  })

  it('does not request the library dialog on the landing page', async () => {
    renderPrompt('/')
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })

  it('suppresses the automatic dialog in standalone mode', async () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    renderPrompt()
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })

  it('respects a persisted dismissal when the app route opens', async () => {
    localStorage.setItem('until-pwa-install-banner-seen', 'true')
    renderPrompt()
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })

  it('does not reopen the dialog when returning from an app subroute', async () => {
    function NavigationHarness() {
      const navigate = useNavigate()
      return <button type="button" onClick={() => navigate('/app')}>Return to app</button>
    }

    render(
      <MemoryRouter initialEntries={['/app/timers/new']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <NavigationHarness />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    await act(async () => Promise.resolve())
    expect(getInstallElement().showDialog).not.toHaveBeenCalled()

    act(() => window.document.querySelector('button')?.click())
    await act(async () => Promise.resolve())

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
  })
})
