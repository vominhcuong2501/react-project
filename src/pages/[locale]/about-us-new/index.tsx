import { MainLayout } from '@components/compound';
import AboutUS from '@containers/AboutUs';
import withCommon from '@hoc/withCommon';
import { IGetService } from '@interfaces/home';
import {
  setAwardConfig,
  setAwards,
  setBreadcrumb,
  setConfigLearMoreAbout,
  setConfigOurTeam,
  setListArticleAboutUs,
} from '@redux/common/slice';
import aboutServices from '@services/aboutUs';
import { coverObj, getDataBreadcrumb, getDataMeta } from '@utils/helpers';
import { get } from 'lodash';

const Index = (props: any) => <AboutUS {...props} />;

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
      aboutServices.getPageDetail(reqDataGetService),
      aboutServices.getBanner({ reqDataGetService, controller: 'about-us' }),
      aboutServices.getAward(reqDataGetService),
      aboutServices.getLicenses(reqDataGetService),
      aboutServices.getListArticleAboutUs(reqDataGetService),

      aboutServices.getConfigLearMoreAbout(reqDataGetService),
      aboutServices.getConfigOurVision(reqDataGetService),
      aboutServices.getConfigAward(reqDataGetService),
      aboutServices.getConfigLicenses(reqDataGetService),
      aboutServices.getConfigOurTeam(reqDataGetService),
    ];

    const response = await Promise.allSettled(promises);
    const data = await response.map((item) =>
      item.status === 'fulfilled' ? item.value ?? [] : null,
    );

    const ar = [
      'aboutUs',
      'banner',
      'listAwards',
      'licenses',
      'listArticleAboutUs',
      'configLearMoreAbout',
      'configOurVision',
      'configAward',
      'configLicenses',
      'configOurTeam',
    ];

    const convertData = coverObj(ar, data);

    const metaData = getDataMeta(get(convertData['aboutUs'], 'page', {}));

    store.dispatch(setAwards(convertData['listAwards']));
    store.dispatch(setAwardConfig(convertData['configAward']));
    store.dispatch(setListArticleAboutUs(convertData['listArticleAboutUs']));
    store.dispatch(setConfigLearMoreAbout(convertData['configLearMoreAbout']));
    store.dispatch(setConfigOurTeam(convertData['configOurTeam']));
    store.dispatch(setBreadcrumb([getDataBreadcrumb(convertData['aboutUs'], 'page')]));

    return {
      props: { ...convertData, metaData },
    };
  },
});
