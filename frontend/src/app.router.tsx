import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import AppShell from './AppShell'
import InstallPrompt from './components/InstallPrompt'
import AddTimerPage from './components/add-timer-page'
import TimerListPage from './components/timer-list-page'
import { PwaInstallProvider } from './components/pwa-install-provider'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<TimerListPage />} />
        <Route path="timers/new" element={<AddTimerPage />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <PwaInstallProvider>
        <InstallPrompt />
        <AppRoutes />
      </PwaInstallProvider>
    </BrowserRouter>
  )
}
