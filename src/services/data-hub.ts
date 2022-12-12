import { writeCache } from '@/lib/writeCache';
import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const dataHubServices = {
  getListDataHub: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/data-hub/articles',
        data: payload,
      }),
    );
    if (!error) writeCache('sdf', response);
    return response;
  },
};

export default dataHubServices;
