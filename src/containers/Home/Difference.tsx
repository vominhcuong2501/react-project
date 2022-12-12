import { ResponseConfig } from '@interfaces/index';
import { get } from 'lodash';

interface DifferenceProps {
  difference: ResponseConfig;
}
export function Difference({ difference }: DifferenceProps) {
  const content = get(difference, 'config.content', '');
  return (
    <section
      className=" ibc-difference ibc-container-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
