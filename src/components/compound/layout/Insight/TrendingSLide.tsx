import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import { get, toString } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TrendingSlide({ menu = [] }: any) {
  const insightsData = menu.find((item) => toString(item.name) === 'Insights');
  const listInsights = get(insightsData, 'sub', null);
  const router = useRouter();
  const handleClick = (path) => router.push(path);

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-insight__breadcrumb">
            <BreadcrumbsComponent />
          </div>
          <div className="ibc-insight ibc-insight__trending">
            {listInsights &&
              listInsights.map((item, index) => (
                <div
                  key={`${index}`.toString()}
                  className="ibc-insight__trending--item"
                  onClick={() => handleClick(`/${item.url}`)}
                >
                  <h2>
                    <Link href={`/${item.url}`}>
                      <a target="_self" title="FAQ">
                        {item.name}
                      </a>
                    </Link>
                  </h2>
                  <h3>{item.summary}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
