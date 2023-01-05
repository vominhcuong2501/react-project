import CustomButtonExpands from '@components/primitive/CustomButtonExpand';

export default function SideBar() {
  return (
    <div className="ibc-sidebar">
      <div className="ibc-sidebar__header">
        <div className="ibc-sidebar__header__content">
          <h1>Subcirbe To Our Updates</h1>
          <h3>Latest news & insights from around the world brought to you by One IBC®’s experts</h3>
          <div>
            <CustomButtonExpands />
            {/* <GroupButton
              label="SUBSCRIBE NOW"
              variant="danger"
              size="medium"
              className="ibc-hero__button"
              href="/404"
            /> */}
          </div>
        </div>
        <img
          src="./images/img-sidebar-header.jpg"
          alt="./images/img-sidebar-header.jpg"
          width="267"
          height="168"
        />
      </div>
      <div className="ibc-sidebar__article">
        <h2>Realted Articles</h2>
        <div className="ibc-sidebar__article__item">
          <a href="/404" target="_self">
            <img
              src="./images/img-sidebar-article-1.jpg"
              alt="./images/img-sidebar-article-1.jpg"
              width="267"
              height="200"
            />
            <p>Singapore’s Major Trading Partners And Figures</p>
          </a>
        </div>
        <div className="ibc-sidebar__article__item">
          <a href="/404" target="_self">
            <img
              src="./images/img-sidebar-article-2.jpg"
              alt="./images/img-sidebar-article-2.jpg"
              width="267"
              height="200"
            />
            <p>What does Australia import from Singapore</p>
          </a>
        </div>
      </div>
    </div>
  );
}
