import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper';

import NextLink from '@components/primitive/Link';
import { useDisplay } from '@hooks/useDisplay';
import { chunk, get, map } from 'lodash';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function AwardSection({ licenses, config }: any) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const listLicensesMobile = chunk(licenses.articles, 2);
  const isMobile = useDisplay(576);
  return (
    <section>
      <div className="ibc-about-us__licenses">
        <div className="ibc-about-us__licenses__content">
          <div className="ibc-about-us__licenses__content__title">
            <div dangerouslySetInnerHTML={{ __html: config }}></div>
            <div ref={(node) => setPrevEl(node)} className="ibc-arrow--prev">
              <i className="fa-light fa-arrow-left-long"></i>
            </div>
            <div ref={(node) => setNextEl(node)} className="ibc-arrow--next">
              <i className="fa-light fa-arrow-right-long"></i>
            </div>
          </div>
          <div className="ibc-about-us__licenses__content__slider">
            {isMobile ? (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                navigation={{ prevEl, nextEl }}
                loopedSlides={5}
                effect="cube"
                grabCursor
                autoHeight={false}
                scrollbar={{ draggable: true }}
                pagination={{
                  el: '.slider__pagination',
                  clickable: true,
                }}
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                }}
              >
                {map(listLicensesMobile, (itemMobile, index) => (
                  <SwiperSlide key={index}>
                    {map(itemMobile, (item: any) => (
                      <div>
                        <NextLink
                          href={`/licenses/${item.keyword}`}
                          title={item.name}
                          target="_self"
                        >
                          <img
                            src={item.icon}
                            width="342"
                            height="342"
                            alt={item.name}
                            title={item.name}
                          />
                        </NextLink>
                        <h3>
                          <Link href={`/licenses/${item.keyword}`}>
                            <a
                              title={item.name}
                              target="_self"
                              dangerouslySetInnerHTML={{ __html: item.name }}
                            />
                          </Link>
                        </h3>
                      </div>
                    ))}
                  </SwiperSlide>
                ))}
                <div className="slider__pagination"></div>
              </Swiper>
            ) : (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                navigation={{ prevEl, nextEl }}
                loopedSlides={5}
                effect="cube"
                grabCursor
                autoHeight={false}
                scrollbar={{ draggable: true }}
                pagination={{
                  el: '.slider__pagination',
                  clickable: true,
                }}
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                }}
              >
                {map(get(licenses, 'articles', null), (item) => (
                  <SwiperSlide key={item.id}>
                    <div>
                      <NextLink href={`/licenses/${item.keyword}`} title={item.name} target="_self">
                        <img
                          src={item.icon}
                          width="342"
                          height="342"
                          alt={item.name}
                          title={item.name}
                        />
                      </NextLink>
                      <h3>
                        <Link href={`/licenses/${item.keyword}`}>
                          <a
                            title={item.name}
                            target="_self"
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </Link>
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="slider__pagination"></div>
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
