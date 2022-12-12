import HeadSEO from '@components/primitive/HeadSEO';
import { LayoutProps } from '@interfaces/index';
import { selectFooterMenu, selectHeaderMenu } from '@redux/app/selecters';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setServicesOptions, setTopicOption } from '@redux/insights/slice';
import appStyle from '@scss/pages/insights/index.scss';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FooterLayout from '../../GroupFooter';
import HeaderLayout from '../../GroupHeader';
import Filter from './Filter';

import InsightsSubscribe from './Subscribe';
import TrendingSlide from './TrendingSLide';

export default function InsightLayout({ children, data }: LayoutProps) {
  const dispatch = useAppDispatch();
  const {
    menuList,
    footerMenu,
    insightConfig,
    listOptions,
    isHome,
    detailMetaSeo,
    configFilter,
    detailPage,
  } = data;
  const tags = get(listOptions, 'tags', null);
  const services = get(listOptions, 'services', null);
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);
  const getDetailMetaSeo = get(detailMetaSeo, 'page', null);
  const [selectOptionsTags, setSelectOptionsTags] = useState({});
  const [selectOptionsService, setSelectOptionsService] = useState({});
  const configOption = configFilter ? JSON.parse(get(configFilter, 'config.content', {})) : {};

  const customTags = tags && [
    { label: configOption['topic'] || 'Topic', value: '' },
    ...tags.map((item: any) => ({
      ...item,
      label: item.tag_name,
      value: item.tag_id,
    })),
  ];

  const customServices = services && [
    { label: configOption['services'] || 'Services', value: '' },
    ...services.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
      options: item.articles.map((it) => ({
        ...it,
        label: it.name,
        value: it.id,
      })),
    })),
  ];

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

  const handleOptionChange = (value) => {
    // selectedOption
    if (value.name === 'tags') {
      setSelectOptionsTags(value.selectOption);
      dispatch(setTopicOption(value.selectOption));
      return;
    }
    setSelectOptionsService(value.selectOption);
    dispatch(setServicesOptions(value.selectOption));
  };

  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO {...(getDetailMetaSeo || detailPage.type)} />
      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      <section className="ibc-insight__background">
        <p>{get(insightConfig, 'config.content', null)}</p>
      </section>
      <TrendingSlide menu={menuHeaderStore ?? menuList} />
      {!isHome && (
        <Filter
          optionsTags={customTags}
          optionsServices={customServices}
          onChange={handleOptionChange}
          selectOptionTopic={selectOptionsTags}
          selectOptionService={selectOptionsService}
        />
      )}
      {children}
      <InsightsSubscribe />
      <FooterLayout menu={menuFooterStore ?? footerMenu} />
    </>
  );
}
