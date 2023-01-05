import {
  CACHE_FAQ_DETAIL_TXT_FILTER,
  CACHE_FAQ_DETAIL_TXT_NO_DATA,
  CACHE_FOLDER_INSIGHT,
  CACHE_INSIGHT_ARTICLE,
  CACHE_INSIGHT_BANNER,
  CACHE_INSIGHT_CONFIG_SIDE_BAR,
  CACHE_INSIGHT_LIST_FILTER,
  CACHE_INSIGHT_META,
  CACHE_INSIGHT_TYPE,
} from '@/constants';
import { CURRENT_PAGE, LIMIT_PAGINATE } from '@/constants/config';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import InsightLayout from '@components/compound/layout/Insight';
import InsightsDetailArticle from '@containers/InsightsDetailArticle';
import InsightDetailType from '@containers/InsightsDetailType';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import { setConfigSubscribeConfig } from '@redux/insights/slice';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, getDataMeta, redirectNotFound } from '@utils/helpers';
import { get } from 'lodash';

interface IRegion {
  language?: string;
  locationCode?: string;
  lang?: string;
  country?: string;
}

const Index = ({ options, ...props }: any) => {
  const { isArticles } = options;
  if (!isArticles) return <InsightDetailType {...props} />;
  return <InsightsDetailArticle {...props} />;
};

/**
 *
 * @param id
 * @param insightTypeRoutes
 * @param articlesRoutes
 * @returns
 */
const validation = (
  id: string,
  insightTypeRoutes: Array<string>,
  articlesRoutes: Array<string>,
) => {
  let isType = false;
  let isArticle = false;
  if (insightTypeRoutes && insightTypeRoutes.indexOf(id) > -1) isType = true;
  if (articlesRoutes && articlesRoutes.indexOf(id) > -1) isArticle = true;

  return [isType, isArticle];
};

/**
 *
 * @param region
 * @param id
 * @returns call api return props for insight page
 */
const initTypeInsightPage = async (region: IRegion, id: string, store) => {
  const cache = {
    type: `${CACHE_INSIGHT_TYPE}-${id}`,
    banner: `${CACHE_INSIGHT_BANNER}-${id}`,
    filter: CACHE_INSIGHT_LIST_FILTER,
    txt_noData: CACHE_FAQ_DETAIL_TXT_NO_DATA,
    txt_filter: CACHE_FAQ_DETAIL_TXT_FILTER,
    meta: CACHE_INSIGHT_META,
  };
  const reqDataGetArticle: any = {
    limit: LIMIT_PAGINATE,
    page: CURRENT_PAGE,
    type: id,
  };
  const locale = {
    language: region.lang,
    countryCode: region.country,
  };
  const promises = [
    readCacheDynamic(cache.type, CACHE_FOLDER_INSIGHT) ||
      insightServices.getDetailPage(reqDataGetArticle, id),

    readCacheDynamic(cache.banner, CACHE_FOLDER_INSIGHT) || insightServices.getConfigBanner(locale),

    readCacheDynamic(cache.filter, CACHE_FOLDER_INSIGHT) ||
      insightServices.getLisFilterOptions(locale),

    readCacheDynamic(cache.txt_noData, CACHE_FOLDER_INSIGHT) ||
      insightServices.getConfigNodata(locale),

    readCacheDynamic(cache.txt_filter, CACHE_FOLDER_INSIGHT) ||
      insightServices.getConfigFilter(locale),

    insightServices.getConfigSubScribeUpdate(locale),

    readCacheDynamic(cache.meta, CACHE_FOLDER_INSIGHT) || insightServices.getInfoMetaPage(locale),
  ];
  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );

  const ar = [
    'detailPage',
    'configBanner',
    'listOptions',
    'noData',
    'configFilter',
    'subscribeConfig',
    'detailPageInsight',
  ];
  const convertData = coverObj(ar, data);
  const metaData = getDataMeta(get(convertData['detailPage'], 'type', {}));

  store.dispatch(
    setBreadcrumb([
      getDataBreadcrumb(convertData['detailPageInsight'], 'page'),
      getDataBreadcrumb(convertData['detailPage'], 'type'),
    ]),
  );

  store.dispatch(setConfigSubscribeConfig(convertData['subscribeConfig']));

  return {
    props: { ...convertData, metaData, options: { isArticles: false, isHome: false } },
  };
};

