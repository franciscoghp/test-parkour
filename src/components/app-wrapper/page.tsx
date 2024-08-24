import { checkAuth } from '@/lib/auth/utils';
import { ReactNode } from 'react';

const AuthWrapper = async ({ children }: { children: ReactNode }) => {
  await checkAuth(); // Verifica la autenticación
  return <>{children}</>;
};

export default AuthWrapper;
