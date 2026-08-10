import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'

export default function AppShell() {
  return (
    <SidebarProvider className="app-shell bg-muted/30">
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-background">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger aria-label="Open or close application sidebar" />
          <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-medium">Application area</p>
            <p className="truncate text-xs text-muted-foreground">Static workspace</p>
          </div>
        </header>

        <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 md:p-6">
          <section className="sticky top-16 z-0 rounded-xl border bg-card p-5 shadow-sm md:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">List</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              A calm place to see what is ahead. This static preview establishes the application layout for the next increment.
            </p>
          </section>

          <section aria-label="Static overview" className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 shadow-sm md:col-span-2">
              <p className="text-sm font-medium">Your workspace</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">No live items are connected yet.</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <p className="text-sm font-medium">Status</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Preview</p>
              <p className="mt-1 text-xs text-muted-foreground">Static display only</p>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
