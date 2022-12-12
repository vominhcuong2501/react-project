import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  counter: number;
}

const initialState: State = {
  counter: 5,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCounter(state, { payload }: PayloadAction<number>) {
      state.counter = payload;
    },
  },
});

export const { setCounter } = productSlice.actions;

export default productSlice;
