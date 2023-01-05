import { NextImage } from '@components/primitive';
import { selectListInsights } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import { get, map } from 'lodash';
import Link from 'next/link';
import List from './List';

export default function Lastest() {
  const selectorListInsight = useAppSelector(selectListInsights);
  const firstData = get(selectorListInsight, 'insights', []);
  const getListInsight = firstData.slice(1, 3);
  const lists = get(selectorListInsight, 'insights', []);

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          {map(
            lists,
            (item, index) =>
              index === 0 && (
                <div className="ibc-insight__lastest" key={`${index}`.toString()}>
                  <h1>Lastest insights</h1>
                  <div>
                    <Link href={`/insights/${item.keyword}`}>
                      <a target="_self" title={item.name}>
                        <NextImage
                          alt={item.name}
                          height="435"
                          width="773"
                          src={item.icon}
                          title={item.summary}
                        />
                        <div className="ibc-insight__lastest__text">
                          <h2>{item.name}</h2>
                          <p>{item.summary}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
      <div className="ibc-insight__lastest--list">
        {firstData && <List data={getListInsight} keyword="global-trends" />}
      </div>
    </section>
  );
}
