import { describe, expect, it } from 'vitest'
import { pwaManifest } from './pwa'

describe('PWA metadata', () => {
  it('declares branded manifest and standalone launch metadata', () => {
    expect(pwaManifest.name).toBe('until')
    expect(pwaManifest.start_url).toBe('/app')
    expect(pwaManifest.display).toBe('standalone')
    expect(pwaManifest.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: '/assets/icon-192.png', sizes: '192x192' }),
      expect.objectContaining({ src: '/assets/icon-512.png', sizes: '512x512' }),
    ]))
  })
})
