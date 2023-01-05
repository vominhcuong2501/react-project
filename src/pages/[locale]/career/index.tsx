import { TYPE_ID } from '@/constants';
import { MainLayout } from '@components/compound';
import Career from '@containers/Career';
import withCommon from '@hoc/withCommon';
import { IGetBanner } from '@interfaces/home';
import {
  setConfigLearMoreAbout,
  setConfigOurTeam,
  setListArticleAboutUs,
} from '@redux/common/slice';
import aboutServices from '@services/aboutUs';
import careerServices from '@services/carrer';
import { coverObj, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <Career {...props} />;

const queryList = (limit, page) => ({
  limit,
  page,
});

Index.Layout = MainLayout;
export default Index;
export const getServerSideProps = withCommon({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: async (store, _, region) => {
    const reqDataGetBanner: IGetBanner = {
      controller: 'career',
      ...region,
    };

    const reqDataGetService: any = {
      language: region.lang,
      locationCode: region.country,
    };

    const promises = [
      careerServices.getBanner(reqDataGetBanner),
      careerServices.getMetaData(reqDataGetService),
      careerServices.getConfigWhyJoinOne(reqDataGetService),
      careerServices.getListArticles(queryList(9, 1)),
      careerServices.getListTypeArticle(reqDataGetService, TYPE_ID.ID_ABOUT_US),
      careerServices.getConfigLearnAbout(reqDataGetService),

      aboutServices.getListArticleAboutUs(reqDataGetService),
      aboutServices.getConfigOurTeam(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'banner',
      'metaData',
      'configWhyJoinOne',
      'listArticles',
      'listArticleType',
      'configLearnAbout',
      'listArticleAboutUs',
      'configOurTeam',
    ];

    const convertData = coverObj(ar, data);
    const metaData = getDataMeta(get(convertData['metaData'], 'page', {}));
    store.dispatch(setConfigLearMoreAbout(convertData['configLearnAbout']));
    store.dispatch(setListArticleAboutUs(convertData['listArticleAboutUs']));
    store.dispatch(setConfigOurTeam(convertData['configOurTeam']));

    return {
      props: { ...convertData, metaData },
    };
  },
});
