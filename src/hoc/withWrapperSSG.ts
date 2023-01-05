import { CACHE_FOOTER, CACHE_MENU_TOP } from '@/constants';
import { readCache } from '@/lib/readCache';
import { IGetInsightHome, IGetService } from '@interfaces/index';
import {
  setFooterConfig,
  setFooterConfigTxt,
  setFooterMenu,
  setMenuHeader,
} from '@redux/app/slice';
import { setFormConfigTxt } from '@redux/common/slice';
import { AppStore, wrapper } from '@redux/configureStore';
import { setIp, setUserAgent } from '@redux/home/slice';
import commonService from '@services/common';
import { get } from 'lodash';
import { GetServerSidePropsContext } from 'next';

interface Options {
  noAuth?: boolean;
  redirectAuth?: string;
}

interface IRegions {
  lang?: string;
  countryCode?: string;
}

interface GsspType {
  callback: (store: AppStore, ctx?: GetServerSidePropsContext) => void;
  options?: Options;
  region?: IRegions;
}

const withWrapperSSG = ({ callback = () => null }: GsspType) =>
  wrapper.getServerSideProps((store): any => async (ctx: GetServerSidePropsContext) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [lang, country] = get(ctx.query, 'locale', '').split('-');

    const reqDataGetService: IGetService = {
      language: lang,
      countryCode: country,
    };

    const region = {
      language: lang,
      locationCode: country,
    };

    const reqUpdateSection: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await callback(store, ctx, region);
    const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
    const userAgent = ctx.req.headers['user-agent'];

    const promises = [
      readCache(CACHE_MENU_TOP) ?? commonService.getMenuHeader(reqDataGetService),
      readCache(CACHE_FOOTER) ?? commonService.getMenuFooter(reqDataGetService),

      commonService.getConfigFooter(reqDataGetService),
      commonService.getFooterConfig(reqDataGetService),
      commonService.getFormConfig(reqDataGetService),
    ];
    const response: any = await Promise.allSettled(promises);

    const [menuList, footerMenu, footerSocial, footerConfig, formConfig] = await response.map(
      (item) => (item.status === 'fulfilled' ? item.value ?? [] : null),
    );

    store.dispatch(setMenuHeader(menuList));
    store.dispatch(setFooterMenu(footerMenu));
    store.dispatch(setFooterConfig(footerSocial));
    store.dispatch(setFooterConfigTxt(footerConfig));

    store.dispatch(setFormConfigTxt(formConfig));
    store.dispatch(setIp(ip));
    store.dispatch(setUserAgent(userAgent));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.res.setHeader('Cache-control', 's-maxage=5', 'stale-white-revalidate=5');
    return result;
  });

export default withWrapperSSG;
