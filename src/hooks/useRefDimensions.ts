import { useEffect, useState } from 'react';

export const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null, top: null });
  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height, top } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height), top: Math.round(top) });
    }
  }, [ref]);
  return dimensions;
};
