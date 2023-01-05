interface IBannerMake {
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
export interface IListCofig extends ResponseAPI {
  config: {
    key: string;
    content: string;
  };
}
export interface ResponseAPI {
  iss: string;
  iat: number;
  isSuccessful: string;
}
export interface IListMake {
  banner: IBannerMake;
  metaInfo: any;
  configFuture: IListCofig;
}
