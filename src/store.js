import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlices";
import usersReducer from "./slices/userSlices";

const store = configureStore({
	reducer: {
		transaction: transactionReducer,
		users: usersReducer,
	},
});

export default store;
