import AboutLayout from '@components/compound/layout/AboutUs';
import AboutUsDetail from '@containers/AboutUsDetail';
import withCommon from '@hoc/withCommon';
import { IGetBanner, IGetService } from '@interfaces/home';
import {
  setBreadcrumb,
  setConfigLearMoreAbout,
  setConfigOurTeam,
  setListArticleAboutUs,
} from '@redux/common/slice';
import aboutServices from '@services/aboutUs';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = ({ ...props }: any) => <AboutUsDetail {...props} />;

Index.Layout = AboutLayout;
export default Index;

/**
 *
 * @returns return 404 page
 */
const redirectNotFound = () => ({
  redirect: {
    destination: '/notfound',
  },
});

export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, context, region) => {
    const { id } = context.params;
    const reqDataGetService: IGetService = {
      language: region.lang,
      countryCode: region.country,
    };

    const reqDataGetBanner: IGetBanner = {
      controller: 'about-us',
      ...region,
    };

    const promises = [
      aboutServices.getArticle({ ...reqDataGetService, type_id: '2' }, id),
      aboutServices.getListArticleAboutUs(reqDataGetService),
      aboutServices.getConfigOurTeam(reqDataGetService),
      aboutServices.getBanner(reqDataGetBanner),
      aboutServices.getConfigLearMoreAbout(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = ['article', 'listArticleAboutUs', 'configOurTeam', 'banner', 'configLearMoreAbout'];

    const convertData = coverObj(ar, data);

    const isValidate = get(convertData['article'], 'isSuccessful', 'false') === 'false';
    if (isValidate) return redirectNotFound();
    const metaData = getDataMeta(get(convertData['article'], 'article', {}));
    // const content = convertData['article'];

    const detailType = getDataBreadcrumb(convertData['article'], 'article.type');

    store.dispatch(setListArticleAboutUs(convertData['listArticleAboutUs']));
    store.dispatch(setConfigOurTeam(convertData['configOurTeam']));
    store.dispatch(setConfigLearMoreAbout(convertData['configLearMoreAbout']));

    store.dispatch(
      setBreadcrumb([detailType, getDataBreadcrumb(convertData['article'], 'article')]),
    );

    return {
      props: {
        ...convertData,
        metaData,
      },
    };
  },
});
