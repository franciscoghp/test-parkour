import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/sign-in');
  return null; // No necesitas renderizar nada aquí
}
