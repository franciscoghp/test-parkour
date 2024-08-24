'use client';

import { useRouter } from 'next/navigation';

const ChangeLanguageBtn = () => {
  const router = useRouter();

  const handleLanguageChange = async (lang: string) => {
    await fetch('/api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: lang }),
    });
    router.refresh(); // Refresca la página para aplicar el cambio
  };

  return (
    <div className="space-y-2 space-x-3">
      <button onClick={() => handleLanguageChange('es')} className="btn">Español</button>
      <button onClick={() => handleLanguageChange('en')} className="btn">English</button>
    </div>
  );
};

export default ChangeLanguageBtn;
