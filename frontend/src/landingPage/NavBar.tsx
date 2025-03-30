import { useState, useEffect } from "react";
import { ChevronDown, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  }

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
       
          <div onClick={handleLogoClick} className="flex items-center cursor-pointer space-x-2">
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
       

        {/* Right Actions */}
        <div className="flex items-center gap-6 z-10">
          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition"
            >
              Contact
            </a>
          </div>
          {/* User Profile */}
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://i.ibb.co/G2ZwZHB/x8aaxbjh8r6a1-modified.png"
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-white/30 group-hover:border-white/70 transition-all duration-200"
              />
              <div className="hidden md:block text-left">
                <h1 className="text-white font-medium">Tony Stark</h1>
                <p className="text-sm text-gray-400">starktony@gmail.com</p>
              </div>
              <ChevronDown className="text-white group-hover:rotate-180 transition-transform duration-200" />
            </div>
            <div className="absolute right-0 top-15 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg py-2 z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition duration-200"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition duration-200"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition duration-200"
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
