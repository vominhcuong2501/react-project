import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useClickID(id: string, url: string) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  });

  useEffect(() => {
    const handleClick = () => {
      router.push(url);
    };
    const btn = document.getElementById(id);
    btn?.addEventListener('click', () => {
      handleClick();
    });

    return () => {
      btn?.removeEventListener('click', handleClick);
    };
  }, [mounted]);
}

export default useClickID;
