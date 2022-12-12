import {
  CACHE_BANNER_INDUSTRIES,
  CACHE_LIST_INDUSTRIES,
  CACHE_META_SEO_INDUSTRIES,
  CONTROLLER_INDUSTRIES,
} from '@/constants';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import Industries from '@containers/Industries';
import withCommon from '@hoc/withCommon';
import { IGetBanner } from '@interfaces/index';
import industriesServices from '@services/industries';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <Industries {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const controller = CONTROLLER_INDUSTRIES;
    const reqDataGetBanner: IGetBanner = {
      controller,
      ...region,
    };
    const locale = {
      language: region.lang,
      countryCode: region.country,
    };
    const localeRequest = { ...locale };
    const promises = [
      readCache(CACHE_BANNER_INDUSTRIES) || industriesServices.getBanner(reqDataGetBanner),
      readCache(CACHE_META_SEO_INDUSTRIES) || industriesServices.getInfoPageMeta(localeRequest),
      readCache(CACHE_LIST_INDUSTRIES) || industriesServices.getListItems(localeRequest),
    ];

    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['banner', 'metaInfo', 'listIndustries'];
    return {
      props: {
        ...coverObj(ar, data),
      },
    };
  },
});

Index.Layout = MainLayout;
export default Index;
