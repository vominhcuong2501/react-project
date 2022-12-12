import { IError } from '@interfaces/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import insightServices from '@services/insight';

export const getInsightDetailPageThunk = createAsyncThunk<null, any, { rejectValue: IError }>(
  'app/updateFile',
  async (payload, { rejectWithValue }) => {
    try {
      const response: any = await insightServices.getInsightDetailPage(payload);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
