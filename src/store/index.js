import { configureStore } from '@reduxjs/toolkit';
import { modalSliceReducer } from './modalSlice.js';
import { channelsInfoSliceReducer } from './channelsInfoSlice.js';
import { messagesInfoSliceReducer } from './messagesInfoSlice.js';
import fetchingStateSliceReducer from './fetchingState.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoSliceReducer,
    messagesInfo: messagesInfoSliceReducer,
    fetchingState: fetchingStateSliceReducer,
    modal: modalSliceReducer,
  },
});
