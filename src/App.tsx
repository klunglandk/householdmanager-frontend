import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  fetchCurrentUser,
  login,
  logout,
  type CurrentUser,
} from "@/lib/auth-api"
import { refreshAccessToken } from "./lib/api-client"

export function App() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      if (await refreshAccessToken()) {
        setUser(await fetchCurrentUser())
      }
      setIsCheckingSession(false)
    }
    restoreSession()
  }, [])

  async function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault()
    setErrorMessage(null)
    try {
      await login(userName, password)
      setUser(await fetchCurrentUser())
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error")
    }
  }

  async function handleLogout() {
    await logout()
    setUser(null)
  }

  if (isCheckingSession) {
    return null
  }

  if (user) {
    return (
      <div className="flex flex-col items-start gap-3 p-6">
        <p>
          Logged in as {user.userName} ({user.role})
        </p>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3 p-6">
      <input
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder="Username"
        className="rounded border px-3 py-2"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="rounded border px-3 py-2"
      />
      <Button type="submit">Log in</Button>
      {errorMessage && <p className="text-destructive">{errorMessage}</p>}
    </form>
  )
}

export default App
