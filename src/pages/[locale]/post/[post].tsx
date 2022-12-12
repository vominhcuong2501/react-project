import { MainLayout } from '@components/compound';
import withWrapper from '@hoc/withWrapperSSG';

export default function PostDetail() {
  return (
    <div>
      <ul>
        <li>Detail</li>
      </ul>
    </div>
  );
}

PostDetail.Layout = MainLayout;
export const getServerSideProps = withWrapper({ callback: () => null });
