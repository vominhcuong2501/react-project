interface IBannerServices {
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

interface IConfig {
  title: string;
  description: string;
  label: string;
}

export interface IListServices {
  iss: string;
  iat: number;
  isSuccessful: string;
  services: {
    id: string;
    name: string;
    keyword: string;
    icon: string;
    summary: string;
  }[];
}

export interface IDetailPage {
  iss: string;
  iat: number;
  isSuccessful: string;
  service: {
    id: string;
    name: string;
    icon: string;
    title: string;
    meta_image: string;
    meta_keyword: string;
    meta_description: string;
    content: string;
  };
  articles: any[];
}

export interface IServicesBannerProps {
  banner: IBannerServices;
  configFuture: IConfig;
  detailPage: any;
  metaInfo: any;
  listIndustries: any;
  listConsultingServices: any;
  listServices: any;
}
