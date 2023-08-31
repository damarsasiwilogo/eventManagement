import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Regist from "./pages/Regist";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}></Route>
				<Route
					path="/Dashboard"
					element={<Dashboard />}></Route>
				<Route
					path="/Transaction"
					element={<Transaction />}></Route>
			</Routes>
		</>
	);
}

export default App;
