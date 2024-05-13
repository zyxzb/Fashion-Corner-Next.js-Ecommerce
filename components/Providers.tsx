import { SessionProvider } from 'next-auth/react';

import { auth } from '@/lib/auth';

import ClientProvider from './ClientProvider';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ClientProvider>{children}</ClientProvider>
    </SessionProvider>
  );
};

export default Providers;
