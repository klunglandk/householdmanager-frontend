import { useCurrentUser } from "@/lib/use-current-user"

export function HomePage() {
  const { data: user } = useCurrentUser()

  return <p>Welcome, {user?.userName}</p>
}
