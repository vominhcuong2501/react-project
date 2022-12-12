import { CACHE_MAIN_MAKE_AN_ENQUIRE, CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER } from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const oneIbcServices = {
  getBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_MAIN_MAKE_AN_ENQUIRE_BANNER, response);
    return response;
  },
  getMake: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_make_an_enquire',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_MAIN_MAKE_AN_ENQUIRE, response);
    return response;
  },
};

export default oneIbcServices;
