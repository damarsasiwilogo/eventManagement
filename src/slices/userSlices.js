import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	totalData: 0,
	isLoaded: false,
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setInitialData(state, action) {
			state.users = action.payload;
			state.totalData = action.payload.length.length;
			state.isLoaded = true;
		},
		add(state, action) {
			state.users.push(action.payload);
			state.totalData++;
		},
	},
});

export const { setInitialData, add } = usersSlice.actions;
export default usersSlice.reducer;
