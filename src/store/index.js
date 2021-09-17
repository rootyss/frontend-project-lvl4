import { configureStore } from '@reduxjs/toolkit';
import channelsInfoSliceReducer from './slice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoSliceReducer,
  },
});
