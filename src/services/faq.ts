import {
  CACHE_FAQ_ARTICLE,
  CACHE_FAQ_LIST,
  CACHE_FAQ_META,
  CACHE_FAQ_TYPE,
  CACHE_FOLDER_FAQ,
} from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';
import { isSuccessful } from '@utils/helpers';

const faqServices = {
  getListFaq: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/faq/index',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_FAQ_LIST, response, CACHE_FOLDER_FAQ);
    }
    return response;
  },

  getDetailFaq: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/faq/article/${id}`,
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_FAQ_ARTICLE}-${id}`, response, CACHE_FOLDER_FAQ);
    }
    return response;
  },

  getConfigBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_faq_banner',
        data: payload,
      }),
    );
    return response;
  },

  getConfigTalkToUS: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_talk_to_us_now',
        data: payload,
      }),
    );
    return response;
  },

  getDetailTypeFaq: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/faq/search',
        data: payload,
      }),
    );

    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_FAQ_TYPE}-${id}`, response, CACHE_FOLDER_FAQ);
    }
    return response;
  },

  getInfoMeta: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/faq',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_FAQ_META, response, CACHE_FOLDER_FAQ);
    }
    return response;
  },
};

export default faqServices;
