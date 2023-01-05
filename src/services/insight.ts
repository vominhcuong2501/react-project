import {
  CACHE_FAQ_DETAIL_TXT_FILTER,
  CACHE_FAQ_DETAIL_TXT_NO_DATA,
  CACHE_FOLDER_INSIGHT,
  CACHE_INSIGHT_ARTICLE,
  CACHE_INSIGHT_BANNER,
  CACHE_INSIGHT_CONFIG_SIDE_BAR,
  CACHE_INSIGHT_DATA_HUB,
  CACHE_INSIGHT_FAQ,
  CACHE_INSIGHT_LATEST,
  CACHE_INSIGHT_LIST_FILTER,
  CACHE_INSIGHT_LIST_TYPES,
  CACHE_INSIGHT_META,
  CACHE_INSIGHT_TYPE,
} from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { publicRequest, serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';
import { isSuccessful } from '@utils/helpers';

const insightServices = {
  getListCommon: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/articles/home',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_LATEST, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getListDataHub: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/data-hub/articles',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_DATA_HUB, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getConfigBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_insight_banner',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_BANNER, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  /**
   * url: '/frontend/insights/articles',
   * @param payload insight
   * @returns promise data list insight types
   */
  getListTypes: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/${id}/articles`,
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_INSIGHT_LIST_TYPES}-${id}`, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getListFaq: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/faq/articles',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_FAQ, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getDetailPage: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/search',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_INSIGHT_TYPE}-${id}`, response, CACHE_FOLDER_INSIGHT);
    }
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
    return response;
  },

  getDetailPageType: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/insights/article/${id}`,
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_INSIGHT_ARTICLE}-${id}`, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getLisFilterOptions: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/general/filter',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_LIST_FILTER, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getConfigNodata: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_no_data',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_FAQ_DETAIL_TXT_NO_DATA, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getInfoMetaPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/insights',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_META, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getConfigFilter: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_insight_filter',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_FAQ_DETAIL_TXT_FILTER, response, CACHE_FOLDER_INSIGHT);
    }

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
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_INSIGHT_CONFIG_SIDE_BAR, response, CACHE_FOLDER_INSIGHT);
    }
    return response;
  },

  getConfigDataHub: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_explore_our_publication_library',
        data: payload,
      }),
    );

    return response;
  },

  getConfigFaq: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_questions_about_our_services',
        data: payload,
      }),
    );

    return response;
  },

  getConfigSubScribeUpdate: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/subcirbe_to_our_updates',
        data: payload,
      }),
    );

    return response;
  },
};

export default insightServices;
