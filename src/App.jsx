import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Regist from "./pages/Regist";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}></Route>
				<Route
					path="/Regist"
					element={<Regist />}></Route>
			</Routes>
		</>
	);
}

export default App;
