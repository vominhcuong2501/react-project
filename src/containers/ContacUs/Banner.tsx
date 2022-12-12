import Breadcrumb from '@components/primitive/Breadcrumb';
import styles from '@scss/pages/contact-us/banner.scss?type=scoped';

interface IBannerConctacts {
  iss: string;
  iat: number;
  isSuccessful: string;
  banners: {
    bannerId: string;
    bannerLink: string;
    bannerImage: string;
    bannerTitle: string;
    bannerSubTitle: string;
    bannerContent: string;
  }[];
}

interface IConctactProps {
  banner: IBannerConctacts;
}
export default function Banner({ banner }: IConctactProps) {
  return (
    <>
      <style jsx>{styles}</style>

      {banner?.banners.map((item) => (
        <section className="ibc-banner" key={item.bannerId}>
          <img src={item.bannerImage} alt="" />
          <div className="ibc-container-content">
            <div className="ibc-banner_title">
              <h1>{item.bannerTitle}</h1>
            </div>
            <div className="ibc-banner_link">
              <div className="ibc-services__breadcrumb">
                <Breadcrumb></Breadcrumb>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
