import {
  CACHE_CONSULTING_BANNER,
  CACHE_CONSULTING_LIST,
  CACHE_CONSULTING_META_SEO,
} from '@/constants';
import { readCache } from '@/lib/readCache';
import { MainLayout } from '@components/compound';
import ConsultingService from '@containers/ConsultingServices';
import withCommon from '@hoc/withCommon';
import { IGetBanner } from '@interfaces/index';
import { setListConsultingService } from '@redux/app/slice';
import consultingServices from '@services/consulting';
import { coverObj } from '@utils/helpers';

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
    const promises = [
      readCache(CACHE_CONSULTING_BANNER) || consultingServices.getBanner(reqDataGetBanner),
      readCache(CACHE_CONSULTING_META_SEO) || consultingServices.getInfoPageMeta(metaInfoPage),
      readCache(CACHE_CONSULTING_LIST) ?? consultingServices.getListServices(metaInfoPage),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['banner', 'metaInfo', 'listConsultingServices'];

    const convertData = coverObj(ar, data);
    store.dispatch(setListConsultingService(convertData['listConsultingServices']));
    return {
      props: { ...convertData },
    };
  },
});

Index.Layout = MainLayout;
export default Index;
