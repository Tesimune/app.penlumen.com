import Link from 'next/link';
import { Metadata } from 'next';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';

export const metadata: Metadata = {
  title: 'Penlumen - Welcome',
  description: 'The Writers Hub for genius minds',
};

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 font-sans'>
      <section className='w-full max-w-4xl p-6 md:p-10'>
        <div className='space-y-8 text-zinc-600'>
          <div className='flex justify-center'>
            <Logo />
          </div>

          <h1 className='text-3xl md:text-5xl font-bold text-center capitalize leading-tight'>
            The Writers Hub for Genius Minds
          </h1>

          <p className='text-lg md:text-xl text-center'>
            Create, Share and Earn with{' '}
            <span className='font-semibold'>Writer</span>. Equipped with FREE
            tools to help make your creative journey a success. It offers ACCESS
            to tools to improve and assist you in writing error-free content.
          </p>

          <div className='flex flex-col sm:flex-row items-stretch gap-4 justify-center'>
            <Button asChild variant='outline' className='w-full sm:w-auto'>
              <Link href='/login'>Get Started</Link>
            </Button>
            <Button asChild className='w-full sm:w-auto'>
              <Link href='/register'>Join the Community</Link>
            </Button>
          </div>

          <form
            className='flex items-center gap-2'
            // onSubmit={(e) => e.preventDefault()}
          >
            <div className='relative flex-grow'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
              <Input
                type='email'
                id='subscribe-email'
                placeholder='Enter your email'
                className='pl-10'
                required
              />
            </div>
            <Button type='submit' className='flex-shrink-0'>
              <Send className='w-5 h-5 mr-2' />
              Subscribe
            </Button>
          </form>

          <div className='flex items-center gap-6 justify-center text-zinc-500'>
            <a href='#' aria-label='Facebook'>
              <Facebook className='w-6 h-6' />
            </a>
            <a href='#' aria-label='Twitter'>
              <Twitter className='w-6 h-6' />
            </a>
            <a href='#' aria-label='Instagram'>
              <Instagram className='w-6 h-6' />
            </a>
            <a href='#' aria-label='LinkedIn'>
              <Linkedin className='w-6 h-6' />
            </a>
            <a href='#' aria-label='Email'>
              <Mail className='w-6 h-6' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
