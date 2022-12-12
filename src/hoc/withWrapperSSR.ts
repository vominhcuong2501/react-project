import { CACHE_FOOTER, CACHE_MENU_TOP } from '@/constants';
import { readCache } from '@/lib/readCache';
import { IGetService } from '@interfaces/index';
import { setFooterMenu, setMenuHeader } from '@redux/app/slice';
import { AppStore, wrapper } from '@redux/configureStore';
import commonService from '@services/common';
import { get } from 'lodash';
import { GetStaticPropsContext } from 'next';

interface Options {
  noAuth?: boolean;
  redirectAuth?: string;
}

interface IRegions {
  lang?: string;
  countryCode?: string;
}

interface GsspType {
  callback: (store: AppStore, ctx?: GetStaticPropsContext) => void;
  options?: Options;
  region?: IRegions;
}

const withIncrementalStaticRegeneration = ({ callback = () => null }: GsspType) =>
  wrapper.getStaticProps((store): any => async (ctx: GetStaticPropsContext) => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await callback(store, ctx, region);

    const promises = [
      readCache(CACHE_MENU_TOP) ?? commonService.getMenuHeader(reqDataGetService),
      readCache(CACHE_FOOTER) ?? commonService.getMenuFooter(reqDataGetService),
    ];
    const response: any = await Promise.allSettled(promises);

    const [menuList, footerMenu] = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    store.dispatch(setMenuHeader(menuList));
    store.dispatch(setFooterMenu(footerMenu));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result;
  });

export default withIncrementalStaticRegeneration;
