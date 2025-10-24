import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuthStore } from "../../store/authStore"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { SpinnerButton } from "../buttons/SpinnerButton"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, loading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      await login(email, password)
      toast.success("You're in.", {description: "Logged in successfully."})
      navigate("/dashboard")

    } catch (err) {
     console.error("Error!",err)
     toast.error("You're almost there.", {
      description: "Login failed, please try again."
     })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Log in</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </div>
          {/* email input */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          {/* password input */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="your@email.com"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>


          <Field>
            <SpinnerButton isLoading={loading} loadingText="Please wait" children={"Log in"} />
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
