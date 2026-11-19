import { getAccessToken, setAccessToken } from "./auth-token"

async function sendWithToken(
  path: string,
  init: RequestInit
): Promise<Response> {
  const headers = new Headers(init.headers)
  const token = getAccessToken()

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return fetch(path, { ...init, headers })
}

export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const response = await sendWithToken(path, init)

  if (response.status !== 401) {
    return response
  }

  const refreshed = await refreshAccessToken()

  if (!refreshed) {
    return response
  }

  return sendWithToken(path, init)
}

async function requestNewToken(): Promise<boolean> {
  const response = await fetch("/api/Auth/refresh", { method: "POST" })

  if (!response.ok) {
    setAccessToken(null)
    return false
  }

  const data: { token: string } = await response.json()
  setAccessToken(data.token)
  return true
}

let refreshInFlight: Promise<boolean> | null = null

export function refreshAccessToken(): Promise<boolean> {
  refreshInFlight ??= requestNewToken().finally(() => {
    refreshInFlight = null
  })
  return refreshInFlight
}
