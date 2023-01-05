export interface IListCalls {
  iss: string;
  iat: number;
  isSuccessful: string;
  services: {
    id: string;
    name: string;
    icon: string;
    contents: {
      link: string;
      content: string;
    }[];
  }[];
}
interface IBannerContact {
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
export interface IOfficesContact {
  iss: string;
  iat: number;
  isSuccessful: string;
  offices: {
    id: number;
    name: string;
    address: string;
    working: string;
    lat: string;
    lng: string;
    country_code: string;
  }[];
}
export interface ICountriesContact {
  iss: string;
  iat: number;
  isSuccessful: string;
  countries: {
    id: number;
    name: string;
    code: string;
  }[];
}
export interface IOfficeAllContact {
  iss: string;
  iat: number;
  isSuccessful: string;
  countries: {
    id: number;
    name: string;
    title: string;
    icon: string;
    address: string;
    working: string;
    lat: number;
    lng: number;
  }[];
}
export interface IContactsBannerProps {
  banner: IBannerContact;
  listService: IListCalls;
  officesService: IOfficesContact;
  countriesService: ICountriesContact;
  metaInfo: any;
  officesAllService: IOfficeAllContact;
}
