import { useQuery } from "@tanstack/react-query"
import { refreshAccessToken } from "./api-client"
import { fetchCurrentUser, type CurrentUser } from "./auth-api"
import { getAccessToken } from "./auth-token"

export const currentUserKey = ["currentUser"]

async function loadCurrentUser(): Promise<CurrentUser | null> {
  if (!getAccessToken() && !(await refreshAccessToken())) {
    return null
  }
  return fetchCurrentUser()
}

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserKey,
    queryFn: loadCurrentUser,
    retry: false,
    staleTime: Infinity,
  })
}
