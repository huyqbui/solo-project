import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    active: false,
  },
  reducers: {
    toggle: (state, action) => {
      state.active = action.payload
    },
  },
});

export const { toggle } = settingsSlice.actions;

export const selectsettings = (state) => state.settings.active;

export default settingsSlice.reducer;
