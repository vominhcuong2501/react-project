import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  data: any;
  detailMetaSeo?: any;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface IError {
  [key: string]: string;
}

export interface ILocation {
  language: string;
  countryCode: string;
}

export interface ResponseStatus<T> {
  [key: string]: T;
}

export interface ConfigTXT extends ResponseAPI {
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
export interface ResponseConfig extends ResponseAPI, ConfigTXT {}

export interface UpdateSection extends ResponseAPI {
  insights: {
    insightId: string;
    insightName: string;
    insightKeyword: string;
    insightIcon: string;
    insightSummary: string;
  }[];
}
