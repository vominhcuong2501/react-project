import {
  CACHE_CONSULTING_BANNER,
  CACHE_CONSULTING_DETAIL_BANNER,
  CACHE_CONSULTING_DETAIL_META_SEO,
  CACHE_CONSULTING_LIST,
  CACHE_CONSULTING_META_SEO,
  CACHE_MAIN_LIST_CONSULTING_SERVICES,
} from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const consultingServices = {
  getBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_CONSULTING_BANNER, response);
    return response;
  },

  getInfoPageMeta: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/consulting-services',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_CONSULTING_META_SEO, response);
    return response;
  },

  getListItems: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/${keyword}`,
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_MAIN_LIST_CONSULTING_SERVICES, response);
    return response;
  },

  getListServices: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/service',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_CONSULTING_LIST, response);
    return response;
  },

  getBannerDetail: async (payload, container) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCache(`${CACHE_CONSULTING_DETAIL_BANNER}-${container}`, response);
    return response;
  },

  getServiceKeyword: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/service/${keyword}`,
        data: payload,
      }),
    );
    if (!error) writeCache(`${CACHE_CONSULTING_DETAIL_META_SEO}-${keyword}`, response);
    return response;
  },
};

export default consultingServices;
