import { MainLayout } from '@components/compound';
import Search from '@containers/Search';
import withWrapper from '@hoc/withWrapperSSG';

const Index = (props: any) => <Search {...props} />;

Index.Layout = MainLayout;
export default Index;
export const getServerSideProps = withWrapper({ callback: () => null });
