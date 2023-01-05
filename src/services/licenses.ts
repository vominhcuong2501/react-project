import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const licensesServices = {
  getListLicenses: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/4/articles',
        data: payload,
      }),
    );
    return response;
  },
  getDetailLicenses: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/articles/${id}`,
        data: payload,
      }),
    );
    return response;
  },
  getDetailPage: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/licenses',
        data: payload,
      }),
    );
    return response;
  },
};

export default licensesServices;
