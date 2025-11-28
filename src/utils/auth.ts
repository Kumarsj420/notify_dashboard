import { signOut } from 'next-auth/react';
import { cookieRemove } from './cookies';

function logout() {
  signOut();
  cookieRemove('token');
}

export { logout };
