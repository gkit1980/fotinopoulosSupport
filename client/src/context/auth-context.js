
import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  username: '',
  login: () => {},
  logout: () => {}
});
