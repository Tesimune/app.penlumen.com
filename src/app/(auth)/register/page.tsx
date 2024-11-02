'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Errors {
  first_name?: string[]
  last_name?: string[]
  email?: string[]
  password?: string[]
  password_confirmation?: string[]
}

export default function Register() {
  const { register } = useAuth() as unknown as {
    register: (params: {
      first_name: string
      last_name: string
      email: string
      password: string
      password_confirmation: string
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
      setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }) => void
  }

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<string | null>(null)

  const submitForm = (event: FormEvent) => {
    event.preventDefault()

    register({
      first_name,
      last_name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={submitForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <div className="mb-4">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name.join(', ')}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name.join(', ')}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.join(', ')}</p>
            )}
          </div>

          <div className="mb-6">
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

          <div className="flex items-center justify-between mb-6">
            <Link href="/login" className="text-sm text-blue-500 hover:text-blue-800">
              Already registered?
            </Link>
            <Button type="submit">
              Register
            </Button>
          </div>

          {status && (
            <Alert>
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  )
}