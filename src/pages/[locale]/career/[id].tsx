import { MainLayout } from '@components/compound';
import DetailCareer from '@containers/CareerDetail';
import withCommon from '@hoc/withCommon';
import { setBreadcrumb } from '@redux/common/slice';
import careerServices from '@services/carrer';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <DetailCareer {...props} />;

/**
 *
 * @returns return 404 page
 */
const redirectNotFound = () => ({
  redirect: {
    destination: '/notfound',
  },
});
Index.Layout = MainLayout;
export default Index;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { id } = context.params;
    const reqDataGetService: any = {
      language: region.lang,
      locationCode: region.country,
    };

    const promises = [
      careerServices.getArticle(reqDataGetService, id),
      careerServices.getConfigOtherPosition(reqDataGetService),
      careerServices.getConfigOfficeLocation(reqDataGetService),
      careerServices.getConfigClosingDate(reqDataGetService),
      careerServices.getConfigApplyNow(reqDataGetService),
      careerServices.getMetaData(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'article',
      'configOtherPosition',
      'configOfficeLocation',
      'getConfigClosingDate',
      'configApplyNow',
      'detailPage',
    ];

    const convertData = coverObj(ar, data);

    const isValidate = get(convertData['article'], 'isSuccessful', 'false') === 'false';
    if (isValidate) return redirectNotFound();

    const detailType = getDataBreadcrumb(convertData['article'], 'article');
    const detailPage = getDataBreadcrumb(convertData['detailPage'], 'page');
    store.dispatch(setBreadcrumb([detailPage, detailType]));
    const metaData = getDataMeta(get(convertData['article'], 'article', {}));

    return {
      props: { ...convertData, metaData },
    };
  },
});
