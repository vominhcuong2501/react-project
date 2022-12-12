import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  listInsights;
  listDetailPage: any;
  topics: string;
  services: string;
  listTopics: [];
  listServices: [];
}

const initialState: State = {
  listInsights: [],
  listDetailPage: [],
  topics: '',
  services: '',
  listTopics: [],
  listServices: [],
};

const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setListInsights(state, { payload }: PayloadAction<any>) {
      state.listInsights = payload;
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
  },
});

export const { setListInsights, setTopicOption, setServicesOptions } = insightSlice.actions;

export default insightSlice;
