import { useState, useEffect } from "react";
import { ChevronDown, Brain, Search, NotebookPen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            className={`h-8 w-8 transition-colors duration-300 ${
              scrolled
                ? "text-blue-400 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                : "text-white"
            }`}
          />
          <span
            className={`text-2xl font-bold transition-all duration-300 ${
              scrolled
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                : "text-white"
            }`}
          >
            BlogMind AI
          </span>
        </div>

        {/* Search Bar - Hidden on mobile, shown on larger screens */}
        {location.pathname === "/blogs/all" && (
          <div className="hidden md:block flex-grow max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-20vw bg-white/10 backdrop-blur-xl border border-blue-400/20 rounded-full py-2 px-10 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
          {location.pathname === "/blogs/all" && (
            <button className="md:hidden p-2 text-white hover:text-blue-400 transition-colors cursor-pointer duration-300">
              <Search className="h-5 w-5" />
            </button>
          )}
          <div
            onClick={() => navigate("/blog/create")}
            className="flex items-center gap-2 group transition-colors duration-300 cursor-pointer"
          >
            <NotebookPen className="text-white group-hover:text-blue-400 transition-colors duration-300 cursor-pointer h-5 w-5" />
            <span className="hidden md:block text-white group-hover:text-blue-400 transition-colors duration-300 text-sm">
              Start Writing
            </span>
          </div>

          {/* User Profile */}
          <div className="relative group">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
              <img
                src="https://i.ibb.co/G2ZwZHB/x8aaxbjh8r6a1-modified.png"
                alt="Avatar"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-white/30 group-hover:border-white/70 transition-all duration-200"
              />
              <div className="hidden md:block text-left">
                <h1 className="text-white font-medium text-sm">Tony Stark</h1>
                <p className="text-xs text-gray-400">starktony@gmail.com</p>
              </div>
              <ChevronDown className="text-white group-hover:rotate-180 transition-transform duration-200 h-5 w-5" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg py-2 invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              <Link
                to="/user/profile"
                className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition duration-200"
              >
                Profile
              </Link>
              <Link
                to="/user/blogs"
                className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition duration-200"
              >
                Your Blogs
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition duration-200"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
