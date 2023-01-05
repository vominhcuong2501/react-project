export default function Hero({ banner }: any) {
  const [bannerItem] = banner;

  return (
    <section>
      <div className="ibc-about-us__banner">
        <img src={bannerItem.bannerImage} alt="Banner" title="Banner" width="906" height="780" />
        <div className="ibc-about-us__banner__content">
          <div>
            <h1>{bannerItem.bannerTitle}</h1>
            <p>{bannerItem.bannerSubTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
