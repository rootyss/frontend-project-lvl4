import { createSlice } from '@reduxjs/toolkit';
import fetchInfo from './createAsyncThunk.js';

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

const fetchingStateSliceReducer = fetchingState.reducer;

export default fetchingStateSliceReducer;
