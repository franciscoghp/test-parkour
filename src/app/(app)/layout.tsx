import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import NextAuthProvider from '@/lib/auth/Provider';
import { I18nProvider } from '@/i18';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Leer la cookie de locale
  const cookieStore = cookies();
  const locale = cookieStore.get('locale')?.value || 'es'; // Valor por defecto
  console.log(locale)
  return (
    <I18nProvider locale={locale}>
      <NextAuthProvider>
        <main className="flex h-screen">
          <Sidebar />
          <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
            <Navbar />
            {children}
          </main>
        </main>
      </NextAuthProvider>
    </I18nProvider>
  );
}
