'use server';
import { signIn } from '@/lib/auth';
import AuthError from '@/misc/AuthError';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export const signInAction = async (email: string, password: string) => {
  try {
   await signIn('credentials', {
      email,
      password,
      // redirect: false,
      redirectTo: '/'
    });
    return { message: '' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log('Redirect error:', error);
      throw error; // Next.js. will handle this
    }
    const err = error as AuthError;
    if (error instanceof AuthError) {
      const errorObj = JSON.parse(err?.message || '{}');
      return { ...errorObj };
    }
    return { message: err?.message || 'Something went wrong!' };
  }
};

export const signUpAction = async (
  name: string,
  email: string,
  password: string,
  company: string
) => {
  try {
    // Call the API to create the user
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        company,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || 'Failed to create account' };
    }

    // If successful, sign the user in automatically
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/'
    });
    
    return { message: '' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log('Redirect error:', error);
      throw error; // Next.js will handle this
    }
    const err = error as Error;
    return { message: err?.message || 'Something went wrong!' };
  }
};
