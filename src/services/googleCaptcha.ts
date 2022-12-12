import { originRequest } from '@utils/api';

const googleRecaptchaService = {
  googleCaptchaValidate: (params) =>
    originRequest.request({
      method: 'POST',
      url: `https://recaptchaenterprise.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID}/assessments?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      data: {
        event: {
          token: params,
          site_key: process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY,
        },
      },
    }),
};

export default googleRecaptchaService;
