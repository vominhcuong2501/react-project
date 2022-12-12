import dataHubStyle from '@scss/pages/data-hub/index.scss';

export default function DataHubContainer() {
  return (
    <>
      <style jsx>{dataHubStyle}</style>
      <div className="ibc-data-hub d-flex justify-content-between">
        <div className="ibc-data-hub__content">
          <div className="d-flex align-items-center">
            <img src="/images/flag.svg" alt="/images/flag.svg" width="32" height="24" />
            <h2>Hong Kong</h2>
          </div>
          <div>
            <h1>Doing business in Hong Kong - 2022</h1>
            <p>
              This ebook provides useful information and insightful data that can help you
              understand how to do business in Hong Kong.
            </p>
          </div>
          <div className="ibc-data-hub__btn">
            <div className=" button_update">
              <div className="ibc__form__box__button ">
                <button>
                  <a
                    href="#"
                    target="_self"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img src="./images/Download-icon.svg" alt="Download-icon.svg" />
                    <p className="m-0">Download</p>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ibc-data-hub__img d-flex align-items-center">
          <img src="./images/QR.jpg" alt="./images/QR.jpg" width="200" height="200" />
          <a href="#" target="_self">
            <img
              className="ibc-data-hub__img__download"
              src="./images/img-download-mobile.jpg"
              alt="./images/img-download-mobile.jpg"
            />
          </a>
        </div>
      </div>
    </>
  );
}
