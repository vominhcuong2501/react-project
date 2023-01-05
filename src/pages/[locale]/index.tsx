import {
  CACHE_CONSULTING_LIST,
  CACHE_HOME_BANNER,
  CACHE_HOME_CONSULTING_NAME,
  CACHE_HOME_DIFFERENCE,
  CACHE_HOME_INFO,
  CACHE_HOME_METHODOLOGY,
  CACHE_HOME_METHODOLOGY_JS,
  CACHE_INSIGHT_LIST_COMMON,
  CACHE_INTELLIGENCE_NETWORK,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import HomePage from '@containers/Home';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetInsightHome } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import { setConfigOurDifferenceAndValues, setListInsights } from '@redux/common/slice';
import {
  setConfigMethodologyOfApproachHTML,
  setConfigMethodologyOfApproachJSON,
} from '@redux/config/slice';
import commonService from '@services/common';
import consultingServices from '@services/consulting';
import homeService from '@services/home';
import insightServices from '@services/insight';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <HomePage {...props} />;
// export const getStaticPaths = getStaticPathsConfig;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress || 0;
    const userAgent = context.req.headers['user-agent'];
    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    const reqDataGetBanner: IGetBanner = {
      controller: 'index',
      ...region,
    };

    const locale = {
      language: region.lang,
      countryCode: region.country,
    };

    const promises = [
      // Get Banner
      readCacheDynamic(CACHE_HOME_BANNER, 'home') || homeService.getBanner(reqDataGetBanner),

      // Get list insights
      readCacheDynamic(CACHE_INSIGHT_LIST_COMMON, 'insights') ||
        insightServices.getListCommon(reqDataInsight),

      // get data section home page
      readCacheDynamic(CACHE_INTELLIGENCE_NETWORK, 'home') || homeService.getIntelligence(region),

      readCacheDynamic(CACHE_HOME_DIFFERENCE, 'home') || homeService.getDifference(region),

      readCacheDynamic(CACHE_HOME_METHODOLOGY, 'home') ||
        homeService.getMethodologyOfApproach(region),

      readCacheDynamic(CACHE_HOME_METHODOLOGY_JS, 'home') ||
        homeService.getMethodologyOfApproachJS(region),

      // get meta data
      readCacheDynamic(CACHE_HOME_INFO, 'home') || homeService.getInfoHomePage(locale),

      readCacheDynamic(CACHE_HOME_CONSULTING_NAME, 'home') ||
        homeService.getConfigConsultingName(locale),

      // get list services
      readCacheDynamic(CACHE_CONSULTING_LIST, 'home') || consultingServices.getListServices(locale),

      commonService.getConfigUpdate(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'banner',
      'listInsight',
      'intelligenceNetwork',
      'configDifference',
      'appRoach',
      'appRoachJS',
      'infoPage',
      'txtConsultingName',
      'listConsultingServices',
      'configUpdate',
    ];

    const convertData = coverObj(ar, data);
    convertData.ip = ip;
    convertData.userAgent = userAgent;

    store.dispatch(setListConsultingService(convertData['listConsultingServices']));
    store.dispatch(setListInsights(convertData['listInsight']));
    store.dispatch(setConfigOurDifferenceAndValues(convertData['configDifference']));
    store.dispatch(setConfigMethodologyOfApproachHTML(convertData['appRoach']));
    store.dispatch(setConfigMethodologyOfApproachJSON(convertData['appRoachJS']));

    return {
      props: { ...convertData },
    };
  },
});

Index.Layout = MainLayout;
export default Index;
