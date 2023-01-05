import {
  CACHE_CONSULTING_DETAIL_BANNER,
  CACHE_CONSULTING_DETAIL_META_SEO,
  CACHE_CONSULTING_META_SEO,
  CACHE_INSIGHT_LIST_COMMON,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import ConsultingServiceDetail from '@containers/ConsultingServiceDetail';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetInsightHome, IGetService } from '@interfaces/index';
import { setBreadcrumb, setListInsights } from '@redux/common/slice';

import consultingServices from '@services/consulting';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, redirectNotFound } from '@utils/helpers';

const Index = (props: any) => <ConsultingServiceDetail {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, ctx, region) => {
    const { container } = ctx.params;
    const reqDataGetBanner: IGetBanner = {
      controller: container,
      ...region,
    };

    const reqDataGetService: IGetService = {
      language: region.lang,
      countryCode: region.country,
    };

    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    const isValidRouter: any = await consultingServices.getServiceKeyword(
      reqDataGetService,
      container,
    );
    if (isValidRouter.isSuccessful === 'false') return redirectNotFound();

    const promises = [
      readCacheDynamic(`${CACHE_CONSULTING_DETAIL_BANNER}-${container}`, 'consulting-services') ??
        consultingServices.getBannerDetail(reqDataGetBanner, container),

      readCacheDynamic(`${CACHE_CONSULTING_DETAIL_META_SEO}-${container}`, 'consulting-services') ??
        consultingServices.getServiceKeyword(reqDataGetService, container),

      readCacheDynamic(CACHE_INSIGHT_LIST_COMMON, 'insights') ||
        insightServices.getListCommon(reqDataInsight),

      readCacheDynamic(CACHE_CONSULTING_META_SEO, 'consulting-services') ||
        consultingServices.getInfoPageMeta(reqDataGetService),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'detailPage', 'listInsight', 'detailPageType'];
    const convertData = coverObj(ar, data);

    // config breadcrumb
    const detailPageType = getDataBreadcrumb(convertData['detailPageType'], 'page');
    const detailPage = getDataBreadcrumb(convertData['detailPage'], 'service');

    store.dispatch(setBreadcrumb([detailPageType, detailPage]));

    store.dispatch(setListInsights(convertData['listInsight']));

    return {
      props: { ...convertData },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
