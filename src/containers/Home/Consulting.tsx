import { NextImage } from '@components/primitive';
import Expand from '@components/primitive/Expand';
import NextLink from '@components/primitive/Link';
import { selectServices } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import { map } from 'lodash';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export function Consulting({ configName }: any) {
  const listServicesStore: any = useAppSelector(selectServices);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  if (listServicesStore) {
    return (
      <section className="ibc-container">
        <h2 dangerouslySetInnerHTML={{ __html: configName }}></h2>
        <div className="ibc-consulting-new">
          <div className="ibc-consulting-new__content">
            <div className="ibc-consulting-new__swapper">
              <Swiper
                spaceBetween={16}
                loopedSlides={10}
                effect="cube"
                grabCursor
                autoHeight={false}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                loop
                navigation={{ prevEl, nextEl }}
                centeredSlides
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {map(listServicesStore.services, (item) => (
                  <SwiperSlide key={item.id}>
                    <div>
                      <NextLink href={`/consulting-services/${item.keyword}`}>
                        <NextImage
                          src={item.icon_mobile}
                          width="371"
                          height="280"
                          alt={item.name}
                          title={item.name}
                        />
                      </NextLink>

                      <div className="ibc-consulting__description">
                        <h3>{item.name}</h3>
                        <p>{item.summary}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div ref={(node) => setPrevEl(node)} className="ibc-arrow--prev">
            <Expand link="/" />
          </div>
          <div ref={(node) => setNextEl(node)} className="ibc-arrow--next">
            <Expand link="/" />
          </div>
        </div>
      </section>
    );
  }
}
