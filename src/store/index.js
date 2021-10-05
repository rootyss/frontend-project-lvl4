import { modalSliceReducer } from './modalSlice.js';
import { channelsInfoSliceReducer } from './channelsInfoSlice.js';
import { messagesInfoSliceReducer } from './messagesInfoSlice.js';
import fetchingStateSliceReducer from './fetchingState.js';

export default {
  channelsInfo: channelsInfoSliceReducer,
  messagesInfo: messagesInfoSliceReducer,
  fetchingState: fetchingStateSliceReducer,
  modal: modalSliceReducer,
};
