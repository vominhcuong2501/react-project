import { getConfigMethodologyOfApproachJSON } from '@redux/config/selecters';
import { useAppSelector } from '@redux/hooks';
import { map } from 'lodash';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Autoplay, Pagination, A11y]);
export default function GroupSwipper() {
  const configMethodologyOfApproachJSON =
    useAppSelector(getConfigMethodologyOfApproachJSON) || null;
  const methodologyOfApproachJSON =
    configMethodologyOfApproachJSON && JSON.parse(configMethodologyOfApproachJSON);
  return (
    <>
      <Swiper
        spaceBetween={16}
        loopedSlides={5}
        effect="cube"
        grabCursor
        autoHeight={false}
        centeredSlides
        slidesPerView={2}
        pagination={{
          // el: '.slider__pagination',
          // clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 400,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 2,
          },
          1450: {
            slidesPerView: 2,
          },
        }}
      >
        {map(methodologyOfApproachJSON, (item) => (
          <SwiperSlide key={item.id}>
            <div className="ibc-methodology__slide_item_news ">
              <div className="ibc-methodology__slide_item_news_box_number">
                <div className="ibc-methodology__slide_item_news_box_number_number">
                  {item.number}
                </div>
              </div>
              <div className="ibc-methodology__slide_item_news_box_text">
                <span className=" ">{item.title}</span>
                <div className="ibc-methodology__slide_item_news_box_text_text  ">
                  <p className="ibc-methodology__slide_item_news_box_text_text_desc">{item.desc}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider__pagination"></div>
    </>
  );
}
