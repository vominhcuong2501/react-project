import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  listInsights: [];
  ip: [];
  userAgent: [];
}

const initialState: State = {
  listInsights: [],
  ip: [],
  userAgent: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setListInsights(state, { payload }: PayloadAction<any>) {
      state.listInsights = payload;
    },
    setIp(state, { payload }: PayloadAction<any>) {
      state.ip = payload;
    },
    setUserAgent(state, { payload }: PayloadAction<any>) {
      state.userAgent = payload;
    },
  },
});

export const { setListInsights, setIp, setUserAgent } = commonSlice.actions;

export default commonSlice;
