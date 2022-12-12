import useSWR from 'swr';

export function useNextPath(currentPath: string) {
  const { data: path } = useSWR('/getUrl', {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
  });

  function hasPath() {
    return !!path.indexOF(currentPath);
  }

  return {
    hasPath,
  };
}
