import InsightLayout from '@components/compound/layout/Insight';
import FAQContainer from '@containers/FAQ';
import withWrapperSSG from '@hoc/withWrapperSSG';

const Index = (props: any) => <FAQContainer {...props} />;

export const getServerSideProps = withWrapperSSG({ callback: () => null });
Index.Layout = InsightLayout;
export default Index;
