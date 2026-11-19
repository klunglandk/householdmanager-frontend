import { useQueryClient } from "@tanstack/react-query"
import { NavLink, Outlet } from "react-router"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth-api"
import { currentUserKey, useCurrentUser } from "@/lib/use-current-user"

export function AppLayout() {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()

  async function handleLogout() {
    await logout()
    queryClient.setQueryData(currentUserKey, null)
  }

  return (
    <div className="min-h-svh">
      <header className="flex items-center gap-4 border-b p-4">
        <nav className="flex gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/weekly-planner">Weekly Planner</NavLink>
        </nav>
        <span className="ml-auto text-sm">
          {user?.userName} ({user?.role})
        </span>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
