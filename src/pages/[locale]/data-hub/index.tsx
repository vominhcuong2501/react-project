import DataHubContainer from '@containers/DataHub';

import {
  CACHE_DATA_HUB_DETAIL_META,
  CACHE_FOLDER_DATA_HUB,
  CACHE_FOLDER_INSIGHT,
  CACHE_INSIGHT_BANNER,
  CACHE_LIST_DATA_HUB,
} from '@/constants';
import { readCacheDynamic } from '@/lib/readCacheDynamic';
import InsightLayout from '@components/compound/layout/Insight';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import { setConfigSubscribeConfig } from '@redux/insights/slice';
import dataHubServices from '@services/data-hub';
import insightServices from '@services/insight';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <DataHubContainer {...props} />;

// export const getStaticPaths = getStaticPathsConfig;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const locale = {
      language: region.lang,
      countryCode: region.country,
    };

    const promises = [
      // get list data hub
      readCacheDynamic(CACHE_LIST_DATA_HUB, CACHE_FOLDER_DATA_HUB) ||
        dataHubServices.getListDataHub(locale),

      // get meta data
      readCacheDynamic(CACHE_DATA_HUB_DETAIL_META, CACHE_FOLDER_DATA_HUB) ||
        dataHubServices.getInfoDataHubMeta(locale),

      // get banner insight
      readCacheDynamic(CACHE_INSIGHT_BANNER, CACHE_FOLDER_INSIGHT) ||
        insightServices.getConfigBanner(locale),

      insightServices.getConfigSubScribeUpdate(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['listDataHub', 'metaDetailPage', 'configBanner', 'subscribeConfig'];

    const convertData = coverObj(ar, data);
    store.dispatch(setConfigSubscribeConfig(convertData['subscribeConfig']));
    store.dispatch(setBreadcrumb([getDataBreadcrumb(convertData['metaDetailPage'], 'page')]));

    const metaData = getDataMeta(get(convertData['metaDetailPage'], 'page', {}));

    return {
      props: { ...convertData, metaData, options: { isHome: true, isHomeInsight: true } },
    };
  },
});
Index.Layout = InsightLayout;
export default Index;
