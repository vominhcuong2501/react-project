import { Swiper, SwiperSlide } from 'swiper/react';

export function Slide() {
  return (
    <div className="section-consulting">
      <div className="new-row">
        <div className="explore-container">
          <div className="container">
            <div className="row-new">
              <Swiper spaceBetween={50} slidesPerView={1} loopedSlides={5} loop>
                <SwiperSlide>
                  <div>trang 1</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>trang 2</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>trang 3</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>trang 4</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>trang 5</div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
