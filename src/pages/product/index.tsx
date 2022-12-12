import { MainLayout } from '@components/compound';
import withIncrementalStaticRegeneration from '@hoc/withWrapperSSR';

export default function Product() {
  return (
    <div>
      <h1>Product</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

Product.Layout = MainLayout;

export const getStaticProps = withIncrementalStaticRegeneration({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async () => ({
    props: {},
  }),
});
