import componentsFaq from '@scss/components/componentsFaq.scss';
import { useState } from 'react';

export default function ComponentsFaq() {
  const [isLoading, setIsLoading] = useState(false);

  const toggleIsLoading = () => {
    // 👇️ passed function to setState
    setIsLoading((current) => !current);
    if (isLoading === false) {
      document.getElementById('ibc-faq__operation__group-service').style.display = 'none';
      document.getElementById('arrow-down').style.display = 'block';
      document.getElementById('arrow-up').style.display = 'none';
      document.getElementById('ibc-faq__operation__btn-dropdown').style.background = '#f0f2f5';
    } else {
      document.getElementById('ibc-faq__operation__group-service').style.display = 'block';
      document.getElementById('ibc-faq__operation__group-service').style.transition = 'all 1s';

      document.getElementById('arrow-up').style.display = 'block';
      document.getElementById('arrow-down').style.display = 'none';
      document.getElementById('ibc-faq__operation__btn-dropdown').style.background = '$whitefff';
    }
  };
  return (
    <>
      <style jsx>{componentsFaq}</style>

      <div className="ibc-faq__question-group">
        <div className="row">
          <div className="col-md-6 col-12 ibc-faq__question-group__item">
            <div className="ibc-faq__question-group__item__title">
              <h1>Most Asked Questions</h1>
            </div>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>
                How is the BV included in the Commercial Registry? How is the BV included in the
                Commercial Registry? How is the BV included in the Commercial Registry?
              </p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="ibc-faq__operation">
        <div className="row">
          <div className="col-md-6 col-12">
            <h1>Most Asked Questions</h1>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>
                How is the BV included in the Commercial Registry? How is the BV included in the
                Commercial Registry? How is the BV included in the Commercial Registry?
              </p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
            <a
              href="#"
              target="_self"
              className="d-flex justify-content-between align-items-center"
            >
              <p>How is the BV included in the Commercial Registry?</p>
              <i className="fa-light fa-arrow-right-long"></i>
            </a>
          </div>
          <div className="col-md-6 col-12 ibc-faq__operation__sidebar">
            <h2>Services</h2>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                Strategy
              </a>
            </div>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                People & Organizational Performance
              </a>
            </div>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                Governance, Risk & Compliance
              </a>
            </div>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                Wealth & Asset Management
              </a>
            </div>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                Corporate Finance
              </a>
            </div>
            <div className="ibc-faq__operation__sidebar__item">
              <a href="#" target="_self">
                Digital Transformation
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ibc-faq__operation__btn">
        <div
          id="ibc-faq__operation__btn-dropdown"
          onClick={toggleIsLoading}
          className="d-flex align-items-center justify-content-between ibc-faq__operation__btn-dropdown"
        >
          <h2>Operration</h2>
          <div>
            <img src="/images/arrow-down.svg" alt="arrow-down" id="arrow-down" />
            <img src="/images/arrow-up.svg" alt="arrow-up" id="arrow-up" />
          </div>
        </div>
        <div id="ibc-faq__operation__group-service" className="ibc-faq__operation__group-service">
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              Strategy
            </a>
          </div>
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              People & Organizational Performance
            </a>
          </div>
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              Governance, Risk & Compliance
            </a>
          </div>
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              Wealth & Asset Management
            </a>
          </div>
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              Corporate Finance
            </a>
          </div>
          <div className="ibc-faq__operation__group-service__item">
            <a href="#" target="_self">
              Digital Transformation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
