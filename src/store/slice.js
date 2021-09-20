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
        return;
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
  reducers: {
    addChanel(state, action) {},
    removeChanel(state, action) {},
    renameChanel(state, action) {},
  },
  extraReducers: {
    [fetchInfo.pending]: (state, action) => {},
    [fetchInfo.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
    },
    [fetchInfo.rejected]: (state, action) => {},
  },
});

export const { addChanel } = channelsInfoSlice.actions;
export const channelsInfoSliceReducer = channelsInfoSlice.reducer;

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  extraReducers: {
    [fetchInfo.pending]: (state, action) => {},
    [fetchInfo.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
    [fetchInfo.rejected]: (state, action) => {},
  },
});

export const messagesInfoSliceReducer = messagesInfoSlice.reducer;

const fetchingState = createSlice({
  name: 'fetchingState',
  initialState: {
    fetchingState: 'none',
  },
  extraReducers: {
    [fetchInfo.pending]: (state, action) => {
      state.fetchingState = 'pending';
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.fetchingState = 'finished';
    },
    [fetchInfo.rejected]: (state, action) => {
      state.fetchingState = 'error';
    },

  },
});

export const fetchingStateSliceReducer = fetchingState.reducer;
