import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from './app.router'
import InstallPrompt from './components/InstallPrompt'
import { PwaInstallProvider } from './components/pwa-install-provider'

const originalMatchMedia = window.matchMedia

afterEach(() => {
  window.matchMedia = originalMatchMedia
})

function getInstallElement() {
  return document.querySelector('pwa-install') as HTMLElement & {
    showDialog: ReturnType<typeof vi.fn>
  }
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PwaInstallProvider>
        <AppRoutes />
      </PwaInstallProvider>
    </MemoryRouter>,
  )
}

describe('application routes', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  it('renders the landing page at the root path', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /open app/i })).toHaveAttribute('href', '/app')
    expect(screen.getByRole('link', { name: /explore until/i })).toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
  })

  it('renders the static application shell at /app', () => {
    localStorage.setItem('until-timers', JSON.stringify([{
      id: 'one',
      title: 'Consegna progetto',
      startDate: '2026-08-11T09:00:00.000Z',
      endDate: '2026-08-11T17:00:00.000Z',
    }]))
    renderAt('/app')
    expect(screen.getByText('Until', { selector: 'header p' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Timers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open or close application sidebar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close application sidebar' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Timers' })).toHaveLength(1)
    expect(screen.getByText('Timers', { selector: 'header p' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Timers' })).toBeInTheDocument()
    expect(screen.queryByText('Workspace')).not.toBeInTheDocument()
    expect(screen.getByText('Consegna progetto')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /consegna progetto/i })).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(screen.getByRole('button', { name: /consegna progetto/i }))
    expect(screen.getByRole('button', { name: /consegna progetto/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Remaining time')).toBeInTheDocument()
  })

  it('renders a dedicated error item when saved timers are malformed', () => {
    localStorage.setItem('until-timers', '{not-json')
    renderAt('/app')

    expect(screen.getByRole('alert')).toHaveTextContent('Saved timer error')
  })

  it('shows add timer actions in the toolbar and empty state', () => {
    renderAt('/app')

    expect(screen.getByRole('heading', { name: 'No timers yet' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Add timer' })).toHaveLength(2)

    const savedTimers = screen.getByRole('region', { name: 'Saved timers' })
    expect(savedTimers.querySelector('img')).toBeInTheDocument()
    expect(within(savedTimers).getByRole('link', { name: 'Add timer' })).toHaveAttribute('href', '/app/timers/new')
  })

  it('validates and saves a new timer before returning to the updated list', () => {
    renderAt('/app/timers/new')

    expect(screen.getByRole('heading', { name: 'Add a timer' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Save timer' }))
    expect(screen.getByText('Enter a title.')).toBeInTheDocument()
    expect(screen.getByText('Choose a start date and time.')).toBeInTheDocument()
    expect(screen.getByText('Choose an end date and time.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Release countdown' } })
    fireEvent.change(screen.getByLabelText('Start'), { target: { value: '2026-08-11T12:00' } })
    fireEvent.change(screen.getByLabelText('End'), { target: { value: '2026-08-11T11:00' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save timer' }))
    expect(screen.getByText('End must be after start.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('End'), { target: { value: '2026-08-11T14:00' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save timer' }))

    expect(screen.getByText('Release countdown')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Add a timer' })).not.toBeInTheDocument()

    const storedTimers = JSON.parse(localStorage.getItem('until-timers') ?? '[]')
    expect(storedTimers).toHaveLength(1)
    expect(storedTimers[0]).toMatchObject({ title: 'Release countdown' })
    expect(Date.parse(storedTimers[0].startDate)).not.toBeNaN()
    expect(Date.parse(storedTimers[0].endDate)).toBeGreaterThan(Date.parse(storedTimers[0].startDate))
  })

  it('keeps the installer mounted on the landing page and opens it after navigating to /app', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <AppRoutes />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('link', { name: /open app/i }))

    await waitFor(() => expect(getInstallElement().showDialog).toHaveBeenCalledWith())
  })

  it('opens the installation dialog when the app is opened directly at /app', async () => {
    render(
      <MemoryRouter initialEntries={['/app']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <AppRoutes />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    await waitFor(() => expect(getInstallElement().showDialog).toHaveBeenCalledWith())
  })

  it('uses the landing page as the unknown-path fallback', () => {
    renderAt('/not-a-real-route')
    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Install until' })).not.toBeInTheDocument()
  })

  it('keeps the toolbar install action available after the library dialog is dismissed', async () => {
    render(
      <MemoryRouter initialEntries={['/app']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <AppRoutes />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    await waitFor(() => expect(getInstallElement().showDialog).toHaveBeenCalledWith())
    getInstallElement().dispatchEvent(new CustomEvent('pwa-user-choice-result-event', {
      detail: { message: 'dismissed' },
    }))
    const toolbarInstall = screen.getByRole('button', { name: 'Install until' })
    expect(toolbarInstall).toBeInTheDocument()

    getInstallElement().showDialog.mockClear()
    fireEvent.click(toolbarInstall)
    expect(getInstallElement().showDialog).toHaveBeenCalledWith(true)
  })

  it('hides banner and toolbar install actions in standalone mode', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(
      <MemoryRouter initialEntries={['/app']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <AppRoutes />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: 'Install until' })).not.toBeInTheDocument()
  })

  it('does not treat the legacy installed flag as an installed PWA in a browser tab', async () => {
    localStorage.setItem('until-pwa-installed', 'true')

    render(
      <MemoryRouter initialEntries={['/app']}>
        <PwaInstallProvider>
          <InstallPrompt />
          <AppRoutes />
        </PwaInstallProvider>
      </MemoryRouter>,
    )

    expect(getInstallElement().showDialog).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Install until' })).toBeInTheDocument())
  })
})
