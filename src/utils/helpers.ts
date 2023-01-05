import { get, pick, reduce, toString } from 'lodash';

export const coverObj = <T>(keys: string[], data: Array<T>) =>
  keys.reduce(
    (preVal: { [key: string]: T }, key: string, idx: number) => ({
      ...preVal,
      [key]: data[idx],
    }),
    {},
  );

/**
 * Returns the element height including margins
 * @param element - element
 * @returns {number}
 */
export const outerHeight = (element) => {
  const height = element.offsetHeight;
  const style = window.getComputedStyle(element);

  return ['top', 'bottom']
    .map((side) => parseInt(style[`margin-${side}`], 10))
    .reduce((total, side) => total + side, height);
};

/**
 * return new id route with uppercase
 * @param router
 */
export const convertRouteName = (router) => {
  const pathnames = router.asPath.split('/').filter((x) => x);

  pathnames.map((name, index) => {
    const isLast = index === pathnames.length - 1;
    const customName = name
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
    if (isLast) return customName;
    return '';
  });
};

/**
 *
 * @param id
 * @param insightTypeRoutes
 * @param articlesRoutes
 * @returns
 */
export const validationRoutes = (
  id: string,
  insightTypeRoutes: Array<string>,
  articlesRoutes: Array<string>,
) => {
  let isType = false;
  let isArticle = false;
  if (insightTypeRoutes && insightTypeRoutes.indexOf(id) > -1) isType = true;
  if (articlesRoutes && articlesRoutes.indexOf(id) > -1) isArticle = true;

  return [isType, isArticle];
};

export const extractContent = (value) => {
  let div = document.createElement('div');
  div.innerHTML = value;
  let text = div.textContent;
  return text;
};

/**
 *
 * @returns return 404 page
 */
export const redirectNotFound = () => ({
  redirect: {
    destination: '/notfound',
  },
});

export const isSuccessful = (response) => response.isSuccessful === 'true';

export const getDataMeta = (data) => {
  const { title = '', name = '', meta_keyword = '', meta_description = '', meta_image = '' } = data;

  return {
    title,
    name,
    meta_keyword,
    meta_description,
    meta_image,
  };
};

export const convertTZ = (date, tzString) =>
  new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    }),
  );

export const convertDate = (update_at) => new Date(+`${update_at || 0}` * 1000);

export const queryList = (limit, page) => ({
  limit,
  page,
});

export const getConfig = (config) => get(config, 'config.content', '');

export const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

export const groupFunc = (ar: any, key) =>
  reduce(
    ar,
    (acc, value) => {
      // Group initialization
      if (!acc[value[key]]) {
        acc[value[key]] = [];
      }

      // Grouping
      acc[value[key]].push(value);

      return acc;
    },
    {},
  );

export const formatCurrency = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

export const formatNumber = (val: number) =>
  toString(val)
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// return object {name, keyword}
export const getDataBreadcrumb = (detailData, name) =>
  pick(get(detailData, name), ['name', 'keyword']);
