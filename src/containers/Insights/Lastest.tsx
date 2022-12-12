import { NextImage } from '@components/primitive';
import { get } from 'lodash';
import List from './List';

export default function Lastest({ listInsights }: any) {
  const firstData = get(listInsights, 'insights', []);
  const getListInsight = firstData.slice(0, 3);
  const list = get(listInsights, 'insights', []);

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          {list.map(
            (item, index) =>
              index === 0 && (
                <div className="ibc-insight__lastest" key={`${index}`.toString()}>
                  <h1>Lastest insights</h1>
                  <div>
                    <NextImage
                      alt={item.name}
                      height="435"
                      width="773"
                      src={item.icon}
                      title={item.summary}
                    />
                    <div className="ibc-insight__lastest__text">
                      <p>{item.name}</p>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
      <div className="ibc-insight__lastest--list">
        {firstData && <List data={getListInsight} keyword="{keyword} " />}
      </div>
    </section>
  );
}
