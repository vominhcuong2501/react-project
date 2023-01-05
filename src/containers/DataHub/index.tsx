import NextLink from '@components/primitive/Link';
import { useUrls } from '@hooks/useUrls';
import { IDataHubContainer } from '@interfaces/data-hub';
import dataHubStyle from '@scss/pages/data-hub/index.scss';
import IconDownload from '@svg/icon-data-hub-download.svg';
import { get, map } from 'lodash';
import Link from 'next/link';

interface DataHubContainerProps {
  listDataHub: IDataHubContainer;
}
export default function DataHubContainer({ listDataHub }: DataHubContainerProps) {
  const listOrigin = get(listDataHub, 'data-hub');
  const pathRoot = useUrls();

  const CustomLink = ({ dataType, index }: any) => (
    <Link href={`${pathRoot}/${dataType.type_keyword}`}>
      <a title={dataType.type_name} target="_self">
        {`${index + 1}`}. {dataType.type_name}
      </a>
    </Link>
  );

  return (
    <>
      <style jsx>{dataHubStyle}</style>
      <ul className="ibc-container-content">
        {map(listOrigin, (dataType, index) => (
          <li key={`${index}`.toString()}>
            {dataType.data?.length > 0 && (
              <div className="ibc-data-hub__title">
                <div>
                  {+index === 0 ? (
                    <h1>
                      <CustomLink dataType={dataType} index={index} />
                    </h1>
                  ) : (
                    <h2>
                      <CustomLink dataType={dataType} index={index} />
                    </h2>
                  )}
                </div>
              </div>
            )}

            {map(dataType.data, (item, idx) => (
              <div
                className="ibc-data-hub d-flex justify-content-between"
                key={`${idx}`.toString()}
              >
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
                    <img src={item.qr_code} alt={item.name} width="200" height="200" />
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
        ))}
      </ul>
    </>
  );
}
