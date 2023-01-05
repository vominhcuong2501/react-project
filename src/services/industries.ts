import {
  CACHE_BANNER_INDUSTRIES,
  CACHE_BANNER_INDUSTRIES_DETAIL,
  CACHE_INDUSTRIES_DETAIL_META_SEO,
  CACHE_LIST_INDUSTRIES,
  CACHE_META_SEO_INDUSTRIES,
} from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
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
    if (!error) writeCacheDynamic(CACHE_BANNER_INDUSTRIES, response, 'industries');
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
    if (!error) writeCacheDynamic(CACHE_BANNER_INDUSTRIES_DETAIL, response, 'industries-detail');
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
    if (!error) writeCacheDynamic(CACHE_META_SEO_INDUSTRIES, response, 'industries');
    return response;
  },

  getInfoPageMetaDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/industries',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_META_SEO_INDUSTRIES, response, 'industries-detail');
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
    if (!error) writeCacheDynamic(CACHE_LIST_INDUSTRIES, response, 'industries');
    return response;
  },

  getListItemsDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/industry',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_LIST_INDUSTRIES, response, 'industries-detail');
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
    if (!error) {
      writeCacheDynamic(
        `${CACHE_INDUSTRIES_DETAIL_META_SEO}-${keyword}`,
        response,
        'industries-detail',
      );
    }
    return response;
  },
};

export default industriesServices;
