import { dispatch } from '../store';
import axiosLocal from '../../utils/axiosLocal';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  data: null,
  isLoading: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    getListInvoiceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    getListInvoiceFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default invoiceSlice.reducer;

export const invoiceAction = invoiceSlice.actions;

// GET
export function getListInvoice() {
  return async () => {
    dispatch(invoiceSlice.actions.startLoading());
    try {
      const response = await axiosLocal.get('/api/v1/orders');
      dispatch(invoiceSlice.actions.getListInvoiceSuccess(response));
    } catch (error) {
      dispatch(invoiceSlice.actions.getListInvoiceFail(error));
    }
  };
}

// UPDATE
// DELETE
// INSERT...
