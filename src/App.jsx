import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Regist from "./pages/Regist";
import DetailEvents from "./pages/DetailEvents";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}></Route>
        <Route path={'/events/:type'} element={<DetailEvents />}></Route>
				<Route
					path="/Dashboard"
					element={<Dashboard />}></Route>
				<Route
					path="/Transaction/:id"
					element={<Transaction />}></Route>
			</Routes>
		</>
	);

}

export default App;
