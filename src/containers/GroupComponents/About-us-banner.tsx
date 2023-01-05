import { GroupButton } from '@components/compound';
import Arrow from '@components/primitive/Arrow';
import aboutBanner from '@scss/components/componentsAbout.scss';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function AboutUsBanner() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [prevLicenses, setPrevLicenses] = useState<HTMLElement | null>(null);
  const [nextLicenses, setNextLicenses] = useState<HTMLElement | null>(null);

  return (
    <div>
      <style jsx>{aboutBanner}</style>
      <div className="ibc-about-us__banner">
        <img
          src="/images/img-banner-about-us.jpg"
          alt="Banner"
          title="Banner"
          width="906"
          height="780"
        />
        <div className="ibc-about-us__banner__content">
          <div>
            <h1>Forwarding a catch-all and sustainable development</h1>
            <p>
              A new age of growth is now conceivable where beneficial societal impacts and expansion
              are not seen as competing forces.
            </p>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__about-us">
        <h1>About Us</h1>
        <div className="ibc-about-us__about-us__content">
          <div className="row">
            <div className="col-md-6 col-12">
              <p>
                One IBC®s Management Consultancy consists of the sales and related goods by entities
                organizations, sole traders and partnerships that provide a range of advisory and
                assistance on organizational planning, financial budgeting, marketing strategies,
                human resource practices, administration policies and production and logistics
                scheduling.
                <br />
                <br /> For the global expansion purpose, such services include solutions for
                administrative management issues, strategic and organizational planning, business
                process improvement, human resource and personnel policies, developing marketing
                planning and strategy.
              </p>
            </div>
            <div className="col-md-6 col-12">
              <p>
                A team of consultants undertakes processes where Human Capital is the major input.
                One IBC® believes that a human-centric entity, structured as an Agile Team with a
                result-driven mindset, is responsible to delivery its proven methods to the client.
                <br />
                <br />
                One IBC® has established a global presence, with professional consultants in major
                cities, namely: Hong Kong, Singapore, California USA, Vilnius Lithuania, and Ho Chi
                Minh City Vietnam. In addition to these offices, One IBC® also has 32 branches,
                representative offices, and associated companies in many other financial centers in
                the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__provide">
        <div className="ibc-about-us__provide__title">
          <h1>What We Provide</h1>
          <p>An in-depth knowledge, prolonged experience, and strategic mindset combined.</p>
        </div>
        <div className="ibc-about-us__provide__content">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-3 col-6">
              <div className="ibc-about-us__provide__content__item">
                <h2>10 +</h2>
                <p>Year of Experience</p>
              </div>
              <div className="ibc-about-us__provide__content__item">
                <h2>10 000+</h2>
                <p>Clients Worldwide</p>
              </div>
              <div className="ibc-about-us__provide__content__item-mobile">
                <div className="ibc-about-us__provide__content__item">
                  <h2>50 +</h2>
                  <p>Professional Consultants</p>
                </div>
                <div className="ibc-about-us__provide__content__item">
                  <h2>32 +</h2>
                  <p>Branches representative offices and associated companies</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 ">
              <img
                src="/images/img-about-us-provide.jpg"
                alt="Provide"
                title="Provide"
                width="238"
                height="485"
              />
            </div>
            <div className="col-md-3 col-6 ibc-about-us__provide__content__item-web">
              <div className="ibc-about-us__provide__content__item">
                <h2>50 +</h2>
                <p>Professional Consultants</p>
              </div>
              <div className="ibc-about-us__provide__content__item">
                <h2>32 +</h2>
                <p>Branches representative offices and associated companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__our-version">
        <div className="ibc-about-us__our-version__content">
          <div className="ibc-about-us__our-version__content__text">
            <h1>Our Vision</h1>
            <p>
              Our vision is to become the trusted management consulting firm both locally and
              internationally, as well as the true-blue advisor to startups and organizations that
              are looking to take future actions in their development.
              <br />
              <br />
              Our purpose is to bring potential borderless business opportunities to all global
              investors. We promise to provide the top quality consulting services and reaffirm our
              position as one of the top international management consulting firms.
            </p>
            <div>
              <GroupButton
                label="WHAT WE DO"
                variant="danger"
                size="medium"
                className="ibc-hero__button"
                href="#"
              />
            </div>
          </div>
          <div className="ibc-about-us__our-version__content__img">
            <img
              src="/images/img-about-us-our-version.jpg"
              alt="Our version"
              title="Our version"
              width="800"
              height="838"
            />
          </div>
        </div>
      </div>

      <div className="ibc-about-us__our-mission">
        <div className="ibc-about-us__our-mission__content">
          <div className="ibc-about-us__our-mission__content__img">
            <img
              src="/images/img-about-us-our-mission.jpg"
              alt="Our mission"
              title="Our mission"
              width="790"
              height="336"
            />
          </div>
          <div className="ibc-about-us__our-mission__content__text">
            <h1>Our Mission</h1>
            <p>
              Our mission is to deliver top-notch, specialized management consulting services that
              are well-suited to generate value for our customers, and extraordinarily practical in
              helping them achieve their strategic goals.
              <br />
              <br />
              Your success is our success. This is why One IBC® wants to be a part of each of our
              customer’s success.
            </p>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__award">
        <div className="ibc-about-us__award__content">
          <div className="ibc-about-us__award__content__title">
            <h1>Awards</h1>
            <p>
              One IBC® is and has been working hard in order to add value for our customers, grow
              our employees, and give back to the community. The awards we receive are a testament
              to these commitments.
            </p>
          </div>
          <div className="ibc-about-us__award__content__slider">
            <Swiper
              spaceBetween={10}
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
              autoplay
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-1.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-2.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-3.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-1.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-2.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <a href="/" title="Award" target="_seft">
                    <img
                      src="/images/img-award-3.jpg"
                      width="342"
                      height="256"
                      alt="Award"
                      title="Award"
                    />
                    <h2>The 6th consecutive year One IBC® is collaborating with OCBC Bank</h2>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="slider__pagination"></div>
            <div className="swiper-pagination"></div>
            <div ref={(node) => setPrevEl(node)} className="ibc-arrow--prev">
              <Arrow></Arrow>
            </div>
            <div ref={(node) => setNextEl(node)} className="ibc-arrow--next">
              <Arrow></Arrow>
            </div>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__licenses">
        <div className="ibc-about-us__licenses__content">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="ibc-about-us__licenses__content__slider">
                <Swiper
                  modules={[Pagination, Navigation]}
                  effect="cube"
                  grabCursor
                  autoHeight={false}
                  scrollbar={{ draggable: true }}
                  pagination={{
                    el: '.slider__pagination',
                    clickable: true,
                  }}
                  autoplay
                  spaceBetween={10}
                  slidesPerView={1}
                  // navigation={{ prevLicenses, nextLicenses }}
                >
                  <SwiperSlide>
                    <div>
                      <h1>Licenses</h1>
                      <p>
                        Our service quality is certified by many international licenses we have
                        obtained from the government, our partners and industry experts.
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <h1>Licenses1</h1>
                      <p>
                        Our service quality is certified by many international licenses we have
                        obtained from the government, our partners and industry experts.
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
                {/* <div className="slider__pagination"></div>
                <div className="swiper-pagination"></div> */}
                <div ref={(node) => setPrevLicenses(node)} className="ibc-arrow--prev">
                  <Arrow></Arrow>
                </div>
                <div ref={(node) => setNextLicenses(node)} className="ibc-arrow--next">
                  <Arrow></Arrow>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 ibc-about-us__licenses__content__img">
              <div>
                <a href="/" target="_self" title="Licenses">
                  <img
                    src="/images/img-licenses-2.jpg"
                    width="472"
                    height="442"
                    alt="Licenses"
                    title="Licenses"
                  />
                  <h2>
                    One IBC® Pte. Ltd - Certified Corporate Services Provider in Singapore by ACRA
                    2021 - 2023
                  </h2>
                </a>
              </div>
            </div>
            <div className="col-md-4 col-12 ibc-about-us__licenses__content__img">
              <div>
                <a href="/" target="_self" title="Licenses">
                  <img
                    src="/images/img-licenses-1.jpg"
                    width="472"
                    height="442"
                    alt="Licenses"
                    title="Licenses"
                  />
                  <h2>One IBC® was granted as a Service Provider of DMCC Free Zone</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ibc-about-us__our-team">
        <div className="ibc-about-us__our-team__content">
          <div className="ibc-about-us__our-team__content__text">
            <h1>Our Vision</h1>
            <p>
              One IBC® Group operates with the aim ” Your success is our success” This is the reason
              why we want to be a part on the path of your success
            </p>
            <div>
              <GroupButton
                label="APPLY NOW"
                variant="danger"
                size="medium"
                className="ibc-hero__button"
                href="#"
              />
            </div>
          </div>
          <div className="ibc-about-us__our-team__content__img">
            <img
              src="/images/img-about-us-our-team.jpg"
              alt="Our version"
              title="Our version"
              width="790"
              height="336"
            />
          </div>
        </div>
      </div>

      <button className="ibc-about-us__btn-config">
        <p>WHAT WE DO</p>
        <img
          src="https://dusyzh85wmzqh.cloudfront.net/uploads/more-right2-1671675085.png"
          alt="Icon"
        />
      </button>
    </div>
  );
}
