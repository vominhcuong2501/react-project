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

export const selectsListFaq = createSelector([selectAppSate], (state) =>
  get(state, 'listFaq', null),
);

export const selectsListDataHub = createSelector([selectAppSate], (state) =>
  get(state, 'listDataHub', null),
);

export const selectsListInSightsTypes = createSelector([selectAppSate], (state) =>
  get(state, 'listInSightsTypes', null),
);

export const selectsIp = createSelector([selectAppSate], (state) => get(state, 'ip', null));

export const selectsUserAgent = createSelector([selectAppSate], (state) =>
  get(state, 'userAgent', null),
);

export const selectConfigDataHub = createSelector([selectAppSate], (state) =>
  get(state, 'configDataHub', null),
);

export const selectConfigFaq = createSelector([selectAppSate], (state) =>
  get(state, 'configFaq', null),
);

export const selectSubscribeConfig = createSelector([selectAppSate], (state) =>
  get(state, 'subscribeConfig', null),
);
