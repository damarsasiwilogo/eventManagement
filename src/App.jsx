import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Transaction/:id" element={<Transaction />}></Route>
      </Routes>
    </>
  );
}

export default App;
