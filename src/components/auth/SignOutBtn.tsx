"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import TranslateText from "../translateText/page";

export default function SignOutBtn() {
  return (
    <Button variant={"destructive"} onClick={() => signOut({ callbackUrl: "/sign-in" })}>
      <TranslateText id={'signOut'}/>
    </Button>
  );
}
