import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import { IDetailArticle } from '@interfaces/data-hub';
import appStyle from '@scss/pages/insight-article/index.scss';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { GroupGetInDataHub } from './Form';

interface DataHubDetailArticleProps {
  detailDataHubArticle: IDetailArticle;
}

export default function DataHubDetailArticle({ detailDataHubArticle }: DataHubDetailArticleProps) {
  const detailArticle = get(detailDataHubArticle, 'article');

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (get(detailDataHubArticle, 'isSuccessful') === 'false') {
    router.push('/notfound');
  }

  return (
    <>
      <style jsx>{appStyle}</style>
      {/* <HeadSEO {...detailArticle}></HeadSEO> */}
      <div className="ibc-container">
        <div className="ibc-container-content">
          <section className="ibc-insight-container">
            <BreadcrumbsComponent />
            <div className="ibc-insight-swapper">
              <div
                className="ibc-content-insight ibc-content-format"
                dangerouslySetInnerHTML={{ __html: detailArticle?.content }}
              />
            </div>
          </section>
        </div>
      </div>
      <GroupGetInDataHub />
    </>
  );
}
