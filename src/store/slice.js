import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../utils.js';

export const fetchInfo = createAsyncThunk(
  'channelsInfo/fetchInfo',
  async () => {
    try {
      const resp = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      return resp.data;
    } catch (err) {
      if (err.isAxiosError) {
        return err.name;
      }
      throw err;
    }
  },
);

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {},
  extraReducers: {
    [fetchInfo.fulfilled]: (state, action) => {
      const { channels } = action.payload;
      return { ...state, channels };
    },
  },
});

export const { addChanel } = channelsInfoSlice.actions;
export const channelsInfoSliceReducer = channelsInfoSlice.reducer;

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const { messageData } = action.payload;
      state.messages.push(messageData);
    },
  },
  extraReducers: {
    [fetchInfo.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      return { ...state, messages };
    },
  },
});
export const { addMessage } = messagesInfoSlice.actions;
export const messagesInfoSliceReducer = messagesInfoSlice.reducer;

const fetchingState = createSlice({
  name: 'fetchingState',
  initialState: {
    fetchingState: 'none',
  },
  extraReducers: {
    [fetchInfo.pending]: (state) => ({ ...state, fetchingState: 'pending' }),
    [fetchInfo.fulfilled]: (state) => ({ ...state, fetchingState: 'finished' }),
    [fetchInfo.rejected]: (state) => ({ ...state, fetchingState: 'error' }),

  },
});

export const fetchingStateSliceReducer = fetchingState.reducer;
