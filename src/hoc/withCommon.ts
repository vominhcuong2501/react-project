import { CACHE_FOOTER, CACHE_MENU_TOP } from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import { IGetService } from '@interfaces/index';
import {
  setFooterConfig,
  setFooterConfigTxt,
  setFooterMenu,
  setMenuHeader,
} from '@redux/app/slice';

import {
  setConfigContactForm,
  setConfigContactMap,
  setConfigContactSelect,
  setConfigSubscribeConfig,
  setFormConfigTxt,
} from '@redux/common/slice';
import { AppStore, wrapper } from '@redux/configureStore';

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

const withCommon = ({ callback = (context) => null }: GsspType) =>
  wrapper.getServerSideProps((store): any => async (ctx: GetServerSidePropsContext) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const [lang, country] = get(ctx.query, 'locale', '').split('-');
    const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
    const userAgent = ctx.req.headers['user-agent'];
    const reqDataGetService: IGetService = {
      language: lang,
      countryCode: country,
    };

    const region = {
      language: lang,
      locationCode: country,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await callback(store, ctx, region);

    const promises = [
      readCacheDynamic(CACHE_MENU_TOP, 'common') ?? commonService.getMenuHeader(reqDataGetService),
      readCacheDynamic(CACHE_FOOTER, 'common') ?? commonService.getMenuFooter(reqDataGetService),
      commonService.getConfigFooter(reqDataGetService),
      commonService.getFooterConfig(reqDataGetService),
      commonService.getFormConfig(reqDataGetService),
      commonService.getContactMapConfig(reqDataGetService),
      commonService.getContactSelectConfig(reqDataGetService),
      commonService.getContactFormConfig(reqDataGetService),
      commonService.getConfigSubScribeUpdate(reqDataGetService),
    ];
    const response: any = await Promise.allSettled(promises);

    const [
      menuList,
      footerMenu,
      footerSocial,
      footerConfig,
      formConfig,
      mapContact,
      selectContact,
      formContact,
      subscribeConfig,
    ] = await response.map((item) => (item.status === 'fulfilled' ? item.value ?? [] : null));

    store.dispatch(setMenuHeader(menuList));
    store.dispatch(setFooterMenu(footerMenu));
    store.dispatch(setFooterConfig(footerSocial));
    store.dispatch(setFooterConfigTxt(footerConfig));
    store.dispatch(setFormConfigTxt(formConfig));
    store.dispatch(setConfigContactMap(mapContact));
    store.dispatch(setConfigContactSelect(selectContact));
    store.dispatch(setConfigContactForm(formContact));
    store.dispatch(setConfigSubscribeConfig(subscribeConfig));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.res.setHeader('Cache-control', 's-maxage=5', 'stale-white-revalidate=5');
    return result;
  });

export default withCommon;
