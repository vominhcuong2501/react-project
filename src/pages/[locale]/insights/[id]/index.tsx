import { CURRENT_PAGE, LIMIT_PAGINATE } from '@/constants/config';
import InsightLayout from '@components/compound/layout/Insight';
import InsightsDetailPage from '@containers/InsightsDetailPage';
import withInsights from '@hoc/withInsight';
import insightServices from '@services/insight';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <InsightsDetailPage {...props} />;
export const getServerSideProps = withInsights({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { id } = context.query;
    const reqDataGetArticle: any = {
      limit: LIMIT_PAGINATE,
      page: CURRENT_PAGE,
      type: id,
      table: 'insights',
    };
    const locale = {
      language: region.lang,
      countryCode: region.country,
    };
    const promises = [
      insightServices.getInsightDetailPage(reqDataGetArticle),
      insightServices.getInsightConfig(locale),
      insightServices.getLisFilterOptions(locale),
      insightServices.getConfigNodata(locale),
      insightServices.getInfoInsightKeyword(locale, id),
      insightServices.getConfigInsightFilter(locale),
    ];
    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = [
      'detailPage',
      'insightConfig',
      'listOptions',
      'noData',
      'detailMetaSeo',
      'configFilter',
    ];
    const convertData = coverObj(ar, data);

    return {
      props: { ...convertData, isHome: false },
    };
  },
});
Index.Layout = InsightLayout;
export default Index;
