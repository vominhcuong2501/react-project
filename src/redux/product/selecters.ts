import { AppState } from '@redux/configureStore';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.app;

export const selectCounter = createSelector([selectAppSate], (state) => state.counter);
