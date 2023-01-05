import {
  CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE,
  CACHE_MAIN_CONTACTS_OFFICES_SERVICE,
  CACHE_META_SEO_CONTACT,
} from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const oneIbcContacts = {
  getCustomerService: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/customer-service',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_MAIN_CONTACTS_CUSTOMER_SERVICE, response, 'contact-us');
    return response;
  },
  getOfficesService: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/contact/index',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_MAIN_CONTACTS_OFFICES_SERVICE, response, 'contact-us');
    return response;
  },
  getInfoPageMetaDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/contact-us',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_META_SEO_CONTACT, response, 'contact-us');
    return response;
  },
};

export default oneIbcContacts;
