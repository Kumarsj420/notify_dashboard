import { AuthError as NextAuthError } from 'next-auth';

class AuthError extends NextAuthError {
  message = '';

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default AuthError;
