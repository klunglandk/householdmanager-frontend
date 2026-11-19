import { setAccessToken } from "./auth-token"
import { apiFetch } from "./api-client"

export async function login(userName: string, password: string): Promise<void> {
  const response = await fetch("/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  })

  if (!response.ok) {
    const problem = await response.json().catch(() => null)
    throw new Error(problem?.detail ?? `Login failed (${response.status})`)
  }

  const data: { token: string } = await response.json()
  setAccessToken(data.token)
}

export type CurrentUser = {
  id: string
  userName: string
  householdId: number
  role: "admin" | "child"
  isActive: boolean
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const response = await apiFetch("/api/Auth/me")

  if (!response.ok) {
    throw new Error(`Could not load user (${response.status})`)
  }

  return response.json()
}

export async function logout(): Promise<void> {
  await apiFetch("/api/Auth/logout", { method: "POST" })
  setAccessToken(null)
}
