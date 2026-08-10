export const pwaManifest = {
  name: 'until',
  start_url: '/app',
  display: 'standalone',
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192' },
    { src: '/assets/icon-512.png', sizes: '512x512' },
  ],
} as const

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    void navigator.serviceWorker.register('/sw.js')
  }
}
