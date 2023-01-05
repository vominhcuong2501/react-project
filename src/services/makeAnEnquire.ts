import { CACHE_MAIN_MAKE_AN_ENQUIRE, CACHE_META_SEO_MAKE_AN_ENQUIRE } from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const oneIbcMake = {
  getMake: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_make_an_enquire',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_MAIN_MAKE_AN_ENQUIRE, response, 'enquiry');
    return response;
  },
  getInfoPageMetaDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/make-an-enquire',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_META_SEO_MAKE_AN_ENQUIRE, response, 'make_an_enquire');
    return response;
  },
};

export default oneIbcMake;
