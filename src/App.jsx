import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Transaction from "./pages/Transaction";
import MyTickets from "./pages/MyTickets"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialData } from "./slices/userSlices";
import { useToast } from "@chakra-ui/react";
import api from "./api";

function App() {
	const dispatch = useDispatch();
	const toast = useToast();
	useEffect(() => {
		api
			.get("/users")
			.then((res) => {
				dispatch(setInitialData(res.data));
			})
			.catch((error) => {
				dispatch(setInitialData([]));
				toast({
					title: "Something is wrong",
					description: error.message,
					status: "error",
				});
			});
	}, [dispatch, toast]);
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}></Route>
				<Route
					path="/Transaction/:id"
					element={<Transaction />}></Route>
				<Route
					path="/MyTickets/"
					element={<MyTickets />}></Route>
			</Routes>
		</>
	);
}

export default App;
