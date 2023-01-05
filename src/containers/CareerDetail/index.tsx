import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import appStyle from '@scss/pages/career-detail/index.scss';
import { convertDate, convertTZ, getConfig } from '@utils/helpers';
import { get, map } from 'lodash';
import Link from 'next/link';

import { DetailArticle, ICareerArticle } from '@interfaces/career';
import { ResponseConfig } from '@interfaces/common';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import CareerForm from './CareerForm';

interface DetailCareerProps {
  article: ICareerArticle;
  configOtherPosition: ResponseConfig;
  configOfficeLocation: ResponseConfig;
  getConfigClosingDate: ResponseConfig;
  configApplyNow: ResponseConfig;
}
export default function DetailCareer({
  article,
  configOtherPosition,
  configOfficeLocation,
  getConfigClosingDate,
  configApplyNow,
}: DetailCareerProps) {
  const [isShow, setIsShow] = useState(false);
  const [isDataIteme, setIsDataItem] = useState([]);
  const detailArticle: DetailArticle | any = get(article, 'article');
  const otherPosition = getConfig(configOtherPosition);
  const officeLocation = getConfig(configOfficeLocation);
  const closingDate = getConfig(getConfigClosingDate);
  const applyNow = getConfig(configApplyNow);
  const relate = get(article, 'relate', []);
  const getTime = (time: string) => {
    const convertTime = convertTZ(convertDate(time), 'Singapore');
    return format(convertTime, "LLL dd, yyyy'");
  };

  const handleArray = (item) =>
    map(item, (it, index) => (
      <strong key={it.country_name}>
        {`${' '}${it.country_name}`} {Number(item.length) - 1 > +index && ', '}
      </strong>
    ));
  useEffect(() => {
    if (!detailArticle) return;
    setIsDataItem(detailArticle.name);
  }, [isDataIteme]);
  return (
    <main>
      <style jsx>{appStyle}</style>
      <section className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-container-content__detail">
            <BreadcrumbsComponent />

            <div className="ibc-content-format">
              <div className="ibc-container-content__text">
                <div>
                  <h1 className="ibc-current-title">{detailArticle.name}</h1>
                  <div className="ibc-container-content__text__header">
                    <p>
                      {officeLocation}:
                      {get(detailArticle, 'office_location', []).length > 1 ? (
                        handleArray(get(detailArticle, 'office_location'))
                      ) : (
                        <>
                          {detailArticle.office_location.map((it) => (
                            <strong key={it.country_name}>{`${' '} ${it.country_name}`}</strong>
                          ))}
                        </>
                      )}
                    </p>
                    <p>
                      {closingDate}: <strong>{getTime(detailArticle.close_date)}</strong>
                    </p>
                  </div>
                </div>
                <div className="ibc-container-content__button">
                  <a href="#" onClick={() => setIsShow((x) => !x)}>
                    {applyNow}
                  </a>
                </div>
              </div>

              <div dangerouslySetInnerHTML={{ __html: detailArticle.content }}></div>
            </div>
            <div>
              <div className="ibc-career__other-position">
                <h2>{otherPosition}</h2>
                {map(relate, (item, index) => (
                  <div
                    className="ibc-career__other-position__item d-flex align-items-end justify-content-between"
                    key={`${index}`.toString()}
                  >
                    <div className="d-flex align-items-end justify-content-between">
                      <div>
                        <h3>
                          <Link href={`/career/${item.keyword}`}>
                            <a>{item.name}</a>
                          </Link>
                        </h3>
                        <p>
                          {officeLocation}:
                          {get(item, 'office_location', []).length > 1 ? (
                            handleArray(get(item, 'office_location'))
                          ) : (
                            <>
                              {item.office_location.map((it) => (
                                <strong key={it.country_name}>{`${' '}${it.country_name}`}</strong>
                              ))}
                            </>
                          )}
                        </p>
                      </div>
                      <p>
                        {closingDate}:<span>{getTime(item.career_closing_date)}</span>
                      </p>
                    </div>
                    <div className="ibc-career__other-position__btn">
                      <div className=" button_update">
                        <a target="_self" onClick={() => setIsShow((x) => !x)}>
                          {applyNow}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CareerForm isShow={isShow} onClose={() => setIsShow(false)} dataitem={isDataIteme as []} />
      </section>
    </main>
  );
}
