'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Errors {
  email?: string[]
}

export default function ForgotPassword() {
  const { forgotPassword } = useAuth() as unknown as {
    forgotPassword: (params: {
      email: string
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
      setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }) => void
  }

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<string | null>(null)

  const submitForm = (event: FormEvent) => {
    event.preventDefault()
    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email
        address and we will email you a password reset link that
        will allow you to choose a new one.
      </p>
      <form onSubmit={submitForm}>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email.join(', ')}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Email Password Reset Link
        </Button>
      </form>
      {status && (
        <Alert className="mt-4">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}