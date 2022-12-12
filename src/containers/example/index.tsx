import Style from '@/scss/pages/example/index.scss';
import { GroupGetInTouch } from '@components/compound/GroupGetInTouch';
import { GroupGetUpdate } from '@components/compound/GroupGetUpdate';
import DetailServices from './DetailServices';

export default function ContactUS() {
  return (
    <main>
      <style jsx>{Style}</style>
      {/* <Hero banner={JSON_Banner} /> */}
      <DetailServices />
      <GroupGetUpdate />
      <GroupGetInTouch />
    </main>
  );
}
