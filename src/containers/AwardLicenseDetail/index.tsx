import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import NextLink from '@components/primitive/Link';
import { useUrls } from '@hooks/useUrls';
import { getDetailAwardLicenses } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import appStyle from '@scss/pages/award-licenses-detail/index.scss';
import { get, map } from 'lodash';
import Link from 'next/link';

interface AwardLicensesDetailProps {
  options: {
    name: string;
  };
}
export default function AwardLicensesDetail({ options }: AwardLicensesDetailProps) {
  const articles = useAppSelector(getDetailAwardLicenses);
  const relates = get(articles, 'relate', []);
  const url = useUrls('id');
  return (
    <>
      <style jsx>{appStyle}</style>
      <div className="ibc-container ibc-detail-header">
        <a href="#">
          <img src="/images/licenses-award.jpg" alt="" />
        </a>
        <div className="ibc-detail-header__content">
          <p>{options.name}</p>
        </div>
      </div>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-detail-breadcrumb">
            <BreadcrumbsComponent />
          </div>
          <div className="ibc-detail-content">
            <div>
              <h1 dangerouslySetInnerHTML={{ __html: get(articles, 'article.name', '') }} />
              <div
                className="ibc-content-format"
                dangerouslySetInnerHTML={{ __html: get(articles, 'article.content', '') }}
              />
            </div>
            <div className="ibc-content-sidebar">
              <h2>Other {`${options.name}`.toLowerCase()}</h2>

              {map(relates, (item) => (
                <div className="ibc-content-sidebar__item" key={item.id}>
                  <NextLink href={`${url}/${item.keyword}`} title={item.name} target="_self">
                    <img
                      src={item.icon}
                      alt={item.name}
                      title={item.name}
                      width="316"
                      height="316"
                    />
                  </NextLink>

                  <h3>
                    <Link href={`${url}/${item.keyword}`}>
                      <a
                        title={item.name}
                        target="_self"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
