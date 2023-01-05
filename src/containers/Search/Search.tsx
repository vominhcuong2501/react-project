import { useMounted } from '@hooks/useMounted';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SearchComponent = () => {
  const router = useRouter();
  const isMounted = useMounted();

  useEffect(() => {
    const queryString = get(router, 'query.queryString', null);

    // eslint-disable-next-line no-undef
    if (isMounted) {
      if (typeof window !== 'undefined' && typeof google !== 'undefined') {
        // eslint-disable-next-line no-undef
        let element = google?.search.cse.element.getElement('main-searchresults');
        if (queryString) element.execute(queryString);
      }
    }
  }, [isMounted, router.asPath]);

  useEffect(() => {
    if (!isMounted) return;
    const script = document.createElement('script');
    script.src = '/js/googleSearchPage.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isMounted]);

  return (
    <div id="search-container">
      <div className="ibc-search-box">
        <i className="fa-light fa-magnifying-glass"></i>

        {/* search input */}
        <div id="searchBox"></div>

        {/* bind data */}
        <div id="ibc-google-listResult"></div>
      </div>
    </div>
  );
};
export default SearchComponent;
