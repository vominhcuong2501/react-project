import { MainLayout } from '@components/compound';
import InsightDetailPageType from '@containers/InsightsDetailPageType';
import withCommon from '@hoc/withCommon';
import insightServices from '@services/insight';
import { coverObj } from '@utils/helpers';

const Index = (props: any) => <InsightDetailPageType {...props} />;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { page } = context.params;

    const locale = {
      language: region.lang,
      countryCode: region.country,
    };
    const promises = [
      insightServices.getInsightDetailPageType(locale, page),
      insightServices.getInfoInsightKeyword(locale, page),
      insightServices.getConfigSidebar(locale),
    ];
    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );
    const ar = ['articlesInsights', 'detailMetaSeo', 'configSidebar'];
    const convertData = coverObj(ar, data);

    return {
      props: { ...convertData, isHome: false },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
