import { publicRequest } from '@utils/api';

const authService = {
  update: (params) =>
    publicRequest.request({
      method: 'PUT',
      url: `/users/${params}`,
      baseURL: 'https://jsonplaceholder.typicode.com',
      data: {
        name: 'Leanne Graham 123123',
        username: 'Bret 123123',
      },
    }),

  get: (params) =>
    publicRequest.request({
      method: 'GET',
      url: `/users/${params}`,
      baseURL: 'https://jsonplaceholder.typicode.com',
    }),
};

export default authService;
