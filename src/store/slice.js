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
    addChanel(_state, _action) {},
    removeChanel(_state, _action) {},
    renameChanel(_state, _action) {},
  },
  extraReducers: {
    [fetchInfo.pending]: (_state, _action) => {},
    [fetchInfo.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
    },
    [fetchInfo.rejected]: (_state, _action) => {},
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
    [fetchInfo.pending]: (state, action_state, _action) => {},
    [fetchInfo.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
    [fetchInfo.rejected]: (_state, _action) => {},
  },
});

export const messagesInfoSliceReducer = messagesInfoSlice.reducer;
