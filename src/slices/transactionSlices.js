import { createSlice } from '@reduxjs/toolkit';

const transactionSlices = createSlice({
  name: 'transaction',
  initialState: {
    ticketQuantities: {
      Gold: 0,
      Platinum: 0,
      Diamond: 0,
    },
    totalPrices: 0,
    formData: {
      name: "",
      email: "",
      telepon: "",
      identitas: "",
      date: "",
      month: "",
      year: "",
    },
  },
  reducers: {
    setTicketQuantities: (state, action) => {
      state.ticketQuantities = action.payload;
    },

    setTotalPrices: (state, action) => {
      state.totalPrices = action.payload;

    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    
    resetTransaction: (state) => {
      state.ticketQuantities = {
        Gold: 0,
        Platinum: 0,
        Diamond: 0,
      };
      state.totalPrices = 0;
      state.formData = {
        name: "",
        email: "",
        telepon: "",
        identitas: "",
        date: "",
        month: "",
        year: "",
      };
    },
  },
});


export const { setTicketQuantities, setTotalPrices, setFormData, resetTransaction } = transactionSlices.actions;
export default transactionSlices.reducer;
