import { Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
