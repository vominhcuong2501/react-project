import {
  CACHE_BANNER_INDUSTRIES_DETAIL,
  CACHE_CONSULTING_LIST,
  CACHE_INDUSTRIES_DETAIL_META_SEO,
  CACHE_INSIGHT_LIST_COMMON,
  CACHE_META_SEO_INDUSTRIES,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import IndustriesDetail from '@containers/IndustriesDetail';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetInsightHome, IGetService } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import { setBreadcrumb, setListInsights } from '@redux/common/slice';
import consultingServices from '@services/consulting';

import industriesServices from '@services/industries';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, getDataMeta, redirectNotFound } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <IndustriesDetail {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, ctx, region) => {
    const { id } = ctx.params;
    const reqDataGetBanner: IGetBanner = {
      controller: id,
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

    const isValidRouter: any = await industriesServices.getIndustriesKeyword(reqDataGetService, id);
    if (isValidRouter.isSuccessful === 'false') return redirectNotFound();

    const promises = [
      readCacheDynamic(`${CACHE_BANNER_INDUSTRIES_DETAIL}-${id}`, 'industries-detail') ||
        industriesServices.getBannerDetail(reqDataGetBanner),

      readCacheDynamic(`${CACHE_INDUSTRIES_DETAIL_META_SEO}-${id}`, 'industries-detail') ||
        industriesServices.getIndustriesKeyword(reqDataGetService, id),

      readCacheDynamic(CACHE_CONSULTING_LIST, 'home') ||
        consultingServices.getListServices(reqDataGetService),

      readCacheDynamic(CACHE_INSIGHT_LIST_COMMON, 'insights') ||
        insightServices.getListCommon(reqDataInsight),

      readCacheDynamic(CACHE_META_SEO_INDUSTRIES, 'industries') ||
        industriesServices.getInfoPageMetaDetail(reqDataGetService),
    ];

    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'detailPage', 'listServices', 'listInsight', 'detailPageType'];
    const convertData = coverObj(ar, data);
    store.dispatch(setListConsultingService(convertData['listServices']));
    store.dispatch(setListInsights(convertData['listInsight']));

    const metaData = getDataMeta(get(convertData['detailPage'], 'industry', {}));

    // config breadcrumb
    const detailPage = getDataBreadcrumb(convertData['detailPageType'], 'page');
    const detailType = getDataBreadcrumb(convertData['detailPage'], 'industry');

    store.dispatch(setBreadcrumb([detailPage, detailType]));

    return {
      props: { ...convertData, metaData },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
