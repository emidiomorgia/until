import { describe, expect, it } from 'vitest'
import { isPwaLaunch, pwaManifest } from './pwa'

describe('PWA metadata', () => {
  it('declares branded manifest and standalone launch metadata', () => {
    expect(pwaManifest.name).toBe('until')
    expect(pwaManifest.id).toBe('/app')
    expect(pwaManifest.start_url).toBe('/app?source=pwa')
    expect(pwaManifest.display).toBe('standalone')
    expect(pwaManifest.related_applications).toEqual([{
      platform: 'webapp',
      url: '/manifest.webmanifest',
      id: '/app',
    }])
    expect(pwaManifest.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: '/assets/icon-192.png', sizes: '192x192' }),
      expect.objectContaining({ src: '/assets/icon-512.png', sizes: '512x512' }),
    ]))
  })

  it('recognizes the PWA launch query parameter', () => {
    expect(isPwaLaunch('?source=pwa')).toBe(true)
    expect(isPwaLaunch('?source=web')).toBe(false)
    expect(isPwaLaunch('')).toBe(false)
  })
})
