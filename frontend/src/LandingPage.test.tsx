import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LandingPage from './LandingPage'

describe('until landing page', () => {
  it('presents the product and its three deadline views', () => {
    render(<LandingPage />)

    expect(screen.getByRole('heading', { name: /make time/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /one view for every/i })).toBeInTheDocument()
    expect(screen.getByText('Your deadlines')).toBeInTheDocument()
    expect(screen.getByText('Add something new')).toBeInTheDocument()
    expect(screen.getByText('See the distance')).toBeInTheDocument()
  })

  it('includes the required deadline detail values and meaningful logo text', () => {
    render(<LandingPage />)

    expect(screen.getAllByText('Launch the new website').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Jul 01, 2026').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Aug 24, 2026').length).toBeGreaterThan(0)
    expect(screen.getAllByText('51 days').length).toBeGreaterThan(0)
    expect(screen.getAllByAltText('until').length).toBeGreaterThan(0)
  })
})
