import { CACHE_FAQ_LIST, CACHE_FOLDER_FAQ } from '@/constants';
import { writeCacheDynamic } from '@/lib/writeCacheDynamic';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';
import { isSuccessful } from '@utils/helpers';

const configServices = {
  getListFaq: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/faq/index',
        data: payload,
      }),
    );
    if (!error && isSuccessful(response)) {
      writeCacheDynamic(CACHE_FAQ_LIST, response, CACHE_FOLDER_FAQ);
    }
    return response;
  },
};

export default configServices;
