import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  listInsights;
  listDetailPage: any;
  topics: string;
  services: string;
  listTopics: [];
  listServices: [];
  listFaq: [];
  listDataHub: [];
  listInSightsTypes: [];
  ip: [];
  userAgent: [];
  configDataHub: null;
  configFaq: null;
  subscribeConfig: null;
}

const initialState: State = {
  listInsights: [],
  listFaq: [],
  listDataHub: [],
  listInSightsTypes: [],
  ip: [],
  userAgent: [],
  listDetailPage: [],
  topics: '',
  services: '',
  listTopics: [],
  listServices: [],
  configDataHub: null,
  configFaq: null,
  subscribeConfig: null,
};

const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setListInsights(state, { payload }: PayloadAction<any>) {
      state.listInsights = payload;
    },
    setListsFaq(state, { payload }: PayloadAction<any>) {
      state.listFaq = payload;
    },
    setListsDataHub(state, { payload }: PayloadAction<any>) {
      state.listDataHub = payload;
    },
    setListDetailPage(state, { payload }: PayloadAction<any>) {
      state.listDetailPage = payload;
    },
    setTopicOption(state, { payload }: PayloadAction<any>) {
      state.topics = payload;
    },
    setServicesOptions(state, { payload }: PayloadAction<any>) {
      state.services = payload;
    },
    setListTopics(state, { payload }: PayloadAction<any>) {
      state.listTopics = payload;
    },
    setListServices(state, { payload }: PayloadAction<any>) {
      state.listServices = payload;
    },
    setListInSightsTypes(state, { payload }: PayloadAction<any>) {
      state.listInSightsTypes = payload;
    },
    setIp(state, { payload }: PayloadAction<any>) {
      state.ip = payload;
    },
    setUserAgent(state, { payload }: PayloadAction<any>) {
      state.userAgent = payload;
    },
    setConfigDataHub(state, { payload }: PayloadAction<any>) {
      state.configDataHub = payload;
    },
    setConfigFaq(state, { payload }: PayloadAction<any>) {
      state.configFaq = payload;
    },
    setConfigSubscribeConfig(state, { payload }: PayloadAction<any>) {
      state.subscribeConfig = payload;
    },
  },
});

export const {
  setListInsights,
  setTopicOption,
  setServicesOptions,
  setListsFaq,
  setListsDataHub,
  setListInSightsTypes,
  setListTopics,
  setIp,
  setUserAgent,
  setConfigDataHub,
  setConfigFaq,
  setConfigSubscribeConfig,
} = insightSlice.actions;

export default insightSlice;
