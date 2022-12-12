import * as yup from 'yup';

interface CreateGetInTouchSchema {
  email: string;
  name: string;
  enquiry: string;
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
      .min(5, 'Must be exactly 5 digits')
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
