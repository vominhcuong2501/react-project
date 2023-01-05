import search from '@scss/components/search-page.scss';

export default function Search() {
  return (
    <div>
      <style jsx>{search}</style>
      <div className="ibc-search">
        <form action="#">
          <div className="ibc-search__input">
            <input type="text" placeholder="Search" />
            <div className="ibc-search__input__button-search">
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="ibc-search__input__button-del">
              <button>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="ibc-search__content">
          <div className="ibc-search__content__item">
            <a href="#" target="_self" title="search">
              <h2>Vietnam, One IBC and the adventure to the big sea</h2>
            </a>
            <h4>One IBC Limited | Insight | Articles | Instalment-2-vietnam</h4>
            <div className="ibc-search__content__item__text">
              <img
                src="/images/img-search-result.jpg"
                alt="search"
                title="search"
                width="100"
                height="60"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur. In aliquam mi sodales faucibus senectus.
                Aliquam eget imperdiet pharetra ullamcorper viverra tortor. Ornare consectetur
                ornare gravida ut tellus. Vitae molestie nunc volutpat velit a congue auctor. Sed
                enim diam quam pulvinar facilisi iaculis. Non senectus egestas integer id ut diam
                proin molestie.
              </p>
            </div>
          </div>
          <div className="ibc-search__content__item">
            <a href="#" target="_self" title="search">
              <h2>Vietnam, One IBC and the adventure to the big sea</h2>
            </a>
            <h4>One IBC Limited | Insight | Articles | Instalment-2-vietnam</h4>
            <div className="ibc-search__content__item__text">
              <img
                src="/images/img-search-result.jpg"
                alt="search"
                title="search"
                width="100"
                height="60"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur. In aliquam mi sodales faucibus senectus.
                Aliquam eget imperdiet pharetra ullamcorper viverra tortor. Ornare consectetur
                ornare gravida ut tellus. Vitae molestie nunc volutpat velit a congue auctor. Sed
                enim diam quam pulvinar facilisi iaculis. Non senectus egestas integer id ut diam
                proin molestie.
              </p>
            </div>
          </div>
          <div className="ibc-search__content__item">
            <a href="#" target="_self" title="search">
              <h2>Vietnam, One IBC and the adventure to the big sea</h2>
            </a>
            <h4>One IBC Limited | Insight | Articles | Instalment-2-vietnam</h4>
            <div className="ibc-search__content__item__text">
              <img
                src="/images/img-search-result.jpg"
                alt="search"
                title="search"
                width="100"
                height="60"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur. In aliquam mi sodales faucibus senectus.
                Aliquam eget imperdiet pharetra ullamcorper viverra tortor. Ornare consectetur
                ornare gravida ut tellus. Vitae molestie nunc volutpat velit a congue auctor. Sed
                enim diam quam pulvinar facilisi iaculis. Non senectus egestas integer id ut diam
                proin molestie.
              </p>
            </div>
          </div>
          <div className="ibc-search__content__item">
            <a href="#" target="_self" title="search">
              <h2>Vietnam, One IBC and the adventure to the big sea</h2>
            </a>
            <h4>One IBC Limited | Insight | Articles | Instalment-2-vietnam</h4>
            <div className="ibc-search__content__item__text">
              <img
                src="/images/img-search-result.jpg"
                alt="search"
                title="search"
                width="100"
                height="60"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur. In aliquam mi sodales faucibus senectus.
                Aliquam eget imperdiet pharetra ullamcorper viverra tortor. Ornare consectetur
                ornare gravida ut tellus. Vitae molestie nunc volutpat velit a congue auctor. Sed
                enim diam quam pulvinar facilisi iaculis. Non senectus egestas integer id ut diam
                proin molestie.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ibc-search-header">
        <form action="#">
          <div className="ibc-search-header__input">
            <input type="text" placeholder="Search" />
            <div className="ibc-search-header__input__button-search">
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="ibc-search-header__input__button-del">
              <button>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
