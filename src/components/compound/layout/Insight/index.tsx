import HeadSEO from '@components/primitive/HeadSEO';
import { LayoutProps } from '@interfaces/index';
import {
  getFooterConfig,
  selectFooterConfig,
  selectFooterMenu,
  selectHeaderMenu,
} from '@redux/app/selecters';
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
    configBanner,
    listOptions,
    configFilter,

    options,
    metaData,
  } = data;
  const tags = get(listOptions, 'tags', null);
  const services = get(listOptions, 'services', null);
  const menuHeaderStore = useAppSelector(selectHeaderMenu);
  const menuFooterStore = useAppSelector(selectFooterMenu);

  const footerConfig = get(useAppSelector(selectFooterConfig), 'config.content', null);
  const configFooter = get(useAppSelector(getFooterConfig), 'config.content', null);

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
    if (value.name === 'tags') {
      setSelectOptionsTags(value.selectOption);
      dispatch(setTopicOption(value.selectOption));
      return;
    }
    dispatch(setServicesOptions(value.selectOption));
  };

  const isArticles = get(options, 'isArticles', false);
  if (isArticles) {
    return (
      <>
        <style jsx>{appStyle}</style>
        <HeadSEO {...metaData} />
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

  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO {...metaData} />
      <HeaderLayout menu={menuHeaderStore ?? menuList} />
      <section className="ibc-insight__background">
        <p>{get(configBanner, 'config.content', null)}</p>
      </section>
      <TrendingSlide menu={menuHeaderStore ?? menuList} />

      {!options?.isHomeInsight && (
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
      <FooterLayout
        menu={menuFooterStore ?? footerMenu}
        config={footerConfig}
        configNew={configFooter}
      />
    </>
  );
}
