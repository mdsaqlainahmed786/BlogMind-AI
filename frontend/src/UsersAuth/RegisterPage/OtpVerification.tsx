import React, { useState, useEffect, useCallback } from "react";
import { Brain, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import AnimatedBackground from "../Plasma";
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (otp.length !== 6) {
          throw new Error("Please enter a valid 6-digit code");
        }
        console.log("OTP submitted:", otp);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
          { otp },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("OTP verification response:", response.data);
        if (response.status === 200) {
          setIsSuccess(true);
          setError("");
          setOtp("");
          navigate("/");
        } else if (
          response.data.message === "Invalid otp" ||
          response.status === 400
        ) {
          setError("Invalid OTP! Please try again");
        }

        // setIsSuccess(true);
      } catch (err) {
        setError("Verification failed");
        console.error("Error during OTP verification:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [otp]
  );
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-32 relative">
      <Navbar />
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <Brain className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">
            Verify Your Code
          </h1>
          <p className="text-gray-400 mt-2">
            Enter the 6-digit code we sent you to your registered email address.
          </p>
        </div>

        <div className="bg-[#1a1f36]/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-gray-300 text-xl font-medium mb-2">
                Verification Code
              </label>
              <div className="flex items-center justify-center">
                <InputOTP
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  autoFocus
                  className={error ? "otp-error" : ""}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                    <InputOTPSlot
                      index={1}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                    <InputOTPSlot
                      index={2}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2 text-gray-500" />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        active:border-blue-500 active:ring-1 active:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                    <InputOTPSlot
                      index={4}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                    <InputOTPSlot
                      index={5}
                      className={`
                        w-12 h-12 text-lg
                        bg-[#0f1225] border border-gray-700
                        text-white placeholder-gray-500
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        transition-all duration-200
                        ${error ? "border-red-500 bg-red-500/5" : ""}
                      `}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 text-red-400 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {isSuccess && (
                <div className="flex items-center justify-center space-x-2 text-green-400 text-sm animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verification successful!</span>
                </div>
              )}
            </div>

            <button
              className={`relative inline-flex w-full cursor-pointer items-center justify-center px-10 py-2 overflow-hidden font-medium tracking-tighter text-white bg-gray-800 rounded-lg group transition-transform duration-150 active:scale-95 
                `}
              type="submit"
              disabled={isLoading}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white rounded-lg group-hover:w-full group-hover:h-full"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <div className="relative flex items-center space-x-2 text-white group-hover:text-white">
                <span>Verify OTP</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </div>
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-neutral-500 text-sm">
              This OTP will expire in 10 minutes, If it expires you need to
              register again!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
