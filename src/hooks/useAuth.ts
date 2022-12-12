import authService from '@services/authApi';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    mutate,
    data: profile,
    error,
  } = useSWR('/profile', {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
    ...options,
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login() {
    await authService.login({
      username: 'test1',
      password: '123123123',
    });

    await mutate();
  }

  async function logout() {
    await authService.logout();
    await mutate(null, false);
  }

  return {
    login,
    logout,
    profile,
    firstLoading,
  };
}
