import HeadSEO from '@components/primitive/HeadSEO';
import { LayoutProps } from '@interfaces/index';
import {
  getFooterConfig,
  selectFooterConfig,
  selectFooterMenu,
  selectHeaderMenu,
} from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FooterLayout from '../../GroupFooter';
import HeaderLayout from '../../GroupHeader';
import DataHubTypeLayout from './TypeLayout';

export default function DataHubLayout({ children, data }: LayoutProps) {
  const { menuList, footerMenu, options, metaData } = data;
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);
  const footerConfig = get(useAppSelector(selectFooterConfig), 'config.content', null);
  const configFooter = get(useAppSelector(getFooterConfig), 'config.content', null);
  const { isArticle } = options || {};

  const router = useRouter();

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

  if (!isArticle) return <DataHubTypeLayout data={data}>{children}</DataHubTypeLayout>;

  return (
    <>
      <HeadSEO {...metaData}></HeadSEO>
      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      {children}
      <FooterLayout
        menu={menuFooterStore ?? footerMenu}
        config={footerConfig}
        configNew={configFooter}
      />
    </>
  );
}
