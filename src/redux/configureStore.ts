import { Action, AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import rootReducer, { RootReducer, RootState } from './rootReducer';

const enhanceHydrate = (reducer: RootReducer) => (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return reducer({ ...state, ...action.payload }, action);
  }
  return reducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: enhanceHydrate(rootReducer),
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = RootState;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
