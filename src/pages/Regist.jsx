// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setInitialData } from "../slices/userSlices";
// import { useToast } from "@chakra-ui/react";
// import api from "../api";

// function Regist() {
// 	const dispatch = useDispatch();
// 	const toast = useToast();

// 	useEffect(() => {
// 		api
// 			.get("/users")
// 			.then((res) => {
// 				dispatch(setInitialData(res.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setInitialData([]));
// 				toast({
// 					title: "Something is wrong",
// 					description: error.message,
// 					status: "error",
// 				});
// 			});
// 	}, [dispatch, toast]);
// 	return <></>;
// }

// export default Regist;
