import {
  CACHE_CONSULTING_BANNER,
  CACHE_CONSULTING_LIST,
  CACHE_CONSULTING_META_SEO,
  CACHE_INSIGHT_LIST_COMMON,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import ConsultingService from '@containers/ConsultingServices';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetInsightHome } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import { setBreadcrumb, setListInsights } from '@redux/common/slice';
import consultingServices from '@services/consulting';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb } from '@utils/helpers';

const Index = (props: any) => <ConsultingService {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetBanner: IGetBanner = {
      controller: 'consulting-services',
      ...region,
    };
    const metaInfoPage = {
      language: region.lang,
      countryCode: region.country,
    };

    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    const promises = [
      readCacheDynamic(CACHE_CONSULTING_BANNER, 'consulting-services') ||
        consultingServices.getBanner(reqDataGetBanner),

      readCacheDynamic(CACHE_CONSULTING_META_SEO, 'consulting-services') ||
        consultingServices.getInfoPageMeta(metaInfoPage),

      readCacheDynamic(CACHE_CONSULTING_LIST, 'home') ??
        consultingServices.getListServices({ metaInfoPage }),

      readCacheDynamic(CACHE_INSIGHT_LIST_COMMON, 'insights') ||
        insightServices.getListCommon(reqDataInsight),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['banner', 'metaInfo', 'listConsultingServices', 'listInsight'];

    const convertData = coverObj(ar, data);
    store.dispatch(setListConsultingService(convertData['listConsultingServices']));
    store.dispatch(setListInsights(convertData['listInsight']));

    // config breadcrumb
    const detailPage = getDataBreadcrumb(convertData['metaInfo'], 'page');

    store.dispatch(setBreadcrumb([detailPage]));

    return {
      props: { ...convertData },
    };
  },
});

Index.Layout = MainLayout;
export default Index;
