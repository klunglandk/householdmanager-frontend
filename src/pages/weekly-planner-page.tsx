import { useCurrentUser } from "@/lib/use-current-user"

export function WeeklyPlannerPage() {
  const { data: user } = useCurrentUser()

  return <p>Welcome, {user?.userName}, here is your weekly planner</p>
}
