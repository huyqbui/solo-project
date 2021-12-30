import { createSlice } from '@reduxjs/toolkit';

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    active: null,
  },
  reducers: {
    showToggle: (state) => {
      state.active = true
    },
    hideToggle: (state) => {
      state.active = false
    }
  },
});

export const { showToggle, hideToggle } = toggleSlice.actions;

export const selecttoggle = (state) => state.toggle.active;

export default toggleSlice.reducer;
