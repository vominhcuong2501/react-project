import AboutArticle from '@components/compound/layout/AboutUs/LearMoreAboutArticle';
import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import HeadSEO from '@components/primitive/HeadSEO';
import SideBarComponent from '@components/primitive/Sidebar';
import Banner from '@containers/ContacUs/Banner';
import appStyle from '@scss/pages/insight-article/index.scss';
import { get, map } from 'lodash';

export default function LicensesDetailPage({ articlesInsights, configSidebar, ip, banner }: any) {
  const article = get(articlesInsights, 'article', null);
  const tags = get(articlesInsights, 'article.tags', []);
  const relate = get(articlesInsights, 'relate', null);
  const getSidebarConfig = get(configSidebar, 'config.content', '');

  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO {...article}></HeadSEO>
      <Banner banner={banner} />
      <div className="ibc-container">
        <div className="ibc-container-content">
          <section className="ibc-insight-container">
            <BreadcrumbsComponent />
            <div className="ibc-insight-swapper">
              <div className="ibc-content-insight ibc-content-format">
                <h1>{article?.name}</h1>
                <ul className="ibc-content-insight__tags">
                  {map(tags, (item, idx) => (
                    <li key={`${idx}`.toString()}>
                      <a target="_self" title={item.name}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
              </div>
              <div className="ibc-insight-swapper__sidebar">
                <SideBarComponent config={getSidebarConfig} relate={relate} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <AboutArticle />
    </>
  );
}
