import { AppState } from '@redux/configureStore';
import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.common;

export const selectListInsights = createSelector([selectAppSate], (state) =>
  get(state, 'listInsights', []),
);
export const selectsIp = createSelector([selectAppSate], (state) => get(state, 'ip', null));
export const selectsUserAgent = createSelector([selectAppSate], (state) =>
  get(state, 'userAgent', null),
);
