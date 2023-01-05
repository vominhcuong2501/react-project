import { IGetInCareer } from '@interfaces/career';
import {
  IError,
  IGetInContact,
  IGetInSubscribe,
  IGetInTouch,
  IGetInTouchOtp,
} from '@interfaces/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import careerServices from '@services/carrer';
import googleRecaptchaService from '@services/googleCaptcha';
import homeService from '@services/home';
import { originRequest } from '@utils/api';

export const googleCaptchaThunk = createAsyncThunk<Response, string>(
  'app/googleCaptcha',
  async (token, { rejectWithValue }) => {
    try {
      const response: any = await googleRecaptchaService.googleCaptchaValidate(token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const submitFormGetInTouchThunk = createAsyncThunk<
  null,
  IGetInTouch,
  { rejectValue: IError }
>('app/updateUser', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await homeService.getInTouch(payload);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const submitOtpGetInTouchThunk = createAsyncThunk<
  null,
  IGetInTouchOtp,
  { rejectValue: IError }
>('app/updateUser', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await homeService.getInTouchOtp(payload);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHeaderMenuThunk = createAsyncThunk<null, any, { rejectValue: IError }>(
  'app/headerMenu',
  async (payload, { rejectWithValue }) => {
    try {
      const response: any = await originRequest('/menu');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getFooterThunk = createAsyncThunk<null, any, { rejectValue: IError }>(
  'app/footerMenu',
  async (payload, { rejectWithValue }) => {
    try {
      const response: any = await originRequest('/footer');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const submitFormGetInContactThunk = createAsyncThunk<
  null,
  IGetInContact,
  { rejectValue: IError }
>('app/updateFile', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await homeService.getInContact(payload);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const submitFormGetInSubscribeThunk = createAsyncThunk<
  null,
  IGetInSubscribe,
  { rejectValue: IError }
>('app/updateFile', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await homeService.getInSubscribe(payload);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const submitFormGetInCareerThunk = createAsyncThunk<
  null,
  IGetInCareer,
  { rejectValue: IError }
>('app/updateFile', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await careerServices.getInCareer(payload);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const submitFormGetInDataHubThunk = createAsyncThunk<
  null,
  IGetInTouch,
  { rejectValue: IError }
>('app/updateUser', async (payload, { rejectWithValue }) => {
  try {
    const response: any = await homeService.getInDataHub(payload);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
