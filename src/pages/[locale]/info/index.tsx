import { MainLayout } from '@components/compound';
import Info from '@containers/Info';
import withWrapper from '@hoc/withWrapperSSG';

const Index = (props: any) => <Info {...props} />;
export const getServerSideProps = withWrapper({ callback: () => null });
Index.Layout = MainLayout;
export default Index;
