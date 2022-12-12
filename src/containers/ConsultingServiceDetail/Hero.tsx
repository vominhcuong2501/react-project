import { GroupButton } from '@components/compound';
import { useState } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IBannerServices {
  iss: string;
  iat: number;
  isSuccessful: string;
  banners: {
    bannerId: string;
    bannerLink: string;
    bannerImage: string;
    bannerTitle: string;
    bannerSubTitle: string;
    bannerContent: string;
  }[];
}

interface IHeroProps {
  banner: IBannerServices;
}

SwiperCore.use([Navigation, Autoplay]);
export default function Hero({ banner }: IHeroProps) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="ibc-hero-session">
      <div className="ibc-hero">
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
          {banner.banners?.map((item) => (
            <SwiperSlide key={item.bannerId}>
              <div className="ibc-hero__item">
                <img
                  src={item.bannerImage}
                  alt={item.bannerTitle}
                  title={item.bannerTitle}
                  width="1920"
                  height="780"
                />
                <div>
                  <h2>{item.bannerTitle}</h2>
                  <h3>{item.bannerSubTitle}</h3>
                  <div>
                    {item.bannerLink && (
                      <GroupButton
                        label={item.bannerTitle}
                        variant="danger"
                        size="medium"
                        className="ibc-hero__button"
                        href={item.bannerLink}
                      />
                    )}
                  </div>
                </div>
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
    </section>
  );
}
