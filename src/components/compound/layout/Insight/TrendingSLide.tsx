import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import { useUrls } from '@hooks/useUrls';
import classNames from 'classnames';
import { get, map, toString } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TrendingSlide({ menu = [] }: any) {
  const insightsData = menu.find((item) => toString(item.name) === 'Insights');
  const listInsights = get(insightsData, 'sub', null);
  const router = useRouter();
  const handleClick = (path) => router.push(path);

  const urls = useUrls();

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-insight__breadcrumb">
            <BreadcrumbsComponent />
          </div>
          <div className="ibc-insight ibc-insight__trending">
            {map(listInsights, (item, index) => (
              <div
                key={`${index}`.toString()}
                onClick={() => handleClick(`/${item.url}`)}
                className={classNames([
                  'ibc-insight__trending--item',
                  { 'ibc-active': urls?.includes(item.url?.replace('/', '')) },
                  { 'ibc-active': urls?.includes(item.url) },
                ])}
              >
                <h2>
                  <Link href={`/${item.url}`}>
                    <a target="_self" title={item.name}>
                      {item.name}
                    </a>
                  </Link>
                </h2>
                {item.summary && <h3>{item.summary}</h3>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
