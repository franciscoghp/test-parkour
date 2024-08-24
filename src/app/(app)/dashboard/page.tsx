import { DataTableDemo } from "@/components/data-table/page";
import TranslateText from "@/components/translateText/page";
import { getUserAuth } from "@/lib/auth/utils";
import { fetchPersonalInfo } from "@/lib/fetchPersonalInfo";

export default async function Home() {
  const { session } = await getUserAuth();
  const data = await fetchPersonalInfo();
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">
        <TranslateText id={'listPersonalInfo'}/>
      </h1>
      {session ? (
      <DataTableDemo  data={data} />
      ) : null}
    </main>
  );
}
