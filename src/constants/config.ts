export const getStaticPathsConfig = () => ({
  paths: [{ params: { locale: 'en-gx' } }],
  fallback: true,
});

export const INNER_WIDTH_MOBILE = 768;
export const PAGE_RANGE_MOBILE = 1;
export const PAGE_RANGE_BROWSER = 4;
export const MARGIN_PAGE = 2;

// Pagination
export const PER_PAGE = 6;
export const LIMIT_PAGINATE = 6;
export const CURRENT_PAGE = 1;
