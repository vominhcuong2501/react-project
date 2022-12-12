import { getStaticPathsConfig } from '@/constants/config';
import { MainLayout } from '@components/compound';
import AboutUS from '@containers/AboutUs';
import withIncrementalStaticRegeneration from '@hoc/withWrapperSSR';

const Index = (props: any) => <AboutUS {...props} />;

Index.Layout = MainLayout;
export default Index;

export const getStaticPaths = getStaticPathsConfig;

export const getStaticProps = withIncrementalStaticRegeneration({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async () => ({
    props: {},
  }),
});
