'use client';

import { signInAction } from '@/app/(auth)/action';
import Input from '../form/Input';
import Label from '../form/Label';
import { useForm} from '../form/useForm';
import { EyeIcon, EyeDropperIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import Button from '../Button';

const signInSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});
type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);
      setError('');

      const res = await signInAction(data.email, data.password);

      if (!res?.message) {
        // successful login - redirect will be handled by server action
        return;
      }

      if (res?.message) {
        setError(res.message);
      }
    } catch (error) {
      console.log('error onSubmit', error);
      if (error instanceof Error && error?.message === 'NEXT_REDIRECT') {
        // Redirect is happening, this is expected
      } else {
        setError(
          error instanceof Error ? error?.message : 'Something went wrong. Please try again.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-sc-100">
  
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div> */}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-600/90 mb-8 font-light">
              Sign in to your Notify Breach account
            </p>
          </div>

          {/* Form */}
          <div className="bg-white backdrop-blur-sm rounded-3xl shadow-xl shadow-sc-300/80 ring-1 ring-inset ring-sc-200 p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label required>Email Address</Label>
                <Input
                  {...form.getInputFields('email')}
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label required>Password</Label>
                <Input
                  {...form.getInputFields('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="mt-1"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-700 flex items-center justify-center h-full"
                    >
                      {showPassword ? (
                        <EyeDropperIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label> */}
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-500"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                size='lg'
                className="w-full justify-center"
                loading={loading || form.formState.isSubmitting}
                disabled={loading || form.formState.isSubmitting}
              >
                {loading || form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}