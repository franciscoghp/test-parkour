import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('getUserAuth')
  const session = await getUserAuth();
  console.log(session)
  if (session?.session) redirect("/dashboard");

  return ( <div className="bg-muted h-screen pt-8">{children}</div> );
}
