import { IError } from '@interfaces/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInsightDetailPageThunk = createAsyncThunk<null, any, { rejectValue: IError }>(
  'app/updateFile',
  async (payload, { rejectWithValue }) => {
    try {
      // const response: any = await insightServices.getInsightDetailPage(payload);
      // return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
