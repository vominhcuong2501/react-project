import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Autoplay]);
export default function GroupSwipper({ data }: any) {
  return (
    <Swiper
      spaceBetween={16}
      loopedSlides={5}
      effect="cube"
      grabCursor
      autoHeight={false}
      slidesPerView={5}
      scrollbar={{ draggable: true }}
      breakpoints={{
        200: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        420: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        592: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 16,
        },

        1450: {
          slidesPerView: 5,
          spaceBetween: 16,
        },
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="ibc-methodology__slide_item ">
            <div className="ibc-methodology__slide_item_number">{item.number}</div>
            <div className="ibc-methodology__slide_item_text  ">
              <a href="/" className=" ">
                {item.title}
              </a>
              <p className="ibc-methodology__slide_item_text_desc">{item.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
