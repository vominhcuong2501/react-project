import * as yup from 'yup';

interface CreateGetInTouchSchema {
  email: string;
  name: string;
  enquiry: string;
  phone: string;
}
interface CreateGetInCareerSchema {
  email: string;
  name: string;
  note: string;
  phone: string;
}
interface CreateGetInTouchSchemaOtp {
  code_1: string;
  code_2: string;
  code_3: string;
  code_4: string;
  code_5: string;
  code_6: string;
}

export const createGetInTouchSchema = ({ email, name, enquiry, phone }: CreateGetInTouchSchema) =>
  yup.object().shape({
    email: yup.string().trim().email().required(email),
    name: yup.string().trim().required(name),
    enquiry: yup.string().trim().required(enquiry),
    phone: yup
      .string()
      .trim()
      .required(phone)
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Enter the correct numbers')
      .max(15, 'Must be exactly 15 digits'),
  });

export const createGetInTouchSchemaOtp = ({
  code_1,
  code_2,
  code_3,
  code_4,
  code_5,
  code_6,
}: CreateGetInTouchSchemaOtp) =>
  yup.object().shape({
    code_1: yup.string().required(code_1),
    code_2: yup.string().required(code_2),
    code_3: yup.string().required(code_3),
    code_4: yup.string().required(code_4),
    code_5: yup.string().required(code_5),
    code_6: yup.string().required(code_6),
  });
export const createGetInCareerSchema = ({ email, name, note, phone }: CreateGetInCareerSchema) =>
  yup.object().shape({
    email: yup.string().trim().email().required(email),
    name: yup.string().trim().required(name),
    note: yup.string().trim().required(note),
    phone: yup
      .string()
      .trim()
      .required(phone)
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Enter the correct numbers')
      .max(15, 'Must be exactly 15 digits'),
  });
interface CreateGetInSubscribeSchema {
  email: string;
  name: string;
}
export const createGetInSubscribeSchema = ({ email, name }: CreateGetInSubscribeSchema) =>
  yup.object().shape({
    email: yup.string().trim().email().required(email),
    name: yup.string().trim().required(name),
  });

/**
 *
 * @param id
 * @param TypeRoutes
 * @param articlesRoutes
 * @returns
 */
export const validationRoutes = (
  id: string,
  typeRoutes: Array<string>,
  articlesRoutes: Array<string>,
) => {
  let isType = false;
  let isArticle = false;
  if (typeRoutes && typeRoutes.indexOf(id) > -1) isType = true;
  if (articlesRoutes && articlesRoutes.indexOf(id) > -1) isArticle = true;

  return [isType, isArticle];
};
