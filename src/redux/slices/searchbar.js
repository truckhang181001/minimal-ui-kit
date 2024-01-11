import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState = {
  flatForm: 'all',
  store: 'all',
  startDate: new Date(new Date().setHours(0, 0)),
  endDate: new Date(new Date().setHours(23, 59)),
};

const slice = createSlice({
  name: 'searchbar',
  initialState,
  reducers: {
    setFlatForm(state, action) {
      state.flatForm = action.payload;
    },
    setStore(state, action) {
      state.store = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// action
export function setFlatFormAction(payload) {
  return () => {
    dispatch(slice.actions.setFlatForm(payload));
  };
}

export function setStoreAction(payload) {
  return () => {
    dispatch(slice.actions.setStore(payload));
  };
}

export function setStartDateAction(payload) {
  return () => {
    dispatch(slice.actions.setStartDate(payload));
  };
}

export function setEndDateAction(payload) {
  return () => {
    dispatch(slice.actions.setEndDate(payload));
  };
}
