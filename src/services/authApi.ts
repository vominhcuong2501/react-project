import { publicRequest } from '@utils/api';

const authService = {
  logout: () =>
    publicRequest.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
    }),

  login: (params) =>
    publicRequest.request({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/posts/${params}`,
    }),
};

export default authService;
