import React, { useState } from "react";
import { Brain, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import { Link } from "react-router-dom";
import AnimatedBackground from "../Plasma";
import { useNavigate } from "react-router-dom";

interface ValidationErrors {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

function RegisterUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? "First name is required" : "";
      case "lastName":
        return value.trim() === "" ? "Last name is required" : "";
      case "username": {
        const usernameRegex = /^[a-z]+-\d{3}$/;
        return !usernameRegex.test(value)
          ? "Username must be in lowercase, contain one hyphen and end with 3 numbers"
          : "";
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
    });

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      navigate("/users/verify", { state: { formData } });
      console.log("User registered:", formData);
    }
  };

  // const handleSubmitRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if()
  //   // Perform your registration logic here
  //   console.log("User registered:", formData);
  // }
  // Function to get the class name for input fields based on validation state

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
          <h1 className="text-3xl font-bold text-white mt-4">Create Account</h1>
          <p className="text-blue-200 mt-2">Join our community today</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4 w-full">
              <div className="flex-1">
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                      touched.firstName && errors.firstName && "top-1/3"
                    }`}
                  />
                  <input
                    type="text"
                    name="firstName"
                    className={getInputClassName("firstName")}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                      touched.lastName && errors.lastName && "top-1/3"
                    }`}
                  />
                  <input
                    type="text"
                    name="lastName"
                    className={getInputClassName("lastName")}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                    touched.username && errors.username && "top-1/4"
                  }`}
                />
                <input
                  type="text"
                  name="username"
                  className={getInputClassName("username")}
                  placeholder="john-123"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                )}
              </div>
            </div>

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
                  className={getInputClassName("email")}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Create Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5 ${
                    touched.password && errors.password && "top-1/3"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={getInputClassName("password")}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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

            <button
              className={`relative inline-flex w-full cursor-pointer items-center justify-center px-10 py-3 overflow-hidden font-medium tracking-tighter text-white bg-gray-800 rounded-lg group transition-transform duration-150 active:scale-95 ${
                errors.firstName ||
                errors.lastName ||
                errors.username ||
                errors.email ||
                errors.password
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={Object.values(errors).some((error) => error !== "")}
              type="submit"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white rounded-lg group-hover:w-full group-hover:h-full"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <div className="relative flex items-center space-x-2 text-white group-hover:text-white">
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </div>
            </button>
          </form>

          <p className="mt-6 text-center text-blue-200">
            Already have an account?{" "}
            <Link
              to="/users/login"
              className="text-blue-400 hover:text-blue-300"
            >
              <span className="font-semibold">Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
