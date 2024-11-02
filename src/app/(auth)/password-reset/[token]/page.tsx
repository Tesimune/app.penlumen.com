'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Errors {
  email?: string[]
  password?: string[]
  password_confirmation?: string[]
}

export default function PasswordReset() {
  const searchParams = useSearchParams()
  const { resetPassword } = useAuth() as unknown as {
    resetPassword: (params: {
      email: string
      password: string
      password_confirmation: string
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
      setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }) => void
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const submitForm = (event: FormEvent) => {
    event.preventDefault()
    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    })
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
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
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.join(', ')}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs italic">{errors.password_confirmation.join(', ')}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Reset Password
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