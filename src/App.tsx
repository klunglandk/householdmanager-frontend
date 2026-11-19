import { Navigate, Route, Routes } from "react-router"
import { useCurrentUser } from "@/lib/use-current-user"
import { HomePage } from "@/pages/home-page"
import { LoginPage } from "@/pages/login-page"
import { AppLayout } from "@/components/app-layout"
import { WeeklyPlannerPage } from "./pages/weekly-planner-page"

function RequireLogin({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function RedirectIfLoggedIn({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) {
    return null
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RedirectIfLoggedIn>
            <LoginPage />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        element={
          <RequireLogin>
            <AppLayout />
          </RequireLogin>
        }
      >
        <Route index element={<HomePage />} />
      </Route>
      <Route path="weekly-planner" element={<WeeklyPlannerPage />} />
    </Routes>
  )
}

export default App
