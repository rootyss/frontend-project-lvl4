import { configureStore } from '@reduxjs/toolkit';
import { channelsInfoSliceReducer, messagesInfoSliceReducer } from './slice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoSliceReducer,
    messagesInfo: messagesInfoSliceReducer,
  },
});
