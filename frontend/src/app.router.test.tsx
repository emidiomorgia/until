import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './app.router'
import InstallPrompt from './components/InstallPrompt'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('application routes', () => {
  it('renders the landing page at the root path', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /open app/i })).toHaveAttribute('href', '/app')
    expect(screen.getByRole('link', { name: /explore until/i })).toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
  })

  it('renders the static application shell at /app', () => {
    renderAt('/app')
    expect(screen.getByText('Until', { selector: 'header p' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'List' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open or close application sidebar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close application sidebar' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'List' })).toHaveLength(1)
  })

  it('preserves the install state from the landing page and shows the banner after navigating to /app', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15',
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <InstallPrompt />
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /open app/i }))

    expect(await screen.findByRole('complementary', { name: 'Install until' })).toBeInTheDocument()
  })

  it('shows the installation banner when the app is opened directly at /app', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15',
    })

    render(
      <MemoryRouter initialEntries={['/app']}>
        <InstallPrompt />
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('complementary', { name: 'Install until' })).toBeInTheDocument()
  })

  it('uses the landing page as the unknown-path fallback', () => {
    renderAt('/not-a-real-route')
    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
  })
})
