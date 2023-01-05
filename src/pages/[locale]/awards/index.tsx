import { MainLayout } from '@components/compound';
import AwardsLicensesContainer from '@containers/AwardLicenses';
import withCommon from '@hoc/withCommon';
import { IGetService } from '@interfaces/home';
import { setBreadcrumb } from '@redux/common/slice';
import awardsServices from '@services/awards';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <AwardsLicensesContainer {...props} />;

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
      awardsServices.getListAwards(reqDataGetService),
      awardsServices.getDetailPage(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['listArticle', 'detailPage'];

    const convertData = coverObj(ar, data);

    const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');

    store.dispatch(setBreadcrumb([detailPage]));

    const metaData = getDataMeta(get(convertData['detailPage'], 'page', {}));

    return {
      props: { ...convertData, metaData, options: { name: 'Awards' } },
    };
  },
});