/**
 *
 * @param region
 * @param id
 * @returns call api return props for article pages
 */
const initInsightArticlePage = async (region: IRegion, context: any, store) => {
  const { id } = context.query;
  const cache = {
    article: `${CACHE_INSIGHT_ARTICLE}-${id}`,
    txtSidebar: CACHE_INSIGHT_CONFIG_SIDE_BAR,
    meta: CACHE_INSIGHT_META,
  };
  const locale = {
    language: region.lang,
    countryCode: region.country,
  };
  const promises = [
    readCacheDynamic(cache.article, CACHE_FOLDER_INSIGHT) ||
      insightServices.getDetailPageType(locale, id),
    readCacheDynamic(cache.txtSidebar, CACHE_FOLDER_INSIGHT) ||
      insightServices.getConfigSidebar(locale),

    readCacheDynamic(cache.meta, CACHE_FOLDER_INSIGHT) || insightServices.getInfoMetaPage(locale),
  ];
  const response = await Promise.allSettled(promises);
  const data = await response.map((item) =>
    item.status === 'fulfilled' ? item.value ?? [] : null,
  );
  const ar = ['articlesInsights', 'configSidebar', 'detailPage'];
  const convertData = coverObj(ar, data);

  const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
  const detailType = getDataBreadcrumb(convertData['articlesInsights'], 'article.type_insight');

  store.dispatch(
    setBreadcrumb([
      detailPage,
      { ...detailType, keyword: `${detailPage.keyword}/${detailType.keyword}` },
      getDataBreadcrumb(convertData['articlesInsights'], 'article'),
    ]),
  );

  const metaData = getDataMeta(get(convertData['articlesInsights'], 'article', {}));

  return {
    props: { ...convertData, metaData, options: { isArticles: true, isHomeInsight: true } },
  };
};

/**
 *
 * @param region
 * @param id
 * @returns call api return validate routes articles and type insights
 */
const callApiGetDataRoutes = async (region: IRegion, id: string) => {
  const reqDataGetArticle: any = {
    limit: LIMIT_PAGINATE,
    page: CURRENT_PAGE,
    type: id,
  };
  const localeDetail = {
    language: region.lang,
    countryCode: region.country,
  };
  const promisesRoutes = [
    insightServices.getDetailPage(reqDataGetArticle, id),
    insightServices.getDetailPageType(localeDetail, id),
  ];
  const [resListInsightTypes, articlePageDetail] = await Promise.allSettled(promisesRoutes);
  const isValidInsightType = get(resListInsightTypes, 'value.isSuccessful') === 'true';
  const isValidInsightArticle = get(articlePageDetail, 'value.isSuccessful') === 'true';
  return [isValidInsightType, isValidInsightArticle];
};

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const getCacheTypes = await readCacheDynamic('type-routes', 'insights');
    const getCacheArticles = await readCacheDynamic('article-routes', 'insights');
    const { id } = context.query;

    const [isType, isArticle] = validation(id, getCacheTypes, getCacheArticles);
    if (isType) return initTypeInsightPage(region, id, store);
    if (isArticle) return initInsightArticlePage(region, context, store);

    // setup data call api validate route
    const [isValidInsightType, isValidInsightArticle] = await callApiGetDataRoutes(region, id);
    if (!isValidInsightType && !isValidInsightArticle) return redirectNotFound();

    // write cache
    if (isValidInsightType) {
      await writeCacheDynamic(
        'type-routes',
        getCacheTypes ? [...getCacheTypes, id] : [id],
        'insights',
      );
      return initTypeInsightPage(region, id, store);
    }
    await writeCacheDynamic(
      'article-routes',
      getCacheArticles ? [...getCacheArticles, id] : [id],
      'insights',
    );

    return initInsightArticlePage(region, context, store);
  },
});

Index.Layout = InsightLayout;
export default Index;
