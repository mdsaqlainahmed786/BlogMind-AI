import { useState, useEffect } from "react";
import { ChevronDown, Brain, NotebookPen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleBlur = () => setTimeout(() => setShowDropdown(false), 150);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/get-user`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("User fetched:", response.data);
        if (response.data) {
          setUser({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            email: response.data.email,
            avatar: response.data.avatar,
            MemberShipPlan: response.data.MembershipPlan,
            isVerified: response.data.isVerified,
            aiBlogsLeft: response.data.aiBlogsLeft,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const onLogOutHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Logout response:", response.data);
      clearUser();
      navigate("/user/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      } px-6 bg-white/10 backdrop-blur-md z-50 rounded-b-xl`}
    >
      <div className="flex items-center justify-between mx-auto w-full max-w-screen-xl">
        {/* Logo Section */}
        <div
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer space-x-2 flex-shrink-0"
        >
          <Brain
            className={`h-5 w-5 md:h-8 md:w-8 transition-colors duration-300 ${
              scrolled
                ? "text-blue-400 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                : "text-white"
            }`}
          />
          <span
            className={`text-lg md:text-2xl font-bold transition-all duration-300 ${
              scrolled
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                : "text-white"
            }`}
          >
            BlogMind AI
          </span>
        </div>

        {/* Right Side: Write + Profile */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
          {/* Write Button */}
          <div
            onClick={() => navigate("/blog/create")}
            className="flex items-center gap-2 group transition-colors duration-300 cursor-pointer"
          >
            <NotebookPen className="text-white group-hover:text-blue-400 transition-colors duration-300 h-5 w-5" />
            <span className="hidden md:block text-white group-hover:text-blue-400 transition-colors duration-300 text-sm">
              Start Writing
            </span>
          </div>

          {/* Profile or Get Started */}
          {user?.email ? (
            <div
              className="relative group md:hover:bg-transparent"
              onBlur={handleBlur}
            >
              <div
                className="flex items-center gap-2 md:gap-3 cursor-pointer"
                onClick={toggleDropdown}
              >
                {user.avatar === null || user.avatar === "" ? (
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                ) : (
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                  />
                )}
                <div className="hidden md:block text-left">
                  <h1 className="text-white font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <ChevronDown
                  className={`text-white transition-transform duration-200 h-5 w-5 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg py-2 z-50 transition-all duration-200
                ${
                  showDropdown
                    ? "visible opacity-100 scale-100"
                    : "invisible opacity-0 scale-95"
                }
                group-hover:visible group-hover:opacity-100 group-hover:scale-100 md:block`}
              >
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 text-sm text-center text-white hover:bg-white/10 transition duration-200"
                >
                  Profile
                </Link>
                <Link
                  to="/user/blogs"
                  className="block px-4 py-2 text-sm text-center text-white hover:bg-white/10 transition duration-200"
                >
                  Your Blogs
                </Link>
                <button
                  onClick={onLogOutHandler}
                  className="block w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/user/register")}
              className="flex bg-blue-500 p-2 rounded-lg items-center transition-colors duration-300 cursor-pointer hover:transform hover:scale-105 hover:duration-200 text-white shadow-lg shadow-blue-500/50"
            >
              <span className="">Get Started</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
