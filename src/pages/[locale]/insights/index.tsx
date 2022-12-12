import { CACHE_FAQ_ARTICLE, CACHE_INSIGHT_ARTICLES_LIST_TYPE } from '@/constants';
import { readCache } from '@/lib/readCache';
import InsightLayout from '@components/compound/layout/Insight';
import Insights from '@containers/Insights';
import withInsights from '@hoc/withInsight';
import { IGetInsightHome } from '@interfaces/home';
import dataHubServices from '@services/data-hub';
import faqServices from '@services/faq';
import insightServices from '@services/insight';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <Insights {...props} />;
export const getServerSideProps = withInsights({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetArticle: any = {
      limit: 6,
    };

    const locale = {
      language: region.lang,
      countryCode: region.country,
    };

    const reqDataInsight: IGetInsightHome = {
      isHome: 'Y',
      limit: 4,
      ...region,
    };

    const promises = [
      readCache(CACHE_INSIGHT_ARTICLES_LIST_TYPE) ||
        insightServices.getInsightMainPage(reqDataGetArticle),
      readCache(CACHE_FAQ_ARTICLE) || faqServices.getListFaq(reqDataGetArticle),
      insightServices.getInsightConfig(locale),
      dataHubServices.getListDataHub(locale),
      insightServices.getLisFilterOptions(locale),
      insightServices.getListInsights(reqDataInsight),
      insightServices.getInfoInsightPage(locale),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'articlesInsights',
      'faq',
      'insightConfig',
      'dataHub',
      'listOptions',
      'listInsightLastest',
      'detailMetaSeo',
    ];

    const convertData = coverObj(ar, data);
    return {
      props: { ...convertData, isHome: true },
    };
  },
});
Index.Layout = InsightLayout;
export default Index;
