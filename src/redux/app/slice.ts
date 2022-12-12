import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  counter: number;
  user: object;
  headerMenu: [];
  footerMenu: [];
  listConsultingServices: [];
  listUpdateSectionInsights: [];
}

const initialState: State = {
  counter: 0,
  user: {},
  headerMenu: [],
  footerMenu: [],
  listConsultingServices: [],
  listUpdateSectionInsights: [],
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
  },
});

export const {
  setCounter,
  setUser,
  setMenuHeader,
  setFooterMenu,
  setListConsultingService,
  setListUpdateSectionInsights,
} = appSlice.actions;

export default appSlice;
