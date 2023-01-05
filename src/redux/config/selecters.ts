import { AppState } from '@redux/configureStore';
import { getConfig } from '@utils/helpers';
import { createSelector } from 'reselect';

const selectAppSate = (state: AppState) => state.config;

export const getConfigMethodologyOfApproachHTML = createSelector([selectAppSate], (state) =>
  getConfig(state.configMethodologyOfApproachHTML),
);

export const getConfigMethodologyOfApproachJSON = createSelector([selectAppSate], (state) =>
  getConfig(state.configMethodologyOfApproachJSON),
);
