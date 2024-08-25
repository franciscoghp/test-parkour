import { PersonalInfo } from "@/components/data-table/columns";
import { getUserAuth } from "./auth/utils";

export const revalidate = 0; // O usa 'force-dynamic' si quieres regenerar en cada solicitud

export async function fetchPersonalInfo(): Promise<PersonalInfo[]> {
  try {
    const { session } = await getUserAuth();

    if (session?.user?.id) {
      // Determina la URL base según el entorno
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://'+process.env.VERCEL_URL
        : 'http://localhost:3000';

      // Construye la URL completa para la solicitud
      // const url = `${baseUrl}/api/personal-info?userId=${session?.user.id}`;
      const url = `${baseUrl}/api/personal-info?userId=${session?.user.id}`;

      console.log('Fetching data from:', url);

      // Realiza la solicitud
      const response = await fetch(url, {
        method: "GET",
        cache: 'force-cache' // Usa 'force-cache' si quieres forzar la caché
      });

      // Verifica si la respuesta es válida
      if (!response.ok) {
        throw new Error("Failed to fetch personal info data");
      }

      // Obtén los datos en formato JSON
      const data: PersonalInfo[] = await response.json();
      return data;
    }

    // Devuelve una lista vacía si no hay datos
    return [];
  } catch (error) {
    console.error("Error fetching personal info data:", error);
    return [];
  }
}
