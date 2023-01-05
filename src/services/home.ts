import {
  CACHE_HOME_BANNER,
  CACHE_HOME_CONSULTING_NAME,
  CACHE_HOME_DIFFERENCE,
  CACHE_HOME_INFO,
  CACHE_HOME_INSIGHT_UPDATE,
  CACHE_HOME_LIST_INSIGHT,
  CACHE_HOME_METHODOLOGY,
  CACHE_HOME_METHODOLOGY_JS,
  CACHE_INTELLIGENCE_NETWORK,
} from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { publicRequest, serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const homeService = {
  getInTouch: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/leadform/form',
      data: payload,
    }),

  getInTouchOtp: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/leadform/verify',
      data: payload,
    }),

  getBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );

    if (!error) writeCacheDynamic(CACHE_HOME_BANNER, response, 'home');
    return response;
  },

  getListInsight: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/articles/home',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_LIST_INSIGHT, response, 'home');
    return response;
  },

  getInsightHome: (payload) =>
    serverRequest.request({
      method: 'POST',
      url: '/frontend/insights/home',
      data: payload,
    }),

  getLeadForm: (payload) =>
    serverRequest.request({
      method: 'POST',
      url: '/frontend/social-network',
      data: payload,
    }),

  getInsightUpdate: async (payload) => {
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

  getIntelligence: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_intelligence_network',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_INTELLIGENCE_NETWORK, response, 'home');
    return response;
  },

  getConfigFindOutMore: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_find_out_more',
        data: payload,
      }),
    );
    return response;
  },

  getDifference: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_our_difference_and_values',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_DIFFERENCE, response, 'home');
    return response;
  },

  getMethodologyOfApproach: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_methodology_of_approach',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_METHODOLOGY, response, 'home');
    return response;
  },

  getMethodologyOfApproachJS: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_methodology_of_approach_js',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_METHODOLOGY_JS, response, 'home');
    return response;
  },

  getConfigConsultingName: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_consulting_services',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_CONSULTING_NAME, response, 'home');
    return response;
  },

  getInfoHomePage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/homepage',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_HOME_INFO, response, 'home');
    return response;
  },

  getInfoForm: (payload) =>
    serverRequest.request({
      method: 'POST',
      url: '/frontend/config/txt_form',
      data: payload,
    }),

  getInContact: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/contact/form',
      data: payload,
    }),

  getInSubscribe: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/subscribe/form',
      data: payload,
    }),
  getInDataHub: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/data-hub/form',
      data: payload,
    }),
};

export default homeService;
