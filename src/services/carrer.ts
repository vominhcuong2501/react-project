import { publicRequest, serverRequest } from '@utils/api';
import { to } from '@utils/await-to-js';

const careerServices = {
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
  getMetaData: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/page/career',
        data: payload,
      }),
    );
    return response;
  },
  getConfigWhyJoinOne: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_career_why_join_one',
        data: payload,
      }),
    );
    return response;
  },
  getListArticles: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/career/articles',
        data: payload,
      }),
    );
    return response;
  },
  getListTypeArticle: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/type/${id}/articles`,
        data: payload,
      }),
    );
    return response;
  },
  getLisArticlePaginate: async (payload) => {
    const [error, response] = await to(
      publicRequest.request({
        method: 'POST',
        url: '/frontend/career/articles',
        data: payload,
      }),
    );
    return response;
  },
  getConfigLearnAbout: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_learn_more_about_one',
        data: payload,
      }),
    );
    return response;
  },
  getDetailArticle: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/article/${id}`,
        data: payload,
      }),
    );
    return response;
  },
  getArticle: async (payload, id) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: `/frontend/career/article/${id}`,
        data: payload,
      }),
    );
    return response;
  },
  getConfigOtherPosition: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_other_position',
        data: payload,
      }),
    );
    return response;
  },
  getConfigOfficeLocation: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_office_location',
        data: payload,
      }),
    );
    return response;
  },
  getConfigClosingDate: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_closing_date',
        data: payload,
      }),
    );
    return response;
  },
  getConfigApplyNow: async (payload) => {
    const [error, response] = await to(
      serverRequest.request({
        method: 'POST',
        url: '/frontend/config/txt_apply_now',
        data: payload,
      }),
    );
    return response;
  },
  getInCareer: (payload) =>
    publicRequest.request({
      method: 'POST',
      url: '/frontend/apply-cv/form',
      data: payload,
    }),
};

export default careerServices;
