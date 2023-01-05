import Style from '@/scss/pages/make-an-enquire/index.scss';
import HeadSEO from '@components/primitive/HeadSEO';
import { IListMake } from '@interfaces/make-an-enquire';
import Banner from './Banner';
import { MakeAnEnquiryForm } from './MakeAnEnquiryForm';

export default function MakeAnEnquiry({ banner, configFuture, metaInfo }: IListMake) {
  return (
    <>
      <HeadSEO title="oneibc homepage" {...metaInfo.page}></HeadSEO>{' '}
      <main>
        <style jsx>{Style}</style>
        <Banner banner={banner} />
        <MakeAnEnquiryForm configFuture={configFuture} />
      </main>
    </>
  );
}
