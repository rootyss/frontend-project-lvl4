import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export default createAsyncThunk(
  'channelsInfo/fetchInfo',
  async (token, { rejectWithValue }) => {
    try {
      const resp = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      return resp.data;
    } catch (err) {
      if (err.isAxiosError) {
        return err.name;
      }
      return rejectWithValue(err);
    }
  },
);
