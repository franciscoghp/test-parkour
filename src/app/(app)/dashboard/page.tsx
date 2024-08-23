
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import { signOut } from "next-auth/react";

export default async function Home() {
  console.log('Home')
  const { session } = await getUserAuth();
  console.log(session)
  if( !session?.user.emailVerified ) {
    console.log('vamos a cerrar la sesion')
    signOut({ callbackUrl: "/sign-in" })
  }
  return (
    <main className="space-y-4">
      {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
