import { PersonalInfo } from "@/components/data-table/columns";
import { getUserAuth } from "./auth/utils";

export const revalidate = 0; // O usa 'force-dynamic' si quieres regenerar en cada solicitud

export async function fetchPersonalInfo(): Promise<PersonalInfo[]> {
  try {
    const { session } = await getUserAuth();
    // Agrega un parámetro aleatorio para forzar la actualización
    let url = process.env.NODE_ENV == 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'
    const response = await fetch(`${url}/api/personal-info?userId=${session?.user.id}&_=${Date.now()}`, {
      method: "GET",
      cache: 'force-cache'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch personal info data");
    }
    const data: PersonalInfo[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching personal info data:", error);
    return [];
  }
}
