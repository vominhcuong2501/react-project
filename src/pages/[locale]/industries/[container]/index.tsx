import {
  CACHE_BANNER_INDUSTRIES_DETAIL,
  CACHE_CONSULTING_LIST,
  CACHE_INDUSTRIES_DETAIL_META_SEO,
} from '@/constants';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import IndustriesDetail from '@containers/IndustriesDetail';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetService } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import consultingServices from '@services/consulting';

import industriesServices from '@services/industries';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <IndustriesDetail {...props} />;

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

    const promises = [
      readCache(`${CACHE_BANNER_INDUSTRIES_DETAIL}-${container}`) ||
        industriesServices.getBannerDetail(reqDataGetBanner),

      readCache(`${CACHE_INDUSTRIES_DETAIL_META_SEO}-${container}`) ||
        industriesServices.getIndustriesKeyword(reqDataGetService, container),

      readCache(CACHE_CONSULTING_LIST) || consultingServices.getListServices(reqDataGetService),
    ];

    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'detailPage', 'listServices'];
    const convertData = coverObj(ar, data);
    store.dispatch(setListConsultingService(convertData['listServices']));

    return {
      props: { ...convertData },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
