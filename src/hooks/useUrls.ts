import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Parameter is the boolean, with default "false" value
export const useUrls = (isReplaceId?: 'id' | 'article' | 'slug') => {
  // Initialize the state
  const router = useRouter();

  const [state, setState] = useState<string>();

  const query = get(router, 'query');
  const getId = query[isReplaceId];

  useEffect(() => {
    if (isReplaceId) {
      const replaceId = router.asPath.replace(`/${getId}`, '');
      setState(replaceId);
      return;
    }

    setState(router.asPath);
  }, [router.asPath]);

  return state;
};
