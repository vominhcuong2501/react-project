import { MainLayout } from '@components/compound';
import AwardLicenses from '@containers/AwardLicenses';
import withCommon from '@hoc/withCommon';
import { IGetService } from '@interfaces/home';
import { setBreadcrumb } from '@redux/common/slice';
import licensesServices from '@services/licenses';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <AwardLicenses {...props} />;

Index.Layout = MainLayout;
export default Index;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const reqDataGetService: IGetService = {
      language: region.lang,
      countryCode: region.country,
    };

    const promises = [
      licensesServices.getListLicenses(reqDataGetService),
      licensesServices.getDetailPage(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['listArticle', 'detailPage'];

    const convertData = coverObj(ar, data);

    const metaData = getDataMeta(get(convertData['detailPage'], 'page', {}));
    const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
    store.dispatch(setBreadcrumb([detailPage]));

    return {
      props: { ...convertData, metaData, options: { name: 'Licenses' } },
    };
  },
});
