import { ConfigTXT } from '@interfaces/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  configOurDifferenceAndValues: ConfigTXT;
  configMethodologyOfApproachHTML: ConfigTXT;
  configMethodologyOfApproachJSON: ConfigTXT;
}

const initConfigState = {
  config: null,
  iat: null,
  iss: null,
  isSuccessful: null,
};

const initialState: State = {
  // Home page
  configOurDifferenceAndValues: initConfigState,
  configMethodologyOfApproachHTML: initConfigState,
  configMethodologyOfApproachJSON: initConfigState,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigMethodologyOfApproachHTML(state, { payload }: PayloadAction<ConfigTXT>) {
      state.configMethodologyOfApproachHTML = payload;
    },
    setConfigMethodologyOfApproachJSON(state, { payload }: PayloadAction<ConfigTXT>) {
      state.configMethodologyOfApproachJSON = payload;
    },
  },
});

export const { setConfigMethodologyOfApproachHTML, setConfigMethodologyOfApproachJSON } =
  configSlice.actions;

export default configSlice;
