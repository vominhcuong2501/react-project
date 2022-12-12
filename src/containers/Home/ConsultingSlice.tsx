import Arrow from '@components/primitive/Arrow';
import Link from 'next/link';
import { useState } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Autoplay]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GroupSwipper({ listService }: any) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Swiper
        spaceBetween={16}
        loopedSlides={5}
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
        {listService?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/consulting-services/${item.keyword}`} title={item.name} target="_self">
              <div>
                <img src={item.icon} width="371" height="280" alt={item.name} title={item.name} />

                <div className="ibc-consulting__description">
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={(node) => setPrevEl(node)} className="ibc-arrow--prev">
        <Arrow></Arrow>
      </div>
      <div ref={(node) => setNextEl(node)} className="ibc-arrow--next">
        <Arrow></Arrow>
      </div>
    </>
  );
}
