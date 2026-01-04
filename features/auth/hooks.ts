import { useCallback } from 'react';
import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { login, logout, fetchCurrentUser } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector((s) => s.auth);

  const signIn = useCallback((credentials) => dispatch(login(credentials)), [dispatch]);
  const signOut = useCallback(() => dispatch(logout()), [dispatch]);
  const refresh = useCallback(() => dispatch(fetchCurrentUser()), [dispatch]);

  return { ...auth, signIn, signOut, refresh };
};
