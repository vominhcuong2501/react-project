import { ResponseConfig } from '@interfaces/index';
import { get } from 'lodash';

interface IntelligenceProps {
  intelligenceNetwork: ResponseConfig;
}

export function Intelligence({ intelligenceNetwork }: IntelligenceProps) {
  const content = get(intelligenceNetwork, 'config.content', '');
  return <section dangerouslySetInnerHTML={{ __html: content }} />;
}
