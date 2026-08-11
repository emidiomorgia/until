import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
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
  beforeEach(() => localStorage.clear())

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
