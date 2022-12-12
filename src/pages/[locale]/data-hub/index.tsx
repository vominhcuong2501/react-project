import InsightLayout from '@components/compound/layout/Insight';
import DataHubContainer from '@containers/DataHub';
import withWrapperSSG from '@hoc/withWrapperSSG';

const Index = (props: any) => <DataHubContainer {...props} />;

export const getServerSideProps = withWrapperSSG({ callback: () => null });
Index.Layout = InsightLayout;
export default Index;
