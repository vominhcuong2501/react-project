import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const infoServices = {
  getDetailArticle: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/article/${id}`,
        data: payload,
      }),
    );
    // if (!error) writeCache(CACHE_FAQ_LIST, response);
    return response;
  },

  getInfoPage: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/article/${id}`,
        data: payload,
      }),
    );
    // if (!error) writeCache(CACHE_FAQ_LIST, response);
    return response;
  },
};

export default infoServices;
