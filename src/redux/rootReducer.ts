import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import insightSlice from './insights/slice';
import productSlice from './product/slice';

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [insightSlice.name]: insightSlice.reducer,
});

export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
