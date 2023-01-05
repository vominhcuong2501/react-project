import { AppState } from '@redux/configureStore';
import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.app;

export const selectCounter = createSelector([selectAppSate], (state) => state.counter);

export const selectHeaderMenu = createSelector([selectAppSate], (state) =>
  get(state, 'headerMenu.menu_header', []),
);

export const selectFooterMenu = createSelector([selectAppSate], (state) =>
  get(state, 'footerMenu.menu_footer', []),
);

export const selectServices = createSelector([selectAppSate], (state) =>
  get(state, 'listConsultingServices', []),
);

export const selectUpdateSection = createSelector([selectAppSate], (state) =>
  get(state, 'listUpdateSectionInsights', []),
);

export const selectFooterConfig = createSelector([selectAppSate], (state) =>
  get(state, 'footerConfig', []),
);

export const getFooterConfig = createSelector([selectAppSate], (state) =>
  get(state, 'getFooterConfig', []),
);

export const getSearchString = createSelector([selectAppSate], (state) =>
  get(state, 'searchString', []),
);
