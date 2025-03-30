import React from 'react';
import { Brain, Image, Check, Crown, Zap } from 'lucide-react';
import Navbar from '@/landingPage/NavBar';
import AnimatedBackground from '@/UsersAuth/Plasma';



function Membership() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <Navbar />
        <AnimatedBackground/>
      <div className="w-full max-w-6xl py-36">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center">
            <Brain className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">Choose Your Plan</h1>
          <p className="text-blue-200 mt-2">Select the perfect plan for your AI blogging needs</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Basic Plan</h2>
              <div className="text-4xl font-bold text-white mb-4">
                Free
              </div>
              <p className="text-blue-200 mb-6">Current Plan</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>0 AI-generated blogs</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Basic formatting tools</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Community support</span>
              </div>
            </div>
            <button className="w-full mt-8 bg-gray-500 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200">
             Your Current Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-blue-400/30 transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Image className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Standard Plan</h2>
              <div className="text-4xl font-bold text-white mb-4">
                $19<span className="text-xl font-normal text-blue-200">/mo</span>
              </div>
              <p className="text-blue-200 mb-6">Perfect for beginners</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>10 AI-generated blogs per month</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>AI image generation</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Advanced formatting tools</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Priority support</span>
              </div>
            </div>
            <button className="w-full mt-8 bg-gradient-to-r cursor-pointer from-blue-400 to-blue-500 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200">
              Upgrade Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Crown className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Premium Plan</h2>
              <div className="text-4xl font-bold text-white mb-4">
                $49<span className="text-xl font-normal text-blue-200">/mo</span>
              </div>
              <p className="text-blue-200 mb-6">For power users</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>25 AI-generated blogs per month</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Advanced AI image generation</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>SEO optimization tools</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>Analytics dashboard</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Check className="w-5 h-5 mr-3 text-blue-400" />
                <span>24/7 priority support</span>
              </div>
            </div>
            <button className="w-full mt-8 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;