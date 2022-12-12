import { GroupGetInTouch } from '@components/compound/GroupGetInTouch';
import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import HeadSEO from '@components/primitive/HeadSEO';
import { IServicesBannerProps } from '@interfaces/service-page';
import appStyle from '@scss/pages/industries-detail/index.scss';
import { get } from 'lodash';
import IndustriesList from './ConsultingServicesList';
import Hero from './Hero';

export default function IndustriesDetail({ banner, detailPage }: IServicesBannerProps) {
  const { name }: any = get(detailPage, 'industry', '');
  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO title="oneibc homepage" {...detailPage.industry}></HeadSEO>
      <main className="ibc-service">
        <Hero banner={banner} />
        <IndustriesList configFuture={detailPage} name={name} />
        <GroupGetUpdate />
        <GroupGetInTouch />
      </main>
    </>
  );
}
