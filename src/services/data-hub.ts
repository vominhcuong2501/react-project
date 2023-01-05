import {
  CACHE_DATA_HUB_ARTICLE,
  CACHE_DATA_HUB_DETAIL_META,
  CACHE_DATA_HUB_TYPE,
  CACHE_FOLDER_DATA_HUB,
  CACHE_LIST_DATA_HUB,
} from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';
import { isSuccessful } from '@utils/helpers';

const dataHubServices = {
  getListDataHub: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/data-hub/index',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_LIST_DATA_HUB, response, CACHE_FOLDER_DATA_HUB);
    }
    return response;
  },

  getArticleDataHub: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/data-hub/article/${id}`,
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_DATA_HUB_ARTICLE}-${id}`, response, CACHE_FOLDER_DATA_HUB);
    }
    return response;
  },

  getTypeDataHub: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/data-hub/search',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(`${CACHE_DATA_HUB_TYPE}-${id}`, response, CACHE_FOLDER_DATA_HUB);
    }
    return response;
  },

  getInfoDataHubMeta: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/data-hub',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_DATA_HUB_DETAIL_META, response, CACHE_FOLDER_DATA_HUB);
    }

    return response;
  },
};

export default dataHubServices;
