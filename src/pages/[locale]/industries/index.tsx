import {
  CACHE_BANNER_INDUSTRIES,
  CACHE_INSIGHT_LIST_COMMON,
  CACHE_LIST_INDUSTRIES,
  CACHE_META_SEO_INDUSTRIES,
  CONTROLLER_INDUSTRIES,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { MainLayout } from '@components/compound';
import Industries from '@containers/Industries';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetInsightHome } from '@interfaces/index';
import { setBreadcrumb, setListInsights } from '@redux/common/slice';
import industriesServices from '@services/industries';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb } from '@utils/helpers';

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
    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };
    const locale = {
      language: region.lang,
      countryCode: region.country,
    };
    const localeRequest = { ...locale };
    const promises = [
      readCacheDynamic(CACHE_BANNER_INDUSTRIES, 'industries') ||
        industriesServices.getBanner(reqDataGetBanner),

      readCacheDynamic(CACHE_META_SEO_INDUSTRIES, 'industries') ||
        industriesServices.getInfoPageMetaDetail(localeRequest),

      readCacheDynamic(CACHE_LIST_INDUSTRIES, 'industries') ||
        industriesServices.getListItemsDetail(localeRequest),

      readCacheDynamic(CACHE_INSIGHT_LIST_COMMON, 'insights') ||
        insightServices.getListCommon(reqDataInsight),
    ];

    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['banner', 'metaInfo', 'listIndustries', 'listInsight'];
    const convertData = coverObj(ar, data);
    const detailPage = getDataBreadcrumb(convertData['metaInfo'], 'page');

    store.dispatch(setListInsights(convertData['listInsight']));
    store.dispatch(setBreadcrumb([detailPage]));

    return {
      props: { ...convertData },
    };
  },
});

Index.Layout = MainLayout;
export default Index;
