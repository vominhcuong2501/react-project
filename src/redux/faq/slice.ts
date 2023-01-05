import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  detailType: object;
}

const initialState: State = {
  detailType: {},
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    setDetailTypeFaq(state, { payload }: PayloadAction<any>) {
      state.detailType = payload;
    },
  },
});

export const { setDetailTypeFaq } = faqSlice.actions;

export default faqSlice;
