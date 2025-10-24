import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SpinnerButton } from "./SpinnerButton"
import axios from "axios"
import { toast } from "sonner"

export default function LogoutButton({ className, variant, text }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      toast.success("Come back soon?", { description: "You have been logged out successfully." })
      navigate("/login") // redirect after logout
    } catch (error: any) {
        console.error(error.response || error.message)
      toast.error(
        error.response?.data?.message || "Failed to log out"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SpinnerButton
      onClick={handleLogout}
      isLoading={isLoading}
      loadingText="Please Wait"
      className={className}
      variant={variant}
    >
      {text}
    </SpinnerButton>
  )
}
