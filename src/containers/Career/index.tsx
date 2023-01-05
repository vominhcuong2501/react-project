import careerStyle from '@/scss/pages/career/index.scss';
import AboutArticle from '@components/compound/layout/AboutUs/LearMoreAboutArticle';
import Pagination from '@components/primitive/Pagination';
import { useUrls } from '@hooks/useUrls';
import careerServices from '@services/carrer';
import { convertDate, convertTZ, queryList } from '@utils/helpers';
import { format } from 'date-fns';
import { get, isEmpty, map } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

export default function Career({ banner, configWhyJoinOne, listArticles }: any) {
  const [list, setListArticle] = useState(listArticles || []);

  const txtWhyJoinOne = get(configWhyJoinOne, 'config.content', '');
  const dataBanner = get(banner, 'banners', [])[0];
  const url = useUrls();
  const getTime = (time: string) => {
    const convertTime = convertTZ(convertDate(time), 'Singapore');
    return format(convertTime, "LLL dd, yyyy'");
  };
  const handlePageChange = async (page) => {
    const limitPage = queryList(9, page);
    const response = await careerServices.getLisArticlePaginate(limitPage);
    setListArticle(response);
  };
  const getTotalJob = () => txtWhyJoinOne.replace('||total||', list?.total || '');

  const handleArray = (item) =>
    map(item, (it, index) => (
      <span key={it.country_name}>
        {`${it.country_name}`} {Number(item.length) - 1 > +index && ', '}
      </span>
    ));

  return (
    <main>
      <style jsx>{careerStyle}</style>
      <section className="ibc-banner ibc-banner__center">
        <div className="ibc-banner__content">
          <a href="#">
            <img
              src={dataBanner?.bannerImage}
              alt={dataBanner?.bannerTitle}
              width="1920"
              height="380"
            />
          </a>
          <div className="ibc-banner__content__config">
            <h2>{dataBanner?.bannerTitle}</h2>
            <p>{dataBanner?.bannerContent}</p>
          </div>
        </div>
      </section>
      <section>
        <div className="ibc-container">
          <div className="ibc-container-content">
            <div dangerouslySetInnerHTML={{ __html: getTotalJob() }}></div>
            <div>
              <div className="ibc-career">
                {!isEmpty(get(list, 'careers', [])) && (
                  <div className="ibc-career__article">
                    <div className="row">
                      {map(list?.careers, (item) => (
                        <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                          <div className="ibc-career__article__item">
                            <h3>
                              <Link href={`${url}/${item.keyword}`}>
                                <a title={item.name} target="_self">
                                  {item.name}
                                </a>
                              </Link>
                            </h3>
                            <div className="d-flex align-items-center">
                              <h2>
                                <i className="fa-solid fa-clock"></i>
                                {getTime(item.career_closing_date)}
                              </h2>
                              <h3>
                                {item.office_location && (
                                  <i className="fa-solid fa-location-dot"></i>
                                )}

                                {get(item, 'office_location', []).length > 1 ? (
                                  handleArray(get(item, 'office_location'))
                                ) : (
                                  <>
                                    {item.office_location.map((it) => (
                                      <span key={it.country_name}>{it.country_name}</span>
                                    ))}
                                  </>
                                )}
                              </h3>
                            </div>
                            <p>{item.summary}</p>
                            <div className="ibc-career__article__item__icon">
                              <Link href={`${url}/${item.keyword}`}>
                                <a target="_self" title={item.name}>
                                  <img
                                    src="/images/icon-article-career.svg"
                                    width="44"
                                    height="44"
                                    alt="View detail"
                                  />
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="ibc-career__paginate">
                  {list?.total > 9 && (
                    <Pagination
                      itemsPerPage={9}
                      onPageChange={(page) => handlePageChange(page)}
                      totalPage={list.total}
                    />
                  )}
                </div>
                <section className="ibc-container-fluid__article">
                  <div className="ibc-container ibc-container">
                    <AboutArticle />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
