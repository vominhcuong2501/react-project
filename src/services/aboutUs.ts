import { serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const aboutServices = {
  getBanner: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/banner',
        data: payload,
      }),
    );
    return response;
  },
  getPageDetail: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/about-us',
        data: payload,
      }),
    );
    return response;
  },
  getAward: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/3/articles',
        data: payload,
      }),
    );
    return response;
  },
  getLicenses: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/4/articles',
        data: payload,
      }),
    );
    return response;
  },
  getAboutArticle: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/4/articles',
        data: payload,
      }),
    );
    return response;
  },

  getListArticleAboutUs: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/type/2/articles',
        data: payload,
      }),
    );
    return response;
  },

  getConfigOurVision: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_our_vision',
        data: payload,
      }),
    );
    return response;
  },
  getConfigLearMoreAbout: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_learn_more_about_one',
        data: payload,
      }),
    );
    return response;
  },
  getConfigOurTeam: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_join_our_team',
        data: payload,
      }),
    );
    return response;
  },

  getConfigAward: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_awards',
        data: payload,
      }),
    );
    return response;
  },

  getConfigLicenses: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_licenses',
        data: payload,
      }),
    );
    return response;
  },

  getArticle: async (payload, keyword) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/article/${keyword}`,
        data: payload,
      }),
    );
    return response;
  },
};

export default aboutServices;
