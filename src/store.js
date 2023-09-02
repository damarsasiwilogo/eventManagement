import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlices';

const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

export default store;