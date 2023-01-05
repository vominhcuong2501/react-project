import { ResponseBanner } from '@interfaces/index';
import Account from '@svg/hero-circle.svg';
import { map } from 'lodash';
import { useState } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Autoplay]);

interface HeroProps {
  bannerList: ResponseBanner;
}
export function Hero({ bannerList }: HeroProps) {
  const dataBanner = bannerList ? bannerList.banners : [];
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="ibc-hero">
      <div className="ibc-hero__content">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides
          loop
          navigation={{ prevEl, nextEl }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
        >
          {map(dataBanner, (item) => (
            <SwiperSlide key={item.bannerId}>
              <div className="ibc-hero__item">
                <img
                  src={item.bannerImage}
                  alt={item.bannerTitle}
                  title={item.bannerTitle}
                  width="1920"
                  height="780"
                />
                <div dangerouslySetInnerHTML={{ __html: item.bannerContent }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="ibc-hero__controls-slide">
          <div ref={(node) => setPrevEl(node)} className="ibc-hero--prev">
            <i className="fa-light fa-arrow-left-long"></i>
          </div>
          <div ref={(node) => setNextEl(node)} className="ibc-hero--next">
            <i className="fa-light fa-arrow-right-long"></i>
          </div>
        </div>
      </div>
      <div className="ibc-hero__scroll"></div>
      <div className="ibc-hero__circle">
        <Account />
      </div>
    </section>
  );
}
