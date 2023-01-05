import {
  CACHE_DETAIL_SERVICES_BANNER,
  CACHE_FOOTER,
  CACHE_GET_UPDATE_SECTION,
  CACHE_LIST_SERVICE,
  CACHE_MENU_TOP,
} from '@/constants';
import { writeCache } from '@/lib/writeCache';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const commonService = {
  getMenuHeader: async (payload) => {
    const [error, menuHeader] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/general/menu/hearder',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_MENU_TOP, menuHeader, 'common');
    return menuHeader;
  },

  getMenuFooter: async (payload) => {
    const [error, menuFooter] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/general/menu/footer',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_FOOTER, menuFooter, 'common');
    return menuFooter;
  },

  getConfigFooter: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_social_network',
        data: payload,
      }),
    );
    return response;
  },

  getFooterConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_footer',
        data: payload,
      }),
    );
    return response;
  },

  getBanner: async (payload, cacheName) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(cacheName, response, 'common');
    return response;
  },

  getServiceData: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/service',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_LIST_SERVICE, response, 'common');
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
    if (!error) writeCache(CACHE_DETAIL_SERVICES_BANNER, response);
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
    if (!error) writeCache('sdfsdf', response);
    return response;
  },

  getInsightUpdate: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/insights/articles/home',
        data: payload,
      }),
    );
    if (!error) writeCacheDynamic(CACHE_GET_UPDATE_SECTION, response, 'common');
    return response;
  },

  getInfoPageMeta: async (payload, keyword) => {
    const [response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/page/${keyword}`,
        data: payload,
      }),
    );
    return response;
  },

  getFormConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_validation',
        data: payload,
      }),
    );
    return response;
  },

  getConfigUpdate: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_get_updated',
        data: payload,
      }),
    );
    return response;
  },
  getContactMapConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_contact_map',
        data: payload,
      }),
    );

    return response;
  },
  getContactSelectConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_contact_select',
        data: payload,
      }),
    );
    return response;
  },
  getContactFormConfig: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_contact_form',
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

export default commonService;
