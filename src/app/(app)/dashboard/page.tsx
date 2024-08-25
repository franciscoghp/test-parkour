'use client';

import { useState, useEffect } from 'react';
import Loading from "@/app/loading";
import { DataTableDemo } from "@/components/data-table/page";
import TranslateText from "@/components/translateText/page";
import { useSession } from 'next-auth/react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); // Obtén la sesión y el estado de carga

  useEffect(() => {
    if (status === 'authenticated') { // Verifica si el usuario está autenticado
      loadData(session.user.id); // Pasa el ID del usuario a la función loadData
    }
  }, [status, session]);

  async function loadData(userId: any) {
    try {
      setLoading(true);
      // Aquí puedes añadir tu lógica de obtener la sesión si es necesario
      // const session = await getServerSession(authOptions);
      // setSession(session);
      const apiUrl = `/api/personal-info?userId=${userId}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch personal info');
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching personal info data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">
        <TranslateText id={'listPersonalInfo'} />
      </h1>
      <DataTableDemo data={data} />
    </main>
  );
}
