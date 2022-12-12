import { publicRequest } from '@utils/api';

const postService = {
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
};

export default postService;
