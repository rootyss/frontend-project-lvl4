import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '.././utils.js';


export const fetchChanelsInfo = createAsyncThunk(
    'channelsInfo/fetchChanelsInfo',
    async () => {
          const resp = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    return resp.data;
    }
	);

const channelsInfoSlice = createSlice({
	name: 'channelsInfo',
	initialState: {
		channels: [],
		currentChannelId: 1,
		chanelFetchingState: 'none',
	},
	reducers: {
		addChanel(state, action) {},
		removeChanel(state, action) {},
		renameChanel(state, action) {},
	},
	extraReducers: {
		[fetchChanelsInfo.pending]: (state, action) => {
			state.chanelFetchingState = 'requested';
		},
		[fetchChanelsInfo.fulfilled]: (state, action) => {
            state.chanelFetchingState = 'finished';
            state.channels = action.payload.channels;
		},
		[fetchChanelsInfo.rejected]: (state, action) => {},
	},
});



export const { addChanel } = channelsInfoSlice.actions;
export default channelsInfoSlice.reducer;

/*const messagesInfo = createSlice({
	name: 'messagesInfo',
	initialState: {
		messages: [],
	},
	extraReducers: {
        [fetchInfo.pending]: (state, action) => {
			state.chanelFetchingState = 'requested';
		},
		[fetchInfo.fulfilled]: (state, action) => {
            state.chanelFetchingState = 'finished';
            state.channels = action.payload.messages;
            console.log(action.payload.messages);
		},
		[fetchInfo.rejected]: (state, action) => {},
	}
})*/