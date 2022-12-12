import {
  CACHE_BANNER_INDUSTRIES,
  CACHE_BANNER_INDUSTRIES_DETAIL,
  CACHE_INDUSTRIES_DETAIL_META_SEO,
  CACHE_LIST_INDUSTRIES,
  CACHE_META_SEO_INDUSTRIES,
} from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const industriesServices = {
  getBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_BANNER_INDUSTRIES, response);
    return response;
  },

  getBannerDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_BANNER_INDUSTRIES_DETAIL, response);
    return response;
  },

  getInfoPageMeta: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/industries',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_META_SEO_INDUSTRIES, response);
    return response;
  },

  getListItems: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/industry',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_LIST_INDUSTRIES, response);
    return response;
  },

  getIndustriesKeyword: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/industry/${keyword}`,
        data: payload,
      }),
    );
    if (!error) writeCache(`${CACHE_INDUSTRIES_DETAIL_META_SEO}-${keyword}`, response);
    return response;
  },
};

export default industriesServices;
