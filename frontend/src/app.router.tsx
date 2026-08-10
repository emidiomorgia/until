import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import AppShell from './AppShell'
import InstallPrompt from './components/InstallPrompt'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppShell />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <InstallPrompt />
      <AppRoutes />
    </BrowserRouter>
  )
}
