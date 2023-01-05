import { NextImage } from '@components/primitive';
import NextLink from '@components/primitive/Link';
import { useUrls } from '@hooks/useUrls';
import { IDetailTypeDataHub, ITypeDataHub } from '@interfaces/data-hub';
import dataHubStyle from '@scss/pages/data-hub/index.scss';
import IconDownload from '@svg/icon-data-hub-download.svg';
import { get, map } from 'lodash';
import Link from 'next/link';

interface DataHubDetailTypeProps {
  detailType: IDetailTypeDataHub;
}
export default function DataHubDetailType({ detailType }: DataHubDetailTypeProps) {
  const getDetailType: ITypeDataHub | any = get(detailType, 'type', {});
  const getDataType = get(detailType, 'data', []);
  const pathRoot = useUrls('id');
  return (
    <>
      <style jsx>{dataHubStyle}</style>
      <ul className="ibc-container-content">
        <li>
          <div className="ibc-data-hub__title">
            <div>
              <h1>{getDetailType.name}</h1>
            </div>
          </div>

          {map(getDataType, (item, idx) => (
            <div className="ibc-data-hub d-flex justify-content-between" key={`${idx}`.toString()}>
              <div className="ibc-data-hub__content">
                <div className="d-flex align-items-center">
                  <img src={item.country_icon} alt={item.name} width="32" height="24" />
                  <h3>{item.country}</h3>
                </div>
                <div>
                  <h2>
                    <NextLink
                      href={`${pathRoot}/${item.keyword}`}
                      title={item.name}
                      label={item.name}
                    />
                  </h2>
                  <p>{item.summary}</p>
                </div>
                <div className="ibc-data-hub__btn">
                  <div className=" button_update">
                    <div className="ibc-btn-wrapper">
                      <Link href={`${pathRoot}/${item.keyword}`}>
                        <a
                          className="ibc-custom-btn ibc-custom-btn--no-circle"
                          id="ibc-btn-join-our-team"
                        >
                          <i className="fa-solid fa-down-to-line"></i>
                          <span className="jsx-1480180584">Download</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ibc-data-hub__img d-flex align-items-center">
                <NextLink href={`${pathRoot}/${item.keyword}`} title={item.name}>
                  <NextImage
                    title={item.name}
                    src={item.qr_code}
                    alt={item.name}
                    width="200"
                    height="200"
                    className="ibc-data-hub__qr-img"
                  />
                </NextLink>

                <div className="ibc-btn-mobile-download">
                  <div>
                    <Link href={`${pathRoot}/${item.keyword}`}>
                      <a>
                        <IconDownload />
                        <span>Download</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
