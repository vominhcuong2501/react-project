import { get } from 'lodash';

import JoinOurTeam from '@components/compound/layout/AboutUs/JoinOurTeam';
import LearnMoreAboutArticle from '@components/compound/layout/AboutUs/LearMoreAboutArticle';
import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import useClickID from '@hooks/useClickId';
import appStyle from '@scss/pages/about-us/index.scss';
import { getConfig } from '@utils/helpers';
import 'swiper/css';
import 'swiper/css/pagination';
import AwardSection from './Award';
import Hero from './Hero';
import LicensesSection from './Licenses';

interface AboutUSProps {
  aboutUs: any;
  licenses: any;
  configLicenses: string;
  banner: {};
}

export default function AboutUS({ aboutUs, licenses, configLicenses, banner }: AboutUSProps) {
  const dataBanner = get(banner, 'banners', []);
  useClickID('ibc-btn-our-vision', '/consulting-services');

  return (
    <main>
      <style jsx>{appStyle}</style>
      <Hero banner={dataBanner} />

      <section>
        <div className="ibc-container-content ibc-about-breadcrumb" style={{ marginTop: '20px' }}>
          <BreadcrumbsComponent />
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: get(aboutUs, 'page.content', '') }}></div>

      <AwardSection />
      <LicensesSection config={getConfig(configLicenses)} licenses={licenses} />

      <LearnMoreAboutArticle />
      <JoinOurTeam />
    </main>
  );
}
