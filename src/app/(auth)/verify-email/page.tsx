'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmailVerification() {
  const { logout, resendEmailVerification } = useAuth() as unknown as {
    logout: () => void
    resendEmailVerification: (options: { setStatus: React.Dispatch<React.SetStateAction<string | null>> }) => void
  }

  const [status, setStatus] = useState<string | null>(null)

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <p className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you did not receive the email, we will gladly send you another.
      </p>
      <div className="flex justify-between items-center">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          Resend Verification Email
        </Button>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      {status && (
        <Alert className="mt-4">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}