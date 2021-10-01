import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import fetchInfo from './createAsyncThunk.js';

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel(state, action) {
      const { channelData } = action.payload;
      state.channels.push(channelData);
    },
    setCurrentChannelId(state, action) {
      const { id } = action.payload;
      return { ...state, currentChannelId: id };
    },
    removeChannel(state, action) {
      const { channelId } = action.payload;
      const newState = state;
      if (newState.currentChannelId === channelId) {
        const newCurrentChannel = state.channels[0].id;
        newState.currentChannelId = newCurrentChannel;
      }
      _.remove(newState.channels, (channel) => channel.id === channelId);
      return newState;
    },
    renameChannel(state, action) {
      const { channelId, channelName } = action.payload;
      const currentChannel = state.channels.find((channel) => channel.id === channelId);
      currentChannel.name = channelName;
    },
  },
  extraReducers: {
    [fetchInfo.fulfilled]: (state, action) => {
      const { channels } = action.payload;
      return { ...state, channels };
    },
  },
});

const getChannels = (state) => state.channelsInfo.channels;
const getCurrentChannel = (state) => state.channelsInfo.channels
  .find((channel) => channel.id === state.channelsInfo.currentChannelId);
const getChannelsNames = (state) => state.channelsInfo.channels.map((channel) => channel.name);

export { getChannels, getCurrentChannel, getChannelsNames };
export const {
  setCurrentChannelId, removeChannel, renameChannel, addChannel,
} = channelsInfoSlice.actions;
export const channelsInfoSliceReducer = channelsInfoSlice.reducer;
