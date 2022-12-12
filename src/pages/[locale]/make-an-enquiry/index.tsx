import { CACHE_MAIN_MAKE_AN_ENQUIRE, CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER } from '@/constants';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import MakeAnEnquiry from '@containers/MakeAnEnquiry';
import withWrapper from '@hoc/withWrapperSSG';
import { IGetBanner } from '@interfaces/home';
import commonService from '@services/common';
import oneIbcServices from '@services/makeAnEnquire';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <MakeAnEnquiry {...props} />;
export const getServerSideProps = withWrapper({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetBanner: IGetBanner = {
      controller: 'make-an-enquire',
      ...region,
    };

    const promises = [
      readCache(CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER) ??
        commonService.getBanner(reqDataGetBanner, CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER),
      readCache(CACHE_MAIN_MAKE_AN_ENQUIRE) || oneIbcServices.getMake(region),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'configFuture'];
    return {
      props: {
        ...coverObj(ar, data),
      },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
