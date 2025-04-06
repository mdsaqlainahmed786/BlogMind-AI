import React, { useState } from "react";
import { Brain, Mail, Lock, ArrowRight } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import { Link } from "react-router-dom";
import AnimatedBackground from "../Plasma";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

function LoginUser() {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  interface ValidationErrors {
    email: string;
    password: string;
  }

  interface FormData {
    email: string;
    password: string;
  }

  const [touched, setTouched] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: "",
  });
  interface ValidationErrors {
    email: string;
    password: string;
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      }
      case "password":
        return value.length < 8
          ? "Password must be at least 8 characters long"
          : "";
      default:
        return "";
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };
  const handleUserLogin = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Login successful:", response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
    });

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      handleUserLogin(formData);
    }
  };

  const getInputClassName = (fieldName: keyof ValidationErrors) => `
    w-full  border rounded-lg py-3 px-12 text-white placeholder-blue-300 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-blue-400/20"
    }
  `;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-32">
      <Navbar />
      <AnimatedBackground />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <Brain className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">Log In</h1>
          <p className="text-blue-200 mt-2">Log into your account</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                    touched.email && errors.email && "top-1/3"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  className={getInputClassName("email")}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  value={formData.email}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                    touched.password && errors.password && "top-1/3"
                  }`}
                />
                <input
                 type={showPassword ? "text" : "password"}
                  className={getInputClassName("password")}
                  placeholder="••••••••"
                  value={formData.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-400  ${
                    touched.password && errors.password && "top-1/3"
                  }`}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button className="relative inline-flex w-full cursor-pointer items-center justify-center px-10 py-3 overflow-hidden font-medium tracking-tighter text-white bg-gray-800 rounded-lg group transition-transform duration-150 active:scale-95">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white rounded-lg group-hover:w-full group-hover:h-full"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <div className="relative flex items-center space-x-2 text-white group-hover:text-white">
                <span>Log In</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </div>
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-blue-200">
            Don't Have an account?{" "}
            <button className="text-blue-400 cursor-pointer hover:text-blue-300 font-medium">
              <Link
                to="/user/register"
                className="text-blue-400 hover:text-blue-300"
              >
                <span className="font-semibold">Register Here</span>
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
