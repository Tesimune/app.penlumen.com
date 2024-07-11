'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import Notify from '@/components/Notify';

interface Errors {
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  phone_number?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const Page: React.FC = () => {
  const { register } = useAuth();

  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone_code, setPhoneCode] = useState<string>('+234');
  const [phone_number, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    register({
      first_name,
      last_name,
      email,
      phone_code,
      phone_number,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  return (
    <form onSubmit={submitForm}>
      {/* first_name */}
      <div>
        <Label htmlFor="first_name">First Name</Label>

        <Input
          id="first_name"
          type="text"
          value={first_name}
          className="block mt-1 w-full"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
          required
          autoFocus
        />

        <InputError messages={errors.first_name} className="mt-2" />
      </div>

      {/* last_name */}
      <div>
        <Label htmlFor="last_name">Last Name</Label>

        <Input
          id="last_name"
          type="text"
          value={last_name}
          className="block mt-1 w-full"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
          required
        />

        <InputError messages={errors.last_name} className="mt-2" />
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <Label htmlFor="phone_number">Phone Number</Label>
        <div className="flex gap-2 mt-1 w-full placeholder:text-slate-200">
          <Input
            id="phone_code"
            className="w-16"
            value={phone_code}
            disabled={true}
            placeholder="+234"
          />
          <Input
            id="phone_number"
            type="number"
            className="w-full"
            value={phone_number}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)}
            required
            placeholder="8060000000"
          />
        </div>

        <InputError messages={errors.phone_number} className="mt-2" />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          className="block mt-1 w-full"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          required
        />

        <InputError messages={errors.email} className="mt-2" />
      </div>

      {/* Password */}
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          value={password}
          className="block mt-1 w-full"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          required
          autoComplete="new-password"
        />

        <InputError messages={errors.password} className="mt-2" />
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <Label htmlFor="passwordConfirmation">Confirm Password</Label>

        <Input
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          className="block mt-1 w-full"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
          required
        />

        <InputError messages={errors.password_confirmation} className="mt-2" />
      </div>

      <div className="flex items-center justify-end mt-4">
        <Link href="/login" className="underline text-sm text-gray-600 hover:text-gray-900">
          Already registered?
        </Link>

        <Button className="ml-4">Register</Button>
      </div>

      {/* Status Message */}
      <Notify status={status} />
    </form>
  );
}

export default Page;
