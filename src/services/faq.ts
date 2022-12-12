import { writeCache } from '@/lib/writeCache';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const faqServices = {
  getListFaq: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/faq/articles',
        data: payload,
      }),
    );
    if (!error) writeCache('adf', response);
    return response;
  },
};

export default faqServices;
