import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const awardsServices = {
  getListAwards: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/3/articles',
        data: payload,
      }),
    );
    return response;
  },
  getDetailArticle: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/article/${id}`,
        data: payload,
      }),
    );
    return response;
  },
  getDetailPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/awards',
        data: payload,
      }),
    );
    return response;
  },
};

export default awardsServices;
