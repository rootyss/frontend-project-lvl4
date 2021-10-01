import { createSlice } from '@reduxjs/toolkit';
import fetchInfo from './createAsyncThunk.js';

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

export const getCurrentChannelMessages = (state) => {
  const { messages } = state.messagesInfo;
  const { currentChannelId } = state.channelsInfo;
  return messages.filter((message) => message.channelId === currentChannelId);
};

export const { addMessage } = messagesInfoSlice.actions;
export const messagesInfoSliceReducer = messagesInfoSlice.reducer;
