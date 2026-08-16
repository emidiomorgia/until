export const pwaManifest = {
  name: 'until',
  id: '/app',
  start_url: '/app',
  scope: '/app',
  display: 'standalone',
  launch_handler: {
    client_mode: 'navigate-existing',
  },
  handle_links: 'preferred',
  related_applications: [
    {
      platform: 'webapp',
      url: '/manifest.webmanifest',
      id: '/app',
    },
  ],
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192' },
    { src: '/assets/icon-512.png', sizes: '512x512' },
  ],
} as const

export function isPwaLaunch(search: string) {
  return new URLSearchParams(search).get('source') === 'pwa'
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    void navigator.serviceWorker.register('/sw.js', { scope: '/app' })
  }
}
