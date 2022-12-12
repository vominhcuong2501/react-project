import {
  CACHE_CONSULTING_LIST,
  CACHE_HOME_BANNER,
  CACHE_HOME_DIFFERENCE,
  CACHE_HOME_INFO,
  CACHE_HOME_LIST_INSIGHT,
  CACHE_HOME_METHODOLOGY,
  CACHE_HOME_METHODOLOGY_JS,
  CACHE_INTELLIGENCE_NETWORK,
} from '@/constants';
import { getStaticPathsConfig } from '@/constants/config';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import HomePage from '@containers/Home';
import withIncrementalStaticRegeneration from '@hoc/withWrapperSSR';
import { IGetBanner, IGetInsightHome } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import consultingServices from '@services/consulting';
import homeService from '@services/home';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <HomePage {...props} />;
export const getStaticPaths = getStaticPathsConfig;
export const getStaticProps = withIncrementalStaticRegeneration({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
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
      readCache(CACHE_HOME_BANNER) || homeService.getBanner(reqDataGetBanner),
      readCache(CACHE_HOME_LIST_INSIGHT) || homeService.getListInsight(reqDataInsight),
      readCache(CACHE_INTELLIGENCE_NETWORK) || homeService.getIntelligence(region),
      readCache(CACHE_HOME_DIFFERENCE) || homeService.getDifference(region),
      readCache(CACHE_HOME_METHODOLOGY) || homeService.getMethodologyOfApproach(region),
      readCache(CACHE_HOME_METHODOLOGY_JS) || homeService.getMethodologyOfApproachJS(region),
      readCache(CACHE_HOME_INFO) || homeService.getInfoHomePage(locale),
      readCache(CACHE_CONSULTING_LIST) || consultingServices.getListServices(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'banner',
      'listInsight',
      'intelligenceNetwork',
      'difference',
      'appRoach',
      'appRoachJS',
      'infoPage',
      'listConsultingServices',
    ];

    const convertData = coverObj(ar, data);
    await store.dispatch(setListConsultingService(convertData['listConsultingServices']));

    return {
      props: { ...convertData },
      revalidate: 10,
    };
  },
});

Index.Layout = MainLayout;
export default Index;
