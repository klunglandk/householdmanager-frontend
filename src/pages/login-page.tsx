import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/auth-api"
import { currentUserKey } from "@/lib/use-current-user"

export function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  async function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault()
    setErrorMessage(null)
    try {
      await login(userName, password)
      await queryClient.invalidateQueries({ queryKey: currentUserKey })
      navigate("/")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error")
    }
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
