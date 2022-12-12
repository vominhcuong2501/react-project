import { CACHE_HOME_BANNER, CACHE_MAIN_SERVICES_CONFIG_FUTURE } from '@/constants';
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
    if (!error) writeCache(CACHE_HOME_BANNER, response);
    return response;
  },

  getConfigFuture: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_reinventing_the_future',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_MAIN_SERVICES_CONFIG_FUTURE, response);
    return response;
  },
  // getDetailMetaService: async (payload, keyword) => {
  //   const [error, response] = await to(
  //     serverRequest.request({
  //       method: 'POST',
  //       url: `/frontend/service/${keyword}`,
  //       data: payload,
  //     }),
  //   );
  //   if (!error) writeCache(CACHE_MAIN_SERVICES_META_KEYWORD, response);
  //   return response;
  // },
};

export default oneIbcServices;
