import { publicRequest } from '@utils/api';

const productService = {
  getProduct: () =>
    publicRequest.request({
      method: 'GET',
      url: 'products',
    }),
};

export default productService;
