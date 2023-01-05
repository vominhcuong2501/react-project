import { useMounted } from '@hooks/useMounted';
import { useEffect } from 'react';

const SearchInputComponent = () => {
  const isMounted = useMounted();
  useEffect(() => {
    if (!isMounted) return;
    const script = document.createElement('script');
    script.src = '/js/googleSearch.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isMounted]);

  return (
    <div id="search-container">
      <div className="ibc-nav-search">
        <div id="searchInput"></div>
      </div>
    </div>
  );
};

export default SearchInputComponent;
