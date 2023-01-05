import { AppState } from '@redux/configureStore';
import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.faq;

export const selectDetailType = createSelector([selectAppSate], (state) =>
  get(state, 'detailType', []),
);
