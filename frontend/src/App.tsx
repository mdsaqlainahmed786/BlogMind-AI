import LandingPage from "./landingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./UsersAuth/RegisterPage/registerUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/login" element={<LandingPage />} />

          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
