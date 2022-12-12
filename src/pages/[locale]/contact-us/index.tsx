import { MainLayout } from '@components/compound';
import ContactUS from '@containers/ContacUs';

import {
  CACHE_MAIN_CONTACTS_COUNTRIES_SERVICE,
  CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE,
  CACHE_MAIN_CONTACTS_OFFICES_ALL_SERVICE,
  CACHE_MAIN_CONTACTS_OFFICES_SERVICE,
  CACHE_MAIN_CONTACT_BANNER,
} from '@/constants';
import { readCache } from '@/lib/readCache';

import withCommon from '@hoc/withCommon';
import { IGetBanner } from '@interfaces/home';
import commonService from '@services/common';
import oneIbcContacts from '@services/contactsPage';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <ContactUS {...props} />;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetBanner: IGetBanner = {
      controller: 'contactus',
      ...region,
    };
    const promises = [
      readCache(CACHE_MAIN_CONTACT_BANNER) ??
        commonService.getBanner(reqDataGetBanner, CACHE_MAIN_CONTACT_BANNER),
      readCache(CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE) ?? oneIbcContacts.getCustomerService(region),
      readCache(CACHE_MAIN_CONTACTS_OFFICES_SERVICE) ?? oneIbcContacts.getOfficesService(region),
      readCache(CACHE_MAIN_CONTACTS_COUNTRIES_SERVICE) ?? oneIbcContacts.getOfficesService(region),
      readCache(CACHE_MAIN_CONTACTS_OFFICES_ALL_SERVICE) ??
        oneIbcContacts.getOfficesService(region),
    ];
    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['banner', 'listService', 'officesService', 'countriesService', 'officesAllService'];
    return {
      props: {
        ...coverObj(ar, data),
      },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
