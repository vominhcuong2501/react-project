import { getConfigMethodologyOfApproachHTML } from '@redux/config/selecters';
import { useAppSelector } from '@redux/hooks';
import MethodologySlice from './MethodologySlice';

export function Methodology() {
  const configMethodologyOfApproachHTML = useAppSelector(getConfigMethodologyOfApproachHTML);

  return (
    <section className="ibc-methodology">
      <div className="ibc-container-content width_methodology">
        <div dangerouslySetInnerHTML={{ __html: configMethodologyOfApproachHTML }} />;
        <div className="ibc-methodology__slide">
          <MethodologySlice />
        </div>
      </div>
    </section>
  );
}
