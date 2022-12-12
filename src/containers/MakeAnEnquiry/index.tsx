import Style from '@/scss/pages/make-an-enquire/index.scss';
import { IListMake } from '@interfaces/make-an-enquire';
import Banner from './Banner';
import { MakeAnEnquiryForm } from './MakeAnEnquiryForm';

export default function MakeAnEnquiry({ banner, configFuture }: IListMake) {
  return (
    <main>
      <style jsx>{Style}</style>
      <Banner banner={banner} />
      <MakeAnEnquiryForm configFuture={configFuture} />
    </main>
  );
}
