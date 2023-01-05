import { CACHE_FAQ_LIST, CACHE_FAQ_META, CACHE_FOLDER_FAQ } from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import FAQLayout from '@components/compound/layout/Faq';
import FAQContainer from '@containers/FAQ';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import faqServices from '@services/faq';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <FAQContainer {...props} />;

// export const getStaticPaths = getStaticPathsConfig;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const cache = {
      faqList: CACHE_FAQ_LIST,
      meta: CACHE_FAQ_META,
    };

    const locale = {
      language: region.lang,
      locationCode: region.country,
    };

    const promises = [
      readCacheDynamic(cache.faqList, CACHE_FOLDER_FAQ) || faqServices.getListFaq(locale),

      readCacheDynamic(cache.meta, CACHE_FOLDER_FAQ) || faqServices.getInfoMeta(locale),

      faqServices.getConfigTalkToUS(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['listFaq', 'detailMeta', 'configTalkToUs'];

    const convertData = coverObj(ar, data);

    const metaData = getDataMeta(get(convertData['detailMeta'], 'page', {}));

    store.dispatch(setBreadcrumb([getDataBreadcrumb(convertData['detailMeta'], 'page')]));

    return {
      props: { ...convertData, metaData, options: { isArticle: true, isHome: true } },
    };
  },
});

Index.Layout = FAQLayout;
export default Index;
