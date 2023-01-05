import appStyle from '@/scss/pages/home/index.scss';
import { GroupGetInTouch } from '@components/compound/GroupGetInTouch';
import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import OurDifferenceAndValues from '@components/compound/OurDifferenceAndValues';
import HeadSEO from '@components/primitive/HeadSEO';
import {
  ConfigTXT,
  InfoPage,
  ResponseBanner,
  ResponseConfig,
  ResponseListInsight,
} from '@interfaces/index';
import { getConfig } from '@utils/helpers';
import button from '../../scss/components/custom-button-expand.scss';

import { Consulting } from './Consulting';
import { Hero } from './Hero';
import { Intelligence } from './Intelligence';
import { Methodology } from './Methodology';
import { Trending } from './Trending';

interface HomePageProps {
  banner: ResponseBanner;
  listInsight: ResponseListInsight;
  intelligenceNetwork: ResponseConfig;
  infoPage: InfoPage;
  txtConsultingName: ConfigTXT;
}

export default function HomePage(props: HomePageProps) {
  const { banner, listInsight, intelligenceNetwork, infoPage, txtConsultingName } = props;
  return (
    <>
      {infoPage && <HeadSEO {...infoPage.page}></HeadSEO>}
      <main>
        <style jsx>{button}</style>
        <style jsx>{appStyle}</style>
        {banner && <Hero bannerList={banner} />}
        {listInsight && <Trending listInsight={listInsight} />}
        {intelligenceNetwork && <Intelligence intelligenceNetwork={intelligenceNetwork} />}
        <Consulting configName={getConfig(txtConsultingName)} />
        <OurDifferenceAndValues />
        <Methodology />
        <GroupGetUpdate />
        <GroupGetInTouch />
      </main>
    </>
  );
}
