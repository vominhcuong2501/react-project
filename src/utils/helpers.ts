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
