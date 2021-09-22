import { configureStore } from '@reduxjs/toolkit';
import {
  channelsInfoSliceReducer, messagesInfoSliceReducer, fetchingStateSliceReducer, modalSliceReducer,
} from './slice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoSliceReducer,
    messagesInfo: messagesInfoSliceReducer,
    fetchingState: fetchingStateSliceReducer,
    modal: modalSliceReducer,
  },
});
