import { INSIGHTS } from '@/constants';
import { ResponseListInsight } from '@interfaces/index';
import { map } from 'lodash';
import Link from 'next/link';

interface IntelligenceProps {
  listInsight: ResponseListInsight;
}

export function Trending({ listInsight }: IntelligenceProps) {
  const { insights }: any = listInsight || {};
  return (
    <section className="ibc-trending ibc-container-layout">
      <h2>TRENDING INSIGHTS</h2>
      <ol className="ibc-trending__container">
        {map(insights, (item) => (
          <li className="ibc-trending__item" key={`${item.id}`.toString()}>
            <Link href={`/${INSIGHTS}/${item.keyword}`}>
              <a title={item.name} target="_self">
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
