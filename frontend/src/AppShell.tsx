import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { usePwaInstall } from '@/components/pwa-install-context'

export default function AppShell() {
  const { isInstallAvailable, showInstallPrompt, isInstallationStateReady, isPwaInstalled } = usePwaInstall()

  return (
    <SidebarProvider className="app-shell bg-muted/30">
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-background">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger aria-label="Open or close application sidebar" />
          <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-medium">Until</p>
            <p className="truncate text-xs text-muted-foreground">Timer list</p>
          </div>
          {isInstallationStateReady && !isPwaInstalled && isInstallAvailable ? (
            <Button
              type="button"
              size="sm"
              variant="default"
              className="ml-auto gap-2 shadow-sm"
              aria-label="Install until"
              onClick={() => showInstallPrompt('manual')}
            >
              <DownloadIcon aria-hidden="true" />
              <span>Install app</span>
            </Button>
          ) : <div className="ml-auto" />}
        </header>

        <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
