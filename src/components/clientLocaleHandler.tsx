// src/components/ClientLocaleHandler.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLocaleHandler = ({ setLocale }: { setLocale: (locale: string) => void }) => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const locale = queryParams.get('locale') || 'es'; // Valor por defecto en caso de que no se pase `locale`
    setLocale(locale);
    setInitialized(true);
  }, [router, setLocale]);

  return <>{initialized && <div>Initialized</div>}</>;
};

export default ClientLocaleHandler;
