import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
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

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal(state, action) {
      const { type, id } = action.payload;
      return { isOpen: true, type, channelId: id };
    },

    closeModal() {
      return { isOpen: false, type: null, channelId: null };
    },
  },
});

export const getChannelId = (state) => state.modal.channelId;
export const getModalInfo = (state) => state.modal;
export const { closeModal, openModal } = modalSlice.actions;
export const modalSliceReducer = modalSlice.reducer;
