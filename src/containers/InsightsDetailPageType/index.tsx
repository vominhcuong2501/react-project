import { NextImage } from '@components/primitive';
import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import HeadSEO from '@components/primitive/HeadSEO';
import SideBarComponent from '@components/primitive/Sidebar';
import appStyle from '@scss/pages/insight-detail-page-type/index.scss';
import { get } from 'lodash';

export default function InsightDetailPageType({ articlesInsights, configSidebar }: any) {
  const article = get(articlesInsights, 'article', null);
  // const tags = get(articlesInsights, 'article.tags', null);
  const relate = get(articlesInsights, 'relate', null);
  const getSidebarConfig = get(configSidebar, 'config.content', '');
  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO {...article}></HeadSEO>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <section className="ibc-insight-container">
            <BreadcrumbsComponent />
            <div className="ibc-insight-swapper">
              <div className="ibc-content-insight">
                <h1>{article?.name}</h1>
                <ul className="ibc-content-insight__tags">
                  <li>
                    <a>Operations</a>
                  </li>
                </ul>

                <div>
                  <NextImage
                    src={article?.icon}
                    title="insight"
                    alt="insight"
                    height="435"
                    width="773"
                  />
                  <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
                </div>
              </div>
              <div className="ibc-insight-swapper__sidebar ibc-content-format">
                <SideBarComponent config={getSidebarConfig} relate={relate} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
