import LandingPage from "./landingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./UsersAuth/LoginUserPage/LoginUser";
import RegisterUser from "./UsersAuth/RegisterPage/registerUser";
import MemberShip from "./MemberShip/memberShip";
import OtpVerification from "./UsersAuth/RegisterPage/OtpVerification";
import AllBlogs from "./Blogs/allBlogs";
import Blog from "./Blogs/[blog]";
import CreateBlog from "./Blogs/CreateBlog";
import UserProfileEdit from "./UsersAuth/UserProfile/UserProfileEdit";
import YourBlogs from "./Blogs/YourBlogs";

import EditBlog from "./Blogs/EditBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/user/membership" element={<MemberShip />} />
          <Route path="/user/verify" element={<OtpVerification />} /> {/* I can add here /verify/:userID to make it unique */}4
          <Route path="/blogs/all" element={<AllBlogs />} />
          <Route path="/blog/:blogId" element={<Blog />} /> 
          <Route path="/blog/create" element={<CreateBlog />} /> {/* This is for creating a blog */}
          <Route path="/user/profile" element={<UserProfileEdit />} /> 
          <Route path="/user/blogs" element={<YourBlogs/>} /> 
          <Route path="/user/blog/edit/" element={<EditBlog />} /> {/* This is for editing a blog */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
