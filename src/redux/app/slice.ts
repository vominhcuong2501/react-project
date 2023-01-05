import { IListInsightsUpdate } from '@interfaces/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initState = {
  iat: null,
  iss: null,
  isSuccessful: null,
};
interface State {
  counter: number;
  user: object;
  headerMenu: [];
  footerMenu: [];
  listConsultingServices: [];
  listUpdateSectionInsights: [];
  footerConfig: any;
  getFooterConfig: any;
  searchString: IListInsightsUpdate;
}

const initialState: State = {
  counter: 0,
  user: {},
  headerMenu: [],
  footerMenu: [],
  listConsultingServices: [],
  listUpdateSectionInsights: [],
  footerConfig: null,
  getFooterConfig: null,

  searchString: {
    insights: null,
    ...initState,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMenuHeader(state, { payload }: PayloadAction<any>) {
      state.headerMenu = payload;
    },
    setFooterMenu(state, { payload }: PayloadAction<any>) {
      state.footerMenu = payload;
    },
    setCounter(state, { payload }: PayloadAction<number>) {
      state.counter = payload;
    },
    setUser(state, { payload }: PayloadAction<any>) {
      state.user = payload;
    },
    setListConsultingService(state, { payload }: PayloadAction<any>) {
      state.listConsultingServices = payload;
    },
    setListUpdateSectionInsights(state, { payload }: PayloadAction<any>) {
      state.listUpdateSectionInsights = payload;
    },
    setFooterConfig(state, { payload }: PayloadAction<any>) {
      state.footerConfig = payload;
    },
    setFooterConfigTxt(state, { payload }: PayloadAction<any>) {
      state.getFooterConfig = payload;
    },
    setSearchString(state, { payload }: PayloadAction<IListInsightsUpdate>) {
      state.searchString = payload;
    },
  },
});

export const {
  setCounter,
  setUser,
  setMenuHeader,
  setFooterMenu,
  setListConsultingService,
  setListUpdateSectionInsights,
  setFooterConfig,
  setFooterConfigTxt,
  setSearchString,
} = appSlice.actions;

export default appSlice;
