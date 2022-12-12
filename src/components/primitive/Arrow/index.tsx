import style from '@/scss/components/arrow.scss?type=scoped';
import { useDisplay } from '@hooks/index';
import ArrowRightLarge from '@svg/arrow-right-large.svg';
import ArrowRightSmall from '@svg/arrow-small.svg';

export default function Arrow() {
  const isMobile = useDisplay();
  return (
    <>
      <style jsx>{style}</style>

      <div className="ibc-arrow">
        <div className="ibc-arrow__svg">{isMobile ? <ArrowRightSmall /> : <ArrowRightLarge />}</div>
      </div>
    </>
  );
}
