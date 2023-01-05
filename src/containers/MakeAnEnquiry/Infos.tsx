import { IListCofig } from '@interfaces/make-an-enquire';
import styles from '@scss/pages/make-an-enquire/info.scss?type=scoped';
import ReactLogo from '@svg/successful.svg';
import { get } from 'lodash';

interface ServicesListProps {
  configFuture: IListCofig;
}
export default function Infos({ configFuture }: ServicesListProps) {
  const configFutureData = get(configFuture, 'config', null);

  return (
    <>
      <style jsx>{styles}</style>
      <div className="ibc-info-us">
        <ul>
          {configFutureData.content.split(' || ').map((item) => (
            <li key={item}>
              <div className="ibc-info-us_item">
                <div className="ibc-info-us_item_text">
                  <div className="ibc-info-us_item_text_icon">
                    <ReactLogo></ReactLogo>
                  </div>
                  <h5>{item}</h5>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
