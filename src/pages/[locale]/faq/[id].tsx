import {
  CACHE_COMMON_LIST_SERVICES,
  CACHE_FAQ_ARTICLE,
  CACHE_FAQ_META,
  CACHE_FAQ_TYPE,
  CACHE_FOLDER_FAQ,
} from '@/constants';
import { readCache } from '@/lib/readCache';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { validationRoutes } from '@/validations';
import FAQLayout from '@components/compound/layout/Faq';
import FAQArticleDetail from '@containers/FAQArticleDetail';
import FAQTypeDetail from '@containers/FAQTypeDetail';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb, setListServices } from '@redux/common/slice';
import { setDetailTypeFaq } from '@redux/faq/slice';
import commonService from '@services/common';
import faqServices from '@services/faq';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = ({ options, ...props }: any) => {
  const isArticle = get(options, 'isArticle');
  if (!isArticle) return <FAQTypeDetail {...props} />;
  return <FAQArticleDetail {...props} />;
};

const initFaqType = async (store, context, region) => {
  const { id } = context.params;
  const locale = {
    language: region.lang,
    countryCode: region.country,
  };

  const searchQuery = {
    language: region.lang,
    countryCode: region.country,
    type: id,
  };

  const promises = [
    readCacheDynamic(`${CACHE_FAQ_TYPE}-${id}`, CACHE_FOLDER_FAQ) ||
      faqServices.getDetailTypeFaq(searchQuery, id),

    readCache(CACHE_COMMON_LIST_SERVICES) || commonService.getServiceData(locale),

    readCacheDynamic(CACHE_FAQ_META, CACHE_FOLDER_FAQ) || faqServices.getInfoMeta(locale),

    faqServices.getConfigTalkToUS(locale),
  ];

  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );
  const ar = ['detailPageType', 'listServices', 'detailPage', 'configTalkToUs'];
  const convertData = coverObj(ar, data);

  // config breadcrumb
  store.dispatch(
    setBreadcrumb([
      getDataBreadcrumb(convertData['detailPage'], 'page'),
      getDataBreadcrumb(convertData['detailPageType'], 'type'),
    ]),
  );
  const metaData = getDataMeta(get(convertData['detailPageType'], 'type', {}));

  await store.dispatch(setDetailTypeFaq(convertData['detailPageType']));
  await store.dispatch(setListServices(convertData['listServices']));

  return {
    props: { ...convertData, metaData, options: { isArticle: false, isHome: false } },
  };
};

const initFaqArticle = async (store, context, region) => {
  const { id } = context.params;
  const locale = {
    language: region.lang,
    locationCode: region.country,
  };
  const promises = [
    readCacheDynamic(`${CACHE_FAQ_ARTICLE}-${id}`, CACHE_FOLDER_FAQ) ||
      faqServices.getDetailFaq(locale, id),
    readCache(CACHE_COMMON_LIST_SERVICES) || commonService.getServiceData(locale),

    readCacheDynamic(CACHE_FAQ_META, CACHE_FOLDER_FAQ) || faqServices.getInfoMeta(locale),
    faqServices.getConfigBanner(locale),
  ];

  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );

  const ar = ['faqDetailPage', 'listServices', 'detailPage'];

  const convertData = coverObj(ar, data);

  // config breadcrumb
  const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
  const detailType = getDataBreadcrumb(convertData['faqDetailPage'], 'article.faq');

  store.dispatch(
    setBreadcrumb([
      detailPage,
      { ...detailType, keyword: `${detailPage.keyword}/${detailType.keyword}` },
      getDataBreadcrumb(convertData['faqDetailPage'], 'article'),
    ]),
  );

  const metaData = getDataMeta(get(convertData['faqDetailPage'], 'article', {}));
  store.dispatch(setListServices(convertData['listServices']));

  return {
    props: {
      ...convertData,
      metaData,
      options: { isArticle: true, isHome: false, isDetail: true },
    },
  };
};

/**
 *
 * @param region
 * @param id
 * @returns call api return validate routes articles and type insights
 */
const callApiGetDataRoutes = async (region: any, id: string) => {
  const location = {
    language: region.lang,
    countryCode: region.country,
  };
  const searchQuery = {
    ...location,
    type: id,
  };
  const promisesRoutes = [
    faqServices.getDetailTypeFaq(searchQuery, id),
    faqServices.getDetailFaq(location, id),
  ];

  const [resListFaqTypes, articlePageDetail] = await Promise.allSettled(promisesRoutes);
  const isValidFaqType = get(resListFaqTypes, 'value.isSuccessful') === 'true';
  const isValidFaqArticle = get(articlePageDetail, 'value.isSuccessful') === 'true';
  return [isValidFaqType, isValidFaqArticle];
};

/**
 *
 * @returns return 404 page
 */
const redirectNotFound = () => ({
  redirect: {
    destination: '/notfound',
  },
});

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const getCacheTypes = await readCacheDynamic('type-routes', CACHE_FOLDER_FAQ);
    const getCacheArticles = await readCacheDynamic('article-routes', CACHE_FOLDER_FAQ);
    const { id } = context.params;

    // check routes in cache
    const [isType, isArticle] = validationRoutes(id, getCacheTypes, getCacheArticles);
    if (isType) return initFaqType(store, context, region);
    if (isArticle) return initFaqArticle(store, context, region);

    // check routes in api
    const [isValidFaqType, isValidFaqArticle] = await callApiGetDataRoutes(region, id);
    if (!isValidFaqType && !isValidFaqArticle) return redirectNotFound();

    // write cache
    if (isValidFaqType) {
      await writeCacheDynamic(
        'type-routes',
        getCacheTypes ? [...getCacheTypes, id] : [id],
        CACHE_FOLDER_FAQ,
      );
      return initFaqType(store, context, region);
    }
    await writeCacheDynamic(
      'article-routes',
      getCacheArticles ? [...getCacheArticles, id] : [id],
      CACHE_FOLDER_FAQ,
    );

    return initFaqArticle(store, context, region);
  },
});

Index.Layout = FAQLayout;
export default Index;
