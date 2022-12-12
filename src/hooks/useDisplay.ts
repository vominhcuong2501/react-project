import { useEffect, useState } from 'react';

const useDisplay = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    function reportWindowSize() {
      if (window.innerWidth < 1200) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    reportWindowSize();

    window.addEventListener('resize', reportWindowSize);

    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  return !!isMobile;
};

export { useDisplay };
