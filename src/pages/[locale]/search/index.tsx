import { MainLayout } from '@components/compound';
import Search from '@containers/Search';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import searchServices from '@services/searchGoogle';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <Search {...props} />;

Index.Layout = MainLayout;
export default Index;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const locale = {
      language: region.lang,
      locationCode: region.country,
    };

    const promises = [searchServices.getMetaData(locale)];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['detailMeta'];

    const convertData = coverObj(ar, data);

    const metaData = getDataMeta(get(convertData['detailMeta'], 'page', {}));

    store.dispatch(setBreadcrumb([getDataBreadcrumb(convertData['detailMeta'], 'page')]));

    return {
      props: { ...convertData, metaData },
    };
  },
});
