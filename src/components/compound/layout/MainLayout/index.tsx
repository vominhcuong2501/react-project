import { LayoutProps } from '@interfaces/index';
import { selectFooterMenu, selectHeaderMenu } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FooterLayout from '../../GroupFooter';
import HeaderLayout from '../../GroupHeader';

export default function MainLayout({ children, data }: LayoutProps) {
  const { menuList, footerMenu } = data;
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);

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

  return (
    <>
      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      {children}
      <FooterLayout menu={menuFooterStore ?? footerMenu} />
    </>
  );
}
