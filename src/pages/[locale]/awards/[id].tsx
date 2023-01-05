import { TYPE_ID } from '@/constants';
import { MainLayout } from '@components/compound';
import AwardLicensesDetail from '@containers/AwardLicenseDetail';
import withCommon from '@hoc/withCommon';
import { IGetService } from '@interfaces/home';
import { setBreadcrumb, setDetailAwardLicenses } from '@redux/common/slice';
import awardsServices from '@services/awards';
import { coverObj, getDataBreadcrumb, getDataMeta, redirectNotFound } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <AwardLicensesDetail {...props} />;

Index.Layout = MainLayout;
export default Index;

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { id } = context.params;

    const reqDataGetService: IGetService = {
      language: region.lang,
      countryCode: region.country,
    };

    const promises = [
      awardsServices.getDetailArticle({ ...reqDataGetService, type_id: TYPE_ID.ID_AWARDS }, id),
      awardsServices.getDetailPage(reqDataGetService),
    ];

    const response: any = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['article', 'detailPage'];

    const convertData = coverObj(ar, data);

    const isSuccessful = get(convertData['article'], 'isSuccessful') === 'true';
    if (!isSuccessful) return redirectNotFound();

    const metaData = getDataMeta(get(convertData['article'], 'article', {}));

    // config breadcrumb
    const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
    store.dispatch(
      setBreadcrumb([detailPage, getDataBreadcrumb(convertData['article'], 'article')]),
    );

    store.dispatch(setDetailAwardLicenses(convertData['article']));

    return {
      props: { metaData, options: { name: 'Awards' } },
    };
  },
});
