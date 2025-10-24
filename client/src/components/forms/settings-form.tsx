import { cn } from "@/lib/utils";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SpinnerButton } from "../buttons/SpinnerButton";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { Trash2, KeyRound, Mail } from "lucide-react";

export function SettingsForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    updateEmail,
    updatePassword,
    resetAccount,
    deactivateAccount,
    loading,
  } = useUserStore();

  // === Handle Email Update ===
  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email.");

    try {
      await updateEmail(email);
      toast.success("Email updated successfully.", {
        description: "Your account email has been updated.",
      });
      setEmail("");
    } catch (err: any) {
      console.error("Email update failed:", err);
      toast.error("Unable to update email.", {
        description: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  // === Handle Password Update ===
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword)
      return toast.error("Please fill out all password fields.");

    if (password !== confirmPassword)
      return toast.error("You're almost there.", { description: "Passwords do not match." });

    if (password.length < 6) {
        return toast.error("You're almost there.", { description: "New password must be at least 6 characters long." });
    }

    try {
      await updatePassword(oldPassword, password);
      toast.success("Password updated.", {
        description: "Your password has been changed successfully.",
      });
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password update failed:", err);
      toast.error("Unable to update password.", {
        description: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  // === Handle Account Deactivation ===
  const handleDeactivate = async () => {
    try {
      await deactivateAccount();
      toast.success("Account deactivated.", {
        description: "Your account has been deactivated successfully.",
      });
      navigate("/register");
    } catch (err: any) {
      console.error("Account deactivation failed:", err);
      toast.error("Failed to deactivate account.", {
        description: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  // === Handle Account Reset ===
  const handleReset = async () => {
    try {
      await resetAccount();
      toast.success("Account reset.", {
        description: "All tracklists have been deleted.",
      });
    } catch (err: any) {
      console.error("Account reset failed:", err);
      toast.error("Failed to reset account.", {
        description: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 max-w-2xl mx-auto px-4 py-8", className)} {...props}>
      {/* Main Settings Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">

          Account Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your account preferences and credentials.
        </p>
      </div>

      <Separator />

      {/* === Email Update Card === */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5" /> Update Email
          </CardTitle>
          <CardDescription>
            Change the email address associated with your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleEmailUpdate}>
          <CardContent>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">New Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex justify-end pt-0">
            <SpinnerButton
              isLoading={loading}
              loadingText="Please wait"
              type="submit"
              className="mt-6"
            >
              Update
            </SpinnerButton>
          </CardFooter>
        </form>
      </Card>

      {/* === Password Update Card === */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <KeyRound className="w-5 h-5" /> Update Password
          </CardTitle>
          <CardDescription>
            Ensure your account is secure by using a strong and unique password, that's at least 6 characters long.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordUpdate}>
          <CardContent>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="oldPassword">Current Password</FieldLabel>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter your current password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex justify-end pt-0">
            <SpinnerButton
              isLoading={loading}
              loadingText="Please wait"
              type="submit"
              className="mt-6"
            >
              Update
            </SpinnerButton>
          </CardFooter>
        </form>
      </Card>

      {/* === Danger Zone Card (Mobile Responsive) === */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-xl text-destructive flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Danger Zone
          </CardTitle>
          <CardDescription className="text-destructive/80">
            Irreversible actions that will affect your account data. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">

          {/* Reset Account */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-background/50">
            <div className="space-y-0.5 mb-2 sm:mb-0">
              <p className="font-medium">Reset Account Data</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete all your tracklists and associated data.
              </p>
            </div>
            {/* w-full on mobile, auto-width on sm+ screens */}
            <SpinnerButton
              onClick={handleReset}
              variant={"destructive"}
              loadingText="Please wait"
              isLoading={loading}
              className="w-full sm:w-auto mt-2"
            >Reset</SpinnerButton>
          </div>

          {/* Deactivate Account */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-background/50">
            <div className="space-y-0.5 mb-2 sm:mb-0">
              <p className="font-medium">Deactivate Account</p>
              <p className="text-sm text-muted-foreground">
                Deactivate your account and return to the registration page. This is permanent.
              </p>
            </div>
            {/* w-full on mobile, auto-width on sm+ screens */}
            <SpinnerButton
              variant="destructive"
              loadingText="Please wait"
              isLoading={loading}
              onClick={handleDeactivate}
              className="w-full sm:w-auto mt-2"
            >
              Deactivate
            </SpinnerButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}