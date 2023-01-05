import { MainLayout } from '@components/compound';
import Info from '@containers/Info';
import withCommon from '@hoc/withCommon';

const Index = (props: any) => <Info {...props} />;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { res } = context;
    res.setHeader('Location', '/notfound');
    res.statusCode = 301;

    return { props: {} };
  },
});
Index.Layout = MainLayout;
export default Index;
