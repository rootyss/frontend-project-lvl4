import { configureStore } from '@reduxjs/toolkit';
import { channelsInfoSliceReducer, messagesInfoSliceReducer, fetchingStateSliceReducer } from './slice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoSliceReducer,
    messagesInfo: messagesInfoSliceReducer,
    fetchingState: fetchingStateSliceReducer,
  },
});
