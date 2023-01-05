import { ILocation, ResponseAPI } from './common';

export interface IGetInTouch {
  name: string;
  email: string;
  phone: number;
  enquiry: string;
}
export interface IGetInTouchOtp {
  id: number;
  phone: string;
  country_code: string;
  code_1: string;
  code_2: string;
  code_3: string;
  code_4: string;
  code_5: string;
  code_6: string;
}
export interface IGetBanner {
  language: string;
  locationCode: string;
  controller: string;
}
export interface IGetListInsight {
  language: string;
  locationCode: string;
  limit?: number;
  insightType?: string;
}
export interface IGetInsightHome {
  language: string;
  locationCode: string;
  limit?: number;
  isHome: string;
}
export interface IGetLeadForm {
  language: string;
  locationCode: string;
  name: string;
  email: string;
  phone: string;
  inquires: string;
  channelId?: number;
  channelName?: string;
  channelNumber?: string;
  comment?: string;
  url?: string;
  howDidYouKnow?: string;
  state?: string;
  site?: string;
}

export interface IGetInsightUpdateResponse {
  insightIcon: string;
  insightId: string;
  insightKeyword: string;
  insightName: string;
  insightSummary: string;
}

export type IGetService = ILocation;

export interface IHomePageProps {
  banner: IGetBanner;
  listInsight: IGetListInsight;
  insightHome: IGetInsightHome;
  leadForm: IGetLeadForm;
  region: ILocation;
  insightUpdate: IGetInsightHome;
}

export interface ResponseBanner extends ResponseAPI {
  banners: {
    bannerId: string;
    bannerLink: string;
    bannerImage: string;
    bannerTitle: string;
    bannerSubTitle: string;
    bannerContent: string;
  }[];
}
export interface ResponseListInsight extends ResponseAPI {
  insights: {
    insightId: string;
    insightName: string;
    insightKeyword: string;
    insightIcon: string;
    insightSummary: string;
  }[];
}
export type ResponseInsightUpdate = ResponseListInsight;

export interface ResListService extends ResponseAPI {
  services: {
    id: string;
    name: string;
    keyword: string;
    icon: string;
    summary: string;
  }[];
}

export interface InfoPage extends ResponseAPI {
  page: {
    name: string;
    title: string;
    meta_keyword: string;
    meta_description: string;
    content: string;
  };
}

export interface IGetInContact {
  name: string;
  email: string;
  phone: number;
  enquiry: string;
  upload: [];
  ip: string;
  agent: string;
}
export interface IGetInSubscribe {
  name: string;
  email: string;
  ip: string;
  agent: string;
}
