export interface IFaqContainer {
  iss: string;
  iat: number;
  isSuccessful: string;
  faqs: {
    type_name: string;
    type_keyword: string;
    faqs: {
      id: number;
      faq_id: number;
      name: string;
      keyword: string;
      icon: string;
      summary: string;
    }[];
  }[];
}
