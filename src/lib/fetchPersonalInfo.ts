import { PersonalInfo } from "@/components/data-table/columns";
import { getUserAuth } from "./auth/utils";

export async function fetchPersonalInfo(): Promise<PersonalInfo[]> {
  try {
    const { session } = await getUserAuth();
    console.log(session)
    const response = await fetch(`${process.env.BASE_URL}/api/personal-info?userId=${session?.user.id}`, {
      method: "GET",
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
