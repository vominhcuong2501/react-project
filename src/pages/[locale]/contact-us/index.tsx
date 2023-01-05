import { MainLayout } from '@components/compound';
import ContactUS from '@containers/ContacUs';

import {
  CACHE_MAIN_CONTACTS_COUNTRIES_SERVICE,
  CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE,
  CACHE_MAIN_CONTACTS_OFFICES_ALL_SERVICE,
  CACHE_MAIN_CONTACTS_OFFICES_SERVICE,
  CACHE_MAIN_CONTACT_BANNER,
  CACHE_META_SEO_CONTACT,
} from '@/constants';

import { readCacheDynamic } from '@/lib/readCacheDynamic';
import withCommon from '@hoc/withCommon';
import { IGetBanner } from '@interfaces/home';
import { setBreadcrumb } from '@redux/common/slice';
import commonService from '@services/common';
import oneIbcContacts from '@services/contactsPage';
import { coverObj, getDataBreadcrumb } from '@utils/helpers';

const Index = (props: any) => <ContactUS {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetBanner: IGetBanner = {
      controller: 'contactus',
      ...region,
    };
    const metaInfoPage = {
      language: region.lang,
      countryCode: region.country,
    };
    const promises = [
      readCacheDynamic(CACHE_MAIN_CONTACT_BANNER, 'common') ??
        commonService.getBanner(reqDataGetBanner, CACHE_MAIN_CONTACT_BANNER),

      readCacheDynamic(CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE, 'contact-us') ??
        oneIbcContacts.getCustomerService(region),

      readCacheDynamic(CACHE_META_SEO_CONTACT, 'contact-us') ??
        oneIbcContacts.getInfoPageMetaDetail(metaInfoPage),

      readCacheDynamic(CACHE_MAIN_CONTACTS_OFFICES_SERVICE, 'contact-us') ??
        oneIbcContacts.getOfficesService(region),

      readCacheDynamic(CACHE_MAIN_CONTACTS_COUNTRIES_SERVICE, 'contact-us') ??
        oneIbcContacts.getOfficesService(region),

      readCacheDynamic(CACHE_MAIN_CONTACTS_OFFICES_ALL_SERVICE, 'contact-us') ??
        oneIbcContacts.getOfficesService(region),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'banner',
      'listService',
      'metaInfo',
      'officesService',
      'countriesService',
      'officesAllService',
    ];

    const convertData: any = coverObj(ar, data);

    // config breadcrumb
    const detailPage = getDataBreadcrumb(convertData['metaInfo'], 'page');

    store.dispatch(setBreadcrumb([detailPage]));

    return {
      props: {
        ...convertData,
      },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
