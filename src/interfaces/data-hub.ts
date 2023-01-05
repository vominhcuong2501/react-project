export interface ITypeDataHub {
  name: string;
  title: string;
  meta_keyword?: string;
  meta_description?: string;
  meta_image?: string;
}

export interface IDetailTypeDataHub {
  iss: string;
  iat: number;
  isSuccessful: string;
  type: ITypeDataHub;
  data: {
    id: number;
    name: string;
    country: string;
    keyword: string;
    icon: string;
    summary: string;
  }[];
  total: number;
}

export interface IDataHubContainer {
  iss: string;
  iat: number;
  isSuccessful: string;
  'data-hub': {
    type_name: string;
    type_keyword: string;
    data: {
      id: number;
      name: string;
      keyword: string;
      country: string;
      country_icon: string;
      icon: string;
      qr_code: string;
      summary: string;
    }[];
  }[];
}

export interface IDetailArticle {
  iss: string;
  iat: number;
  isSuccessful: string;
  article: {
    id: number;
    keyword: string;
    name: string;
    title: string;
    icon: string;
    meta_keyword: string;
    meta_description: string;
    content: string;
    tags: any[];
  };
  relate: any[];
}
