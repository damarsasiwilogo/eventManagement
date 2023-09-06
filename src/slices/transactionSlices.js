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
    discountedTotalPricesByReff: 0,
    discountedTotalPricesByCoupon: 0,
    discountedTotalPrices: 0,
    formData: {
      name: "",
      email: "",           
      telepon: "",
      identitas: "",
      date: "",
      month: "",
      year: "",
    },
    
    paymentMethodByNumber: {
      paymentBy : "",
      nohp : "",
    },

    paymentMethodByVirtualAcc: {
      BCA : "60022200321",
      Mandiri: "70021239922",
      BNI : "23003044502",
    },

    creditCardData: {
      cardHolder: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cvvNumber : "",
    },
  },
  reducers: {
    setTicketQuantities: (state, action) => {
      state.ticketQuantities = action.payload;
    },

    setTotalPrices: (state, action) => {
      state.totalPrices = action.payload;

    },
    setDiscountedTotalPricesByReff: (state, action) => {
      state.discountedTotalPricesByReff = action.payload;
    },
    setDiscountedTotalPricesByCoupon: (state, action) => {
      state.discountedTotalPricesByCoupon = action.payload;
    },
    setDiscountedTotalPrices: (state) => {
      state.discountedTotalPrices = state.totalPrices - state.discountedTotalPricesByCoupon - state.discountedTotalPricesByReff;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setPaymentMethodByNumber: (state, action) => {
      state.paymentMethodByNumber = action.payload;
    },
    setPaymentMethodByVirtualAcc: (state, action) => {
      state.paymentMethodByVirtualAcc = action.payload;
    },
    setCreditCardData: (state, action) => {
      state.creditCardData = action.payload;
    },
    resetTransaction: (state) => {
      state.ticketQuantities = {
        Gold: 0,
        Platinum: 0,
        Diamond: 0,
      };
      state.totalPrices = 0;
      state.discountedTotalPrices = 0;
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


export const { 
setTicketQuantities, 
setTotalPrices, 
setDiscountedTotalPrices,
setDiscountedTotalPricesByReff,
setDiscountedTotalPricesByCoupon,
setFormData, 
resetTransaction, 
setPaymentMethodByNumber,
setPaymentMethodByVirtualAcc,
setCreditCardData } = transactionSlices.actions;
export default transactionSlices.reducer;
