import { NextImage } from '@components/primitive';
import Breadcrumb from '@components/primitive/Breadcrumb';
import Expand from '@components/primitive/Expand';
import { IListServices } from '@interfaces/service-page';
import { get, map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ServicesListProps {
  listServices: IListServices;
  contentPage: any;
}
export default function DetailServices({ listServices, contentPage }: ServicesListProps) {
  const listServicesData = get(listServices, 'industries', []);
  const router = useRouter();
  const getContent = get(contentPage, 'page.content', '');

  return (
    <section className="ibc-industries">
      <div className="ibc-industries__fluid">
        <div className="ibc-industries__container">
          <div className="ibc-industries__main">
            <div className="ibc-industries__breadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>
            <div dangerouslySetInnerHTML={{ __html: getContent }}></div>

            <div className="ibc-industries__list">
              {map(listServicesData, (item, index) => (
                <div
                  className="ibc-industries__list--item"
                  key={`${item.id}-${index}`.toString()}
                  onClick={() => router.push(`${router.asPath}/${item.industryKeyword}`)}
                >
                  <div className="ibc-industries__list--item-content">
                    <div>
                      <NextImage
                        src={item.industryIcon}
                        alt={item.industryName}
                        width="360"
                        height="80"
                        title={item.industryName}
                      />
                      <h3>
                        <Link href={{ pathname: `${router.asPath}/${item.industryKeyword}` }}>
                          <a target="_self" title={item.industryName}>
                            {item.industryName}
                          </a>
                        </Link>
                      </h3>
                      <p>{item.industrySummary}</p>
                    </div>
                    <Expand link={`${router.asPath}/${item.industryKeyword}`} label="View more" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
