import { MainLayout } from '@components/compound';
import Career from '@containers/Career';
import withWrapper from '@hoc/withWrapperSSG';

const Index = (props: any) => <Career {...props} />;

Index.Layout = MainLayout;
export default Index;
export const getServerSideProps = withWrapper({ callback: () => null });
