import { FooterLayout } from '@components/compound';
import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import HeadSEO from '@components/primitive/HeadSEO';
import { LayoutProps } from '@interfaces/index';
import {
  getFooterConfig,
  selectFooterConfig,
  selectFooterMenu,
  selectHeaderMenu,
} from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import coporate from '@scss/components/coporate.scss';
import contentStyle from '@scss/components/group-style-first-detail.scss';
import stylePartners from '@scss/layout/about.scss';
import officeStyle from '@scss/pages/about-us-offices/index.scss';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderLayout from '../../GroupHeader';
import JoinOurTeam from './JoinOurTeam';
import AboutArticle from './LearMoreAboutArticle';

export default function AboutLayout({ children, data }: LayoutProps) {
  const { menuList, footerMenu } = data;
  const getMetaData = get(data, 'metaData', null);
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);
  const footerConfig = get(useAppSelector(selectFooterConfig), 'config.content', null);
  const configFooter = get(useAppSelector(getFooterConfig), 'config.content', null);
  const router = useRouter();

  const banner = get(data, 'article.article', '');

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0 });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.asPath]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      {getMetaData && <HeadSEO {...getMetaData} />}

      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      <main style={{ backgroundColor: '#e5e5e5' }}>
        <style jsx>{officeStyle}</style>
        <style jsx>{contentStyle}</style>
        <style jsx>{stylePartners}</style>
        <style jsx>{coporate}</style>
        <section>
          <div className="ibc-about-banner">
            <div className="ibc-container">
              <div className="ibc-about-banner__content">
                <a href="">
                  <img src={banner?.icon} width="1920" height="380" alt="/" />
                </a>

                <div className="ibc-about-banner__content-swapper">
                  <h2>{banner?.name}</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ibc-container-fluid">
          <div className="ibc-container">
            <div className="ibc-offices__container">
              <div className="ibc-offices__container__wrapper">
                <BreadcrumbsComponent />
                <div className="ibc-offices__container__content">
                  <div
                    dangerouslySetInnerHTML={{ __html: get(data, 'article.article.content', '') }}
                  />

                  {children}
                </div>
              </div>
            </div>
          </div>

          <section className="ibc-container-fluid__article">
            <div className="ibc-container ibc-container">
              <AboutArticle />
            </div>
          </section>
        </div>
      </main>
      <JoinOurTeam />
      <FooterLayout
        menu={menuFooterStore ?? footerMenu}
        config={footerConfig}
        configNew={configFooter}
      />
    </>
  );
}
