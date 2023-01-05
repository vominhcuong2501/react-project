import { TYPE_ID } from '@/constants';
import { MainLayout } from '@components/compound';
import Info from '@containers/Info';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import infoServices from '@services/info';
import { coverObj, getDataBreadcrumb, redirectNotFound } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <Info {...props} />;
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { locale: 'en-gx', id: '1' } }],
//     fallback: true,
//   };
// }
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { id } = context.params;
    const reqDataGetArticle = {
      type_id: TYPE_ID.ID_INFO,
      ...region,
    };
    const promises = [infoServices.getDetailArticle(reqDataGetArticle, id)];
    const response: any = await Promise.allSettled(promises);

    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const breadcrumb = '/name/link';
    store.dispatch(setBreadcrumb(breadcrumb));

    const ar = ['contentData'];

    const convertData = coverObj(ar, data);
    const isSuccessful = get(convertData['contentData'], 'isSuccessful') === 'true';
    if (!isSuccessful) return redirectNotFound();

    // config breadcrumb
    const detailPage = getDataBreadcrumb(convertData['contentData'], 'article');
    store.dispatch(setBreadcrumb([detailPage]));

    return {
      props: { ...convertData },
    };
  },
});
Index.Layout = MainLayout;
export default Index;
