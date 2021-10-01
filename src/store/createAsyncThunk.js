import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import { getAuthHeader } from '../utils.js';

export default createAsyncThunk(
  'channelsInfo/fetchInfo',
  async () => {
    try {
      const resp = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      return resp.data;
    } catch (err) {
      if (err.isAxiosError) {
        return err.name;
      }
      throw err;
    }
  },
);
