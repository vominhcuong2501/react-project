import { publicRequest, serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const searchServices = {
  getProduct: () =>
    publicRequest.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
    }),

  getProductDetail: (params) =>
    publicRequest.request({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/posts/${params}`,
    }),

  getMetaData: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/search',
        data: payload,
      }),
    );
    return response;
  },
};

export default searchServices;
