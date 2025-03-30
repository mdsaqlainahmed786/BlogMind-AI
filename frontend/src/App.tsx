import LandingPage from "./landingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./UsersAuth/LoginUserPage/LoginUser";
import RegisterUser from "./UsersAuth/RegisterPage/registerUser";
import MemberShip from "./MemberShip/memberShip";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/users/login" element={<LoginUser />} />
          <Route path="/users/membership" element={<MemberShip />} />

          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
