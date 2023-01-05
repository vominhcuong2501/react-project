import {
  CACHE_DATA_HUB_ARTICLE,
  CACHE_DATA_HUB_DETAIL_META,
  CACHE_DATA_HUB_TYPE,
  CACHE_FOLDER_DATA_HUB,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { validationRoutes } from '@/validations';
import DataHubLayout from '@components/compound/layout/DataHub';
import DataHubDetailArticle from '@containers/DataHubDetailArticle';
import DataHubDetailType from '@containers/DataHubDetailType';

import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import { setConfigSubscribeConfig } from '@redux/insights/slice';
import dataHubServices from '@services/data-hub';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = ({ options, ...props }: any) => {
  const isArticle = get(options, 'isArticle');
  if (!isArticle) return <DataHubDetailType {...props} />;
  return <DataHubDetailArticle {...props} />;
};

const initDataHubType = async (store, context, region) => {
  const { id } = context.params;
  const location = {
    language: region.lang,
    countryCode: region.country,
  };
  const setUpDataType = {
    ...location,
    type: id,
  };
  const promises = [
    readCacheDynamic(`${CACHE_DATA_HUB_TYPE}-${id}`, CACHE_FOLDER_DATA_HUB) ||
      dataHubServices.getTypeDataHub(setUpDataType, id),
    insightServices.getConfigSubScribeUpdate(location),

    // get meta data
    readCacheDynamic(CACHE_DATA_HUB_DETAIL_META, CACHE_FOLDER_DATA_HUB) ||
      dataHubServices.getInfoDataHubMeta(location),
  ];
  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );
  const ar = ['detailType', 'subscribeConfig', 'detailPage'];
  const convertData = coverObj(ar, data);
  store.dispatch(setConfigSubscribeConfig(convertData['subscribeConfig']));

  // config breadcrumb
  store.dispatch(
    setBreadcrumb([
      getDataBreadcrumb(convertData['detailPage'], 'page'),
      getDataBreadcrumb(convertData['detailType'], 'type'),
    ]),
  );

  const metaData = getDataMeta(get(convertData['detailType'], 'type', {}));
  return {
    props: {
      ...convertData,
      metaData,
      options: { isArticle: false, isHome: false, isHomeInsight: true },
    },
  };
};

const initDataHubArticle = async (store, context, region) => {
  const locale = {
    language: region.lang,
    countryCode: region.country,
  };
  const { id } = context.params;
  const promises = [
    readCacheDynamic(`${CACHE_DATA_HUB_ARTICLE}-${id}`, CACHE_FOLDER_DATA_HUB) ||
      dataHubServices.getArticleDataHub(locale, id),

    // get meta data
    readCacheDynamic(CACHE_DATA_HUB_DETAIL_META, CACHE_FOLDER_DATA_HUB) ||
      dataHubServices.getInfoDataHubMeta(locale),
  ];
  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );
  const ar = ['detailDataHubArticle', 'detailPage'];
  const convertData: any = coverObj(ar, data);

  // config breadcrumb
  const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
  const detailType = getDataBreadcrumb(convertData['detailDataHubArticle'], 'article.type');

  store.dispatch(
    setBreadcrumb([
      detailPage,
      { ...detailType, keyword: `${detailPage.keyword}/${detailType.keyword}` },
      getDataBreadcrumb(convertData['detailDataHubArticle'], 'article'),
    ]),
  );

  const metaData = getDataMeta(get(convertData['detailDataHubArticle'], 'article', {}));
  return {
    props: {
      ...convertData,
      metaData,
      options: { isArticle: true, isHome: false, isHomeInsight: true },
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
  const setUpDataType = {
    ...location,
    type: id,
  };
  const promisesRoutes = [
    dataHubServices.getTypeDataHub(setUpDataType, id),
    dataHubServices.getArticleDataHub(location, id),
  ];
  const [resListTypes, articleDetail] = await Promise.allSettled(promisesRoutes);
  const isValidType = get(resListTypes, 'value.isSuccessful') === 'true';
  const isValidArticle = get(articleDetail, 'value.isSuccessful') === 'true';
  return [isValidType, isValidArticle];
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
    const getCacheTypes = await readCacheDynamic('type-routes', CACHE_FOLDER_DATA_HUB);
    const getCacheArticles = await readCacheDynamic('article-routes', CACHE_FOLDER_DATA_HUB);
    const { id } = context.params;

    // check routes in cache
    const [isType, isArticle] = validationRoutes(id, getCacheTypes, getCacheArticles);
    if (isType) return initDataHubType(store, context, region);
    if (isArticle) return initDataHubArticle(store, context, region);

    // check routes in api
    const [isValidType, isValidArticle] = await callApiGetDataRoutes(region, id);
    if (!isValidType && !isValidArticle) return redirectNotFound();

    // write cache
    if (isValidType) {
      await writeCacheDynamic(
        'type-routes',
        getCacheTypes ? [...getCacheTypes, id] : [id],
        CACHE_FOLDER_DATA_HUB,
      );
      return initDataHubType(store, context, region);
    }
    await writeCacheDynamic(
      'article-routes',
      getCacheArticles ? [...getCacheArticles, id] : [id],
      CACHE_FOLDER_DATA_HUB,
    );

    return initDataHubArticle(store, context, region);
  },
});

Index.Layout = DataHubLayout;
export default Index;
