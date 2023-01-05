import {
  CACHE_MAIN_MAKE_AN_ENQUIRE,
  CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER,
  CACHE_META_SEO_MAKE_AN_ENQUIRE,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import MakeAnEnquiry from '@containers/MakeAnEnquiry';
import withWrapper from '@hoc/withWrapperSSG';
import { IGetBanner } from '@interfaces/home';
import commonService from '@services/common';
import oneIbcMake from '@services/makeAnEnquire';
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
    const metaInfoPage = {
      language: region.lang,
      countryCode: region.country,
    };
    const promises = [
      readCacheDynamic(CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER, 'enquiry') ??
        commonService.getBanner(reqDataGetBanner, CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER),
      readCacheDynamic(CACHE_MAIN_MAKE_AN_ENQUIRE, 'enquiry') || oneIbcMake.getMake(region),
      readCacheDynamic(CACHE_META_SEO_MAKE_AN_ENQUIRE, 'contact-us') ??
        oneIbcMake.getInfoPageMetaDetail(metaInfoPage),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['banner', 'configFuture', 'metaInfo'];
    return {
      props: {
        ...coverObj(ar, data),
      },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
