import { GroupGetInTouch } from '@components/compound/GroupGetInTouch';
import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import HeadSEO from '@components/primitive/HeadSEO';
import { IServicesBannerProps } from '@interfaces/service-page';
import appStyle from '@scss/pages/industries/index.scss';
import Hero from './Hero';
import ServicesList from './ServicesList';

export default function Industries({ banner, metaInfo, listIndustries }: IServicesBannerProps) {
  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO title="oneibc homepage" {...metaInfo.page}></HeadSEO>
      <main className="ibc-service">
        <Hero banner={banner} />
        <ServicesList listServices={listIndustries} contentPage={metaInfo} />
        <GroupGetUpdate />
        <GroupGetInTouch />
      </main>
    </>
  );
}
