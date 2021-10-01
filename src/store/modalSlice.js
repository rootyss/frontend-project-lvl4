import { createSlice } from '@reduxjs/toolkit';

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
