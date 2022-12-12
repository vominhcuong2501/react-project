import { CACHE_CONSULTING_DETAIL_BANNER, CACHE_CONSULTING_DETAIL_META_SEO } from '@/constants';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import ConsultingServiceDetail from '@containers/ConsultingServiceDetail';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetService } from '@interfaces/index';

import consultingServices from '@services/consulting';
import { coverObj } from '@utils/helpers';

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

    const promises = [
      readCache(`${CACHE_CONSULTING_DETAIL_BANNER}-${container}`) ??
        consultingServices.getBannerDetail(reqDataGetBanner, container),

      readCache(`${CACHE_CONSULTING_DETAIL_META_SEO}-${container}`) ??
        consultingServices.getServiceKeyword(reqDataGetService, container),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'detailPage'];

    return {
      props: {
        ...coverObj(ar, data),
      },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
