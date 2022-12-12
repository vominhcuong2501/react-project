import Button from '@/components/primitive/Button';
import mainStyle from '@/scss/components/group-button.scss';
import { useDisplay } from '@hooks/index';
import Arrow from '@svg/arrow-right.svg';
import ArrowRightSmall from '@svg/arrow-small.svg';

export default function GroupButton(props) {
  const isMobile = useDisplay();

  return (
    <>
      <style jsx>{mainStyle}</style>

      <div className="ibc-btn-group">
        <Button {...props} />

        <div className="ibc-btn-group__expand">
          <div className="ibc-btn-group__arrow">{isMobile ? <ArrowRightSmall /> : <Arrow />}</div>
          <span className="ibc-btn-group__text"></span>
        </div>
      </div>
    </>
  );
}
