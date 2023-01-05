import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import DropDown from '@components/primitive/DropDown';
import HeadSEO from '@components/primitive/HeadSEO';
import useClickID from '@hooks/useClickId';
import { useDisplay } from '@hooks/useDisplay';
import { useUrls } from '@hooks/useUrls';
import { LayoutProps } from '@interfaces/index';
import {
  getFooterConfig,
  selectFooterConfig,
  selectFooterMenu,
  selectHeaderMenu,
} from '@redux/app/selecters';
import { selectListServices } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import faqLayout from '@scss/layout/faq.scss?type=scoped';
import { get, map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FooterLayout from '../../GroupFooter';
import HeaderLayout from '../../GroupHeader';

export default function FAQLayout({ children, data }: LayoutProps) {
  const { menuList, footerMenu, faqDetailPage, options, metaData, configTalkToUs } = data;
  const { isHome, isDetail } = options || {};
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);
  const listServices = get(useAppSelector(selectListServices), 'services', []);
  const detailListRelate = get(faqDetailPage, 'relate', []);
  const footerConfig = get(useAppSelector(selectFooterConfig), 'config.content', null);
  const configFooter = get(useAppSelector(getFooterConfig), 'config.content', null);
  const router = useRouter();
  const isMobile = useDisplay();
  const url = useUrls('id');

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

  useClickID('ibc-btn-make-an-enquiry', '/make-an-enquiry');

  return (
    <>
      <style jsx>{faqLayout}</style>
      <HeadSEO {...metaData} />

      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      <main>
        <section>
          <div className="ibc-container ibc-container__faq-banner">
            <div className="ibc-container-content ibc-container-content__banner">
              <p>FAQ</p>
            </div>
          </div>
        </section>
        <section>
          <div className="ibc-container">
            <div className="ibc-container-content ibc-container-content__breadcrumb">
              <BreadcrumbsComponent />
            </div>
          </div>
        </section>
        <section>
          <div className="ibc-container">
            <div className="ibc-container-content ibc-container-content__faq-layout">
              <div className="ibc-content__faq-content">{children}</div>
              {!isHome && (
                <div className="ibc-content__faq-sidebar">
                  {!isMobile ? (
                    <>
                      <h2>Services</h2>
                      <ul>
                        {map(listServices, (item) => (
                          <li key={item.id}>
                            <Link href={`/consulting-services/${item.keyword}`}>
                              <a title={item.name} target="_self">
                                {item.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <DropDown data={listServices} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {isDetail && (
          <section>
            <div className="ibc-container ibc-container__list-faq-detail">
              <div className="ibc-container-content ibc-container-content__list-faq-detail">
                <ul>
                  {map(detailListRelate, (item, index) => (
                    <li key={`${index}`.toString()}>
                      <Link href={`${url}/${item.keyword}`}>
                        <a>{item.name}</a>
                      </Link>

                      <i className="fa-light fa-arrow-right-long"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section>
          {/* <div dangerouslySetInnerHTML={{ __html: getConfig(configTalkToUs) || '' }}></div> */}
          <div className="ibc-container  ibc-container__faq-footer">
            <div className="ibc-container-content ibc-container-content__footer">
              <p>Cannot find your answer? Talk to us now</p>
              <div className="ibc-btn-wrapper">
                <a
                  className="jsx-1480180584 ibc-custom-btn ibc-custom-btn--primary"
                  id="ibc-btn-make-an-enquiry"
                >
                  <span className="jsx-1480180584">Make An Enquiry</span>
                  <svg
                    width="34"
                    height="11"
                    viewBox="0 0 34 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5H6.26715M6.34029 5.5H33M28 0.5L33 5.49529L30.5 8.00236L28 10.5"
                      stroke="url(#paint0_linear_6841_1970)"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6841_1970"
                        x1="33"
                        y1="0.5"
                        x2="27.3061"
                        y2="18.7206"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF6A00"></stop>
                        <stop offset="1" stopColor="#EE0979"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterLayout
        menu={menuFooterStore ?? footerMenu}
        config={footerConfig}
        configNew={configFooter}
      />
    </>
  );
}
