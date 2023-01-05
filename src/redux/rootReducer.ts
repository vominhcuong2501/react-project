import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import commonSlice from './common/slice';
import configSlice from './config/slice';
import faqSlice from './faq/slice';
import insightSlice from './insights/slice';
import productSlice from './product/slice';

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [commonSlice.name]: commonSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [insightSlice.name]: insightSlice.reducer,
  [faqSlice.name]: faqSlice.reducer,
  [configSlice.name]: configSlice.reducer,
});

export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
