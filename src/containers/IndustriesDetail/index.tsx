import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import { IServicesBannerProps } from '@interfaces/service-page';
import style from '@scss/components/group-get-In-touch.scss';
import appStyle from '@scss/pages/industries-detail/index.scss';
import { get } from 'lodash';
import IndustriesList from './ConsultingServicesList';
import Hero from './Hero';

export default function IndustriesDetail({ banner, detailPage }: IServicesBannerProps) {
  const { name }: any = get(detailPage, 'industry', '');
  return (
    <>
      <style jsx>{appStyle}</style>
      <style jsx>{style}</style>
      <main className="ibc-service">
        <Hero banner={banner} />
        <IndustriesList configFuture={detailPage} name={name} />
        <GroupGetUpdate />
      </main>
    </>
  );
}
