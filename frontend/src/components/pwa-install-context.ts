import { createContext, useContext } from 'react'

export type PwaInstallContextValue = {
  isPwaInstalled: boolean
  isInstallAvailable: boolean
  isStandalone: boolean
  showInstallPrompt: (mode?: 'automatic' | 'manual') => void
}

export const PwaInstallContext = createContext<PwaInstallContextValue | null>(null)

export function usePwaInstall() {
  const context = useContext(PwaInstallContext)
  if (!context) throw new Error('usePwaInstall must be used within PwaInstallProvider')
  return context
}
