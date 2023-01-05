import {
  CACHE_FOLDER_INSIGHT,
  CACHE_INSIGHT_BANNER,
  CACHE_INSIGHT_DATA_HUB,
  CACHE_INSIGHT_FAQ,
  CACHE_INSIGHT_LATEST,
  CACHE_INSIGHT_LIST_TYPES,
  CACHE_INSIGHT_META,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import InsightLayout from '@components/compound/layout/Insight';
import Insights from '@containers/Insights';
import withCommon from '@hoc/withCommon';
import { IGetInsightHome } from '@interfaces/home';
import { setBreadcrumb, setListInsights } from '@redux/common/slice';
import {
  setConfigSubscribeConfig,
  setListInSightsTypes,
  setListsDataHub,
  setListsFaq,
} from '@redux/insights/slice';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <Insights {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const id = context.resolvedUrl.split('/').pop();

    const cache = {
      type: `${CACHE_INSIGHT_LIST_TYPES}-${id}`,
      faq: CACHE_INSIGHT_FAQ,
      banner: CACHE_INSIGHT_BANNER,
      dataHub: CACHE_INSIGHT_DATA_HUB,
      latest: CACHE_INSIGHT_LATEST,
      meta: CACHE_INSIGHT_META,
    };
    const ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress || 0;
    const userAgent = context.req.headers['user-agent'];

    const paramListType: any = {
      limit: 6,
    };

    const locale = {
      language: region.lang,
      countryCode: region.country,
    };

    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    const promises = [
      // get list type insight
      readCacheDynamic(cache.type, CACHE_FOLDER_INSIGHT) ||
        insightServices.getListTypes(paramListType, id),

      // get list faq insight home page
      readCacheDynamic(cache.faq, CACHE_FOLDER_INSIGHT) ||
        insightServices.getListFaq(paramListType),

      // get banner insight
      readCacheDynamic(cache.banner, CACHE_FOLDER_INSIGHT) ||
        insightServices.getConfigBanner(locale),

      // get list data-hub insight home page
      readCacheDynamic(cache.dataHub, CACHE_FOLDER_INSIGHT) ||
        insightServices.getListDataHub(locale),

      // get list insight latest common for pages
      readCacheDynamic(cache.latest, CACHE_FOLDER_INSIGHT) ||
        insightServices.getListCommon(reqDataInsight),

      // get meta data
      readCacheDynamic(cache.meta, CACHE_FOLDER_INSIGHT) || insightServices.getInfoMetaPage(locale),

      insightServices.getConfigSubScribeUpdate(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'inSightsTypes',
      'faq',
      'configBanner',
      'listDataHub',
      'listLastest',
      'detailMetaSeo',
      'subscribeConfig',
    ];

    const convertData = coverObj(ar, data);
    const metaData = getDataMeta(get(convertData['detailMetaSeo'], 'page', {}));

    convertData.ip = ip;
    convertData.userAgent = userAgent;

    store.dispatch(setListInsights(convertData['listLastest']));
    store.dispatch(setListsFaq(convertData['faq']));
    store.dispatch(setListsDataHub(convertData['listDataHub']));
    store.dispatch(setListInSightsTypes(convertData['inSightsTypes']));
    store.dispatch(setConfigSubscribeConfig(convertData['subscribeConfig']));
    store.dispatch(setConfigSubscribeConfig(convertData['subscribeConfig']));
    store.dispatch(setBreadcrumb([getDataBreadcrumb(convertData['detailMetaSeo'], 'page')]));

    return {
      props: { ...convertData, metaData, options: { isHomeInsight: true } },
    };
  },
});
Index.Layout = InsightLayout;
export default Index;
