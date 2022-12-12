import { AppState } from '@redux/configureStore';
import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.insights;

export const selectListInsights = createSelector([selectAppSate], (state) =>
  get(state, 'listInsights', []),
);

export const selectTopicOptions = createSelector([selectAppSate], (state) =>
  get(state, 'topics', null),
);

export const selectServicesOptions = createSelector([selectAppSate], (state) =>
  get(state, 'services', null),
);
