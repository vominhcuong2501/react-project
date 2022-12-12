import {
  CACHE_HOME_INSIGHT_UPDATE,
  CACHE_INSIGHT_ARTICLES_CONFIG,
  CACHE_INSIGHT_ARTICLES_LIST_TYPE,
  CACHE_INSIGHT_META_SEO,
  CACHE_INSIGHT_PAGE_TYPE,
  CACHE_INSIGHT_TYPE,
  CACHE_INSIGHT_TYPE_META_SEO,
} from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { publicRequest, serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const insightServices = {
  getListInsights: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/articles/home',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_HOME_INSIGHT_UPDATE, response);
    return response;
  },

  getArticlesInsights: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/search',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_ARTICLES_LIST_TYPE, response);
    return response;
  },

  getInsightConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_insight_banner',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_ARTICLES_CONFIG, response);
    return response;
  },

  getInsightMainPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/articles',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_TYPE, response);
    return response;
  },

  getInsightDetailPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/search',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_TYPE, response);
    return response;
  },

  getInsightDetailPageClient: async (payload) => {
    const [error, response] = await to(
      publicRequest.request({
        method: 'POST',
        url: '/frontend/insights/search',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_TYPE, response);
    return response;
  },

  getInsightDetailPageType: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/insights/article/${keyword}`,
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_PAGE_TYPE, response);
    return response;
  },

  getLisFilterOptions: async (payload) => {
    const [_, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/general/filter',
        data: payload,
      }),
    );
    return response;
  },

  getConfigNodata: async (payload) => {
    const [_, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_no_data',
        data: payload,
      }),
    );
    return response;
  },

  getInfoInsightPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/insights',
        data: payload,
      }),
    );
    if (!error) writeCache(CACHE_INSIGHT_META_SEO, response);
    return response;
  },

  getInfoInsightKeyword: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/insights/${keyword}`,
        data: payload,
      }),
    );
    if (!error) writeCache(`${CACHE_INSIGHT_TYPE_META_SEO}-${keyword}`, response);
    return response;
  },

  getConfigInsightFilter: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_insight_filter',
        data: payload,
      }),
    );
    return response;
  },

  getConfigSidebar: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_insight_sidebar',
        data: payload,
      }),
    );
    return response;
  },
};

export default insightServices;
