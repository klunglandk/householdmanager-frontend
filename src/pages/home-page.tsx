import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth-api"
import { currentUserKey, useCurrentUser } from "@/lib/use-current-user"

export function HomePage() {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()

  async function handleLogout() {
    await logout()
    queryClient.setQueryData(currentUserKey, null)
  }

  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <p>
        Logged in as {user?.userName} ({user?.role})
      </p>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}
