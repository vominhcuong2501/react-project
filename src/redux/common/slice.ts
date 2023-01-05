import { ConfigTXT } from '@interfaces/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initConfigState = {
  config: null,
  iat: null,
  iss: null,
  isSuccessful: null,
};
interface State {
  listInsights: [];
  listServices: [];
  breadcrumb: [];
  formConfig: any;
  awards: [];
  awardsConfig: '';
  listArticleAboutUs: '';
  configOurTeam: '';
  content: '';
  ip: [];
  userAgent: [];
  configLearMoreAbout: string;
  detailAwardLicenses: string;
  configContactMap: any;
  configContactSelect: any;
  configOurDifferenceAndValues: ConfigTXT;
  configContactForm: any;
  subscribeConfig: any;
}

const initialState: State = {
  listInsights: [],
  listServices: [],
  breadcrumb: null,
  formConfig: null,
  awards: [],
  awardsConfig: '',
  listArticleAboutUs: '',
  configOurTeam: '',
  content: '',
  ip: [],
  userAgent: [],
  configLearMoreAbout: '',
  detailAwardLicenses: null,
  configContactMap: null,
  configContactSelect: null,
  configOurDifferenceAndValues: initConfigState,
  configContactForm: null,
  subscribeConfig: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setListServices(state, { payload }: PayloadAction<any>) {
      state.listServices = payload;
    },
    setBreadcrumb(state, { payload }: PayloadAction<any>) {
      state.breadcrumb = payload;
    },
    setFormConfigTxt(state, { payload }: PayloadAction<any>) {
      state.formConfig = payload;
    },
    setAwards(state, { payload }: PayloadAction<any>) {
      state.awards = payload;
    },
    setAwardConfig(state, { payload }: PayloadAction<any>) {
      state.awardsConfig = payload;
    },
    setListArticleAboutUs(state, { payload }: PayloadAction<any>) {
      state.listArticleAboutUs = payload;
    },
    setConfigOurTeam(state, { payload }: PayloadAction<any>) {
      state.configOurTeam = payload;
    },
    setContent(state, { payload }: PayloadAction<any>) {
      state.content = payload;
    },
    setConfigLearMoreAbout(state, { payload }: PayloadAction<any>) {
      state.configLearMoreAbout = payload;
    },
    setDetailAwardLicenses(state, { payload }: PayloadAction<any>) {
      state.detailAwardLicenses = payload;
    },
    setConfigContactMap(state, { payload }: PayloadAction<any>) {
      state.configContactMap = payload;
    },
    setConfigContactSelect(state, { payload }: PayloadAction<any>) {
      state.configContactSelect = payload;
    },

    setConfigOurDifferenceAndValues(state, { payload }: PayloadAction<ConfigTXT>) {
      state.configOurDifferenceAndValues = payload;
    },
    setListInsights(state, { payload }: PayloadAction<any>) {
      state.listInsights = payload;
    },
    setConfigContactForm(state, { payload }: PayloadAction<any>) {
      state.configContactForm = payload;
    },
    setConfigSubscribeConfig(state, { payload }: PayloadAction<any>) {
      state.subscribeConfig = payload;
    },
  },
});

export const {
  setListInsights,
  setListServices,
  setBreadcrumb,
  setFormConfigTxt,
  setAwards,
  setAwardConfig,
  setListArticleAboutUs,
  setConfigOurTeam,
  setContent,
  setConfigLearMoreAbout,
  setDetailAwardLicenses,
  setConfigContactMap,
  setConfigContactSelect,
  setConfigOurDifferenceAndValues,
  setConfigContactForm,
  setConfigSubscribeConfig,
} = commonSlice.actions;

export default commonSlice;
