import LandingPage from "./landingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./UsersAuth/LoginUserPage/LoginUser";
import RegisterUser from "./UsersAuth/RegisterPage/registerUser";
import MemberShip from "./MemberShip/memberShip";
import OtpVerification from "./UsersAuth/RegisterPage/OtpVerification";
import AllBlogs from "./Blogs/allBlogs";
import Blog from "./Blogs/[blog]";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/users/login" element={<LoginUser />} />
          <Route path="/users/membership" element={<MemberShip />} />
          <Route path="/users/verify" element={<OtpVerification />} /> {/* I can add here /verify/:userID to make it unique */}4
          <Route path="/blogs/all" element={<AllBlogs />} />
          <Route path="/blog/:blog" element={<Blog />} /> 
          
          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
