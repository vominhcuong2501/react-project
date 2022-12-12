import { ResponseConfig } from '@interfaces/index';
import { get } from 'lodash';
import MethodologySlice from './MethodologySlice';

interface MethodologyProps {
  appRoach: ResponseConfig;
  appRoachJS: any;
}

export function Methodology({ appRoach, appRoachJS }: MethodologyProps) {
  const headerData = get(appRoach, 'config.content', '');
  const dataSlide = JSON.parse(get(appRoachJS, 'config.content', []));

  return (
    <section className="ibc-methodology">
      <div className="ibc-container-content width_methodology">
        <div dangerouslySetInnerHTML={{ __html: headerData }} />;
        <div className="ibc-methodology__slide">
          <MethodologySlice data={dataSlide} />
        </div>
      </div>
    </section>
  );
}
