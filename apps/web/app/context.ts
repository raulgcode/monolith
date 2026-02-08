import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
}

export const UserContext = createContext<User | null>(null);

export function useUser(): User {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser must be used within a UserContext provider');
  }
  return user;
}
