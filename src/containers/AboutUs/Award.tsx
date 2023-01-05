import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper';

import NextLink from '@components/primitive/Link';
import { useDisplay } from '@hooks/useDisplay';
import { getAwards, getAwardsConfig } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import { getConfig } from '@utils/helpers';
import { chunk, get, map } from 'lodash';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function AwardSection() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const listAwards = get(useAppSelector(getAwards), 'articles', []);
  const configAward = getConfig(useAppSelector(getAwardsConfig));
  const listAwardsMobile = chunk(listAwards, 2);
  const isMobile = useDisplay(576);
  return (
    <section>
      <div className="ibc-about-us__award">
        <div className="ibc-about-us__award__content">
          <div
            className="ibc-about-us__award__content__title"
            dangerouslySetInnerHTML={{ __html: configAward }}
          />
          <div className="ibc-about-us__award__content__slider">
            <div className="ibc-about-us__award__slide-swapper">
              {isMobile ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Pagination, Navigation]}
                  navigation={{ prevEl, nextEl }}
                  pagination={{
                    el: '.slider__pagination',
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    576: {
                      slidesPerView: 1,
                    },
                    992: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {map(listAwardsMobile, (itemMobile, index) => (
                    <SwiperSlide key={index}>
                      {map(itemMobile, (item) => (
                        <div key={item.id}>
                          <NextLink
                            href={`/awards/${item.keyword}`}
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
                            <Link href={`/awards/${item.keyword}`}>
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
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Pagination, Navigation]}
                  navigation={{ prevEl, nextEl }}
                  pagination={{
                    el: '.slider__pagination',
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    576: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {map(listAwards, (item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <NextLink href={`/awards/${item.keyword}`} title={item.name} target="_self">
                          <img
                            src={item.icon}
                            width="342"
                            height="342"
                            alt={item.name}
                            title={item.name}
                          />
                        </NextLink>
                        <h3>
                          <Link href={`/awards/${item.keyword}`}>
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

            <div ref={(node) => setPrevEl(node)} className="ibc-arrow--prev">
              <i className="fa-light fa-arrow-left-long"></i>
            </div>
            <div ref={(node) => setNextEl(node)} className="ibc-arrow--next">
              <i className="fa-light fa-arrow-right-long"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
