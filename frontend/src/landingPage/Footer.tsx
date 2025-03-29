import React from "react";
import { Brain } from "lucide-react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  ArrowRight,
} from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-col h-2/3 text-gray-300 overflow-hidden relative">
      {/* Main Content (Placeholder for Page Content) */}

      {/* Footer Section */}
      <footer className="relative z-10 text-gray-300 py-16">
        {/* Radial Glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[950px] w-[1450px] mx-auto rounded-full"
          style={{ transform: "translateY(50%)" }}
          aria-hidden="true"
        ></div>

        <div className="mb-8 h-[1px] w-screen mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-800" />
        <div className="container mx-auto px-6 lg:px-16 relative">
          {/* Upper Section */}
          <div className="flex flex-wrap justify-between gap-12">
            {/* Company Info */}
            <div className="w-full lg:w-1/4">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-10 w-10 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">
                  BlogMind AI
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering your Blogging journey with intelligent tools and
                insights. Navigate your thoughts with confidence and ease.
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="w-full lg:w-2/4 flex flex-wrap justify-between gap-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Explore
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Security
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Resources
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Pricing Plans
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Blog Articles
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Get Started
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Log In
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Mobile App
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Customer Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="w-full lg:w-1/4 flex flex-col space-y-6">
              <h3 className="text-white font-semibold text-lg">
                Connect With Us
              </h3>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <Youtube size={20} />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 border-t border-blue-600 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-6 lg:mb-0">
                <h3 className="text-white font-semibold text-xl mb-3">
                  Stay Informed with BlogMind AI
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  Get weekly blog creating tips, market insights, and exclusive
                  offers. Subscribe to our newsletter and never miss an update!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-auto px-4 py-2 pl-10 rounded-md text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Email for newsletter"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-500 cursor-pointer to-blue-500 px-4 py-2 rounded-full text-white font-semibold text-md hover:opacity-90 transition flex items-center justify-center gap-2">
                  Subscribe
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              By subscribing, you agree to receive BlogMind AI's newsletter and
              accept our{" "}
              <a
                href="#"
                className="text-gray-400 underline hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              . You can unsubscribe at any time.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-blue-600 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} BlogMind AI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm mt-4 lg:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
