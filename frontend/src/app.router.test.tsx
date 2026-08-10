import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './app.router'

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
  })

  it('renders the static application shell at /app', () => {
    renderAt('/app')
    expect(screen.getByText('Until', { selector: 'header p' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'List' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open or close application sidebar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close application sidebar' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'List' })).toHaveLength(1)
  })

  it('uses the landing page as the unknown-path fallback', () => {
    renderAt('/not-a-real-route')
    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
  })
})
