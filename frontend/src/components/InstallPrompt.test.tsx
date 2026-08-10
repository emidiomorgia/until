import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import InstallPrompt from './InstallPrompt'

const originalUserAgent = navigator.userAgent

afterEach(() => {
  vi.restoreAllMocks()
  Object.defineProperty(navigator, 'userAgent', { configurable: true, value: originalUserAgent })
})

describe('PWA install prompt', () => {
  it('captures beforeinstallprompt and calls the native prompt from the install button', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined)
    const event = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
      prompt: () => Promise<void>
      userChoice: Promise<{ outcome: 'accepted' }>
    }
    Object.assign(event, { prompt, userChoice: Promise.resolve({ outcome: 'accepted' as const }) })

    render(<InstallPrompt />)
    window.dispatchEvent(event)

    const installButton = await screen.findByRole('button', { name: 'Install until' })
    installButton.click()
    await waitFor(() => expect(prompt).toHaveBeenCalledTimes(1))
  })

  it('renders platform guidance without claiming a native prompt when Chrome event is unavailable', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15',
    })

    render(<InstallPrompt />)

    expect(await screen.findByText(/Add to Home Screen or Add to Dock/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Install until' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dismiss install prompt' })).toBeInTheDocument()
  })

  it('suppresses all install UI in standalone mode', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(<InstallPrompt />)

    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
  })
})
