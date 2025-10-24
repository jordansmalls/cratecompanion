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


import ResetAccountButton from "../buttons/ResetAccountButton"

export function SettingsForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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



  // TODO: set up logic for resetting account, set up logic for deleting account, set up logic for updating email and password
  // TODO: configure styling
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

              </div>
              <span className="sr-only">Crate Companion</span>
            </a>
            <h1 className="text-xl font-bold">Account Settings</h1>
            <p>Update your email or password, reset your account or delete your account.</p>
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


          {/* old password input */}
          <Field>
            <FieldLabel htmlFor="oldPassword">Old password</FieldLabel>
            <Input
              id="oldPassword"
              type="password"
              placeholder="Enter your current password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Field>


          {/* password input */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>




        {/* Confirm input */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>




          <Field>
            <SpinnerButton isLoading={loading} loadingText="Please wait" children={"Log in"} />
          </Field>
        </FieldGroup>
      </form>

      <>
        <ResetAccountButton variant={"destructive"} loadingText={"Processing"} loading={false} className={"w-full"} />
        <SpinnerButton variant={"destructive"} loadingText="Test" isLoading={false}>Delete Account</SpinnerButton>
      </>
    </div>
  )
}
