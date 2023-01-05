export interface ICareerArticle {
  id: string;
  name: string;
  title: string;
  meta_keyword: string;
  meta_description: string;
  meta_image: any;
  content: string;
  close_date: string;
  country: string;
}

export interface DetailArticle {
  id: string;
  name: string;
  title: string;
  meta_keyword: string;
  meta_description: string;
  meta_image: any;
  content: string;
  close_date: string;
  country: string;
}
export interface IGetInCareer {
  name: string;
  email: string;
  note: string;
  phone: number;
  career_keyword: string;
  upload: [];
  ip: string;
  agent: string;
}
