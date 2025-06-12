import { login, loginWithGoogle, signup } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to home
        </Link>

        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Welcome back
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link
              href='/signup'
              className='font-medium text-green-600 hover:text-green-500'
            >
              Sign up
            </Link>
          </p>
        </div>
        <form className='mt-8 space-y-6'>
          {/* <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email address</Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                placeholder='Enter your email'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                minLength={6}
                placeholder='Enter your password (min. 6 characters)'
              />
              <p className='text-sm text-muted-foreground'>
                Password must be at least 6 characters long
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='remember-me' name='remember-me' />
              <Label htmlFor='remember-me' className='text-sm'>
                Remember me
              </Label>
            </div>

            <div className='text-sm'>
              <Link
                href='/forgot-password'
                className='font-medium text-green-600 hover:text-green-500'
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className='space-y-4'>
            <Button
              formAction={login}
              className='w-full bg-green-600 hover:bg-green-700'
            >
              Sign in with Email
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div> */}

          <Button
            formAction={loginWithGoogle}
            variant='outline'
            className='w-full'
          >
            <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            Sign in with Google
          </Button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
