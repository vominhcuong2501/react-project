import { AppState } from '@redux/configureStore';
import { getConfig } from '@utils/helpers';
import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.common;

export const selectListInsights = createSelector([selectAppSate], (state) =>
  get(state, 'listInsights', []),
);

export const selectListServices = createSelector([selectAppSate], (state) =>
  get(state, 'listServices', []),
);

export const selectBreadcrumb = createSelector([selectAppSate], (state) =>
  get(state, 'breadcrumb', null),
);

export const getFormConfig = createSelector([selectAppSate], (state) =>
  get(state, 'formConfig', []),
);

export const getAwards = createSelector([selectAppSate], (state) => get(state, 'awards', []));

export const getAwardsConfig = createSelector([selectAppSate], (state) =>
  get(state, 'awardsConfig', []),
);

export const getListArticleAboutUs = createSelector([selectAppSate], (state) =>
  get(state, 'listArticleAboutUs', []),
);

export const getConfigOurTeam = createSelector([selectAppSate], (state) =>
  get(state, 'configOurTeam', []),
);

export const getContent = createSelector([selectAppSate], (state) => get(state, 'content', []));

export const getConfigLearMoreAbout = createSelector([selectAppSate], (state) =>
  get(state, 'configLearMoreAbout', []),
);

export const getDetailAwardLicenses = createSelector([selectAppSate], (state) =>
  get(state, 'detailAwardLicenses', []),
);

export const getConfigContactMap = createSelector([selectAppSate], (state) =>
  get(state, 'configContactMap', []),
);

export const getConfigContactSelect = createSelector([selectAppSate], (state) =>
  get(state, 'configContactSelect', []),
);

export const getConfigOurDifferenceAndValues = createSelector([selectAppSate], (state) =>
  getConfig(state.configOurDifferenceAndValues),
);
export const getConfigContactForm = createSelector([selectAppSate], (state) =>
  get(state, 'configContactForm', []),
);
export const selectSubscribeConfig = createSelector([selectAppSate], (state) =>
  get(state, 'subscribeConfig', null),
);
