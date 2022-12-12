import { GroupGetInTouch } from '@components/compound/GroupGetInTouch';
import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import HeadSEO from '@components/primitive/HeadSEO';
import { IServicesBannerProps } from '@interfaces/service-page';
import appStyle from '@scss/pages/consulting-services-detail/index.scss';
import { get } from 'lodash';
import Hero from './Hero';
import ServicesList from './ServicesList';

export default function ConsultingServiceDetail({ banner, detailPage }: IServicesBannerProps) {
  // const listServicesStore: any = useAppSelector(selectServices);
  const { name }: any = get(detailPage, 'service', '');
  const articles: any = get(detailPage, 'articles', []);

  return (
    <>
      <style jsx>{appStyle}</style>
      <HeadSEO title="oneibc homepage" {...detailPage.service}></HeadSEO>
      <main className="ibc-service">
        <Hero banner={banner} />
        <ServicesList configFuture={detailPage} name={name} articles={articles} />
        <GroupGetUpdate />
        <GroupGetInTouch />
      </main>
    </>
  );
}
