import  { useState, useEffect } from 'react';
import { Brain, Image, Check, Crown, Zap } from 'lucide-react';
import Navbar from '@/landingPage/NavBar';
import AnimatedBackground from '@/UsersAuth/Plasma';
import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

// Define plan details for consistency
const PLANS = {
  BASIC: {
    id: 'BASIC',
    name: 'Basic Plan',
    price: 'Free',
    monthlyPrice: 0,
    icon: Zap,
    description: 'Current Plan',
    features: [
      '0 AI-generated blogs',
      'Basic formatting tools',
      'Community support'
    ],
    buttonText: 'Your Current Plan',
    buttonClass: 'bg-gray-500 text-white'
  },
  STANDARD: {
    id: 'STANDARD',
    name: 'Standard Plan',
    price: '₹299',
    monthlyPrice: 29900, // in paise for Razorpay
    icon: Image,
    description: 'Perfect for beginners',
    features: [
      '10 AI-generated blogs per month',
      'AI image generation',
      'Advanced formatting tools',
      'Priority support',
      'Standard Badge on your profile'
    ],
    buttonText: 'Upgrade Now',
    buttonClass: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
  },
  PREMIUM: {
    id: 'PREMIUM',
    name: 'Premium Plan',
    price: '₹599',
    monthlyPrice: 59900, // in paise for Razorpay
    icon: Crown,
    description: 'For power users',
    features: [
      '25 AI-generated blogs per month',
      'Advanced AI image generation',
      'SEO optimization tools',
      'Analytics dashboard',
      '24/7 priority support',
      'Premium badge on your profile'
    ],
    buttonText: 'Upgrade Now',
    buttonClass: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
  }
};

function Membership() {
  const [currentPlan, setCurrentPlan] = useState('BASIC');
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore((state) => state.user);
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    membershipPlan?: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
        if (response.data.membershipPlan) {
          setCurrentPlan(response.data.membershipPlan);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpgrade = async (plan: string) => {
    if (plan === currentPlan) {
      alert('You are already subscribed to this plan');
      return;
    }

    setLoading(true);
    try {
      // Create order on server
      const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiblogs/create-membership-order`, {
        plan: plan
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
      
      const options = {
        key: orderResponse.data.key,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "AI Blog Platform",
        description: `Upgrade ${PLANS[plan as keyof typeof PLANS].name}`,
        order_id: orderResponse.data.orderId,
        prefill: {
          name: userData?.firstName + ' ' + userData?.lastName || '',
          email: userData?.email || '',
        },
        theme: {
          color: "#3182ce"
        },
        handler: async function(response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          try {
            // Verify payment on your server
            const verifyResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiblogs/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }
          );
            
            if (verifyResponse.status === 200) {
              alert('Membership upgraded successfully!');
              // Update local state to reflect new plan
              setCurrentPlan(plan);
              // Optional: Redirect or refresh page
              window.location.reload();
            }
          } catch (error) {
            console.error('Payment verification failed', error);
            alert('Payment verification failed. Please contact support.');
          }
        }
      };
      
      // Open Razorpay checkout
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Could not initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Navbar />
      <AnimatedBackground />
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
          <div className={`backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border ${currentPlan === 'BASIC' ? 'border-blue-400/30' : 'border-white/20'} transform hover:scale-105 transition-transform duration-300`}>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{PLANS.BASIC.name}</h2>
              <div className="text-4xl font-bold text-white mb-4">
                {PLANS.BASIC.price}
              </div>
              <p className="text-blue-200 mb-6">{PLANS.BASIC.description}</p>
            </div>
            <div className="space-y-4">
              {PLANS.BASIC.features.map((feature, index) => (
                <div key={index} className="flex items-center text-blue-200">
                  <Check className="w-5 h-5 mr-3 text-blue-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button 
              className={`w-full mt-8 ${PLANS.BASIC.buttonClass} rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200`}
              disabled={true}
            >
              {currentPlan === 'BASIC' ? 'Your Current Plan' : 'Basic Plan'}
            </button>
          </div>

          {/* Standard Plan */}
          <div className={`backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border ${currentPlan === 'STANDARD' ? 'border-blue-400/30' : 'border-white/20'} transform hover:scale-105 transition-transform duration-300 relative`}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Image className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{PLANS.STANDARD.name}</h2>
              <div className="text-4xl font-bold text-white mb-4">
                {PLANS.STANDARD.price}<span className="text-xl font-normal text-blue-200">/mo</span>
              </div>
              <p className="text-blue-200 mb-6">{PLANS.STANDARD.description}</p>
            </div>
            <div className="space-y-4">
              {PLANS.STANDARD.features.map((feature, index) => (
                <div key={index} className="flex items-center text-blue-200">
                  <Check className="w-5 h-5 mr-3 text-blue-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleUpgrade('STANDARD')}
              disabled={loading || currentPlan === 'STANDARD'}
              className={`w-full mt-8 ${currentPlan === 'STANDARD' ? 'bg-gray-500' : PLANS.STANDARD.buttonClass} rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? 'Processing...' : currentPlan === 'STANDARD' ? 'Your Current Plan' : 'Upgrade Now'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className={`backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border ${currentPlan === 'PREMIUM' ? 'border-blue-400/30' : 'border-white/20'} transform hover:scale-105 transition-transform duration-300`}>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Crown className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{PLANS.PREMIUM.name}</h2>
              <div className="text-4xl font-bold text-white mb-4">
                {PLANS.PREMIUM.price}<span className="text-xl font-normal text-blue-200">/mo</span>
              </div>
              <p className="text-blue-200 mb-6">{PLANS.PREMIUM.description}</p>
            </div>
            <div className="space-y-4">
              {PLANS.PREMIUM.features.map((feature, index) => (
                <div key={index} className="flex items-center text-blue-200">
                  <Check className="w-5 h-5 mr-3 text-blue-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleUpgrade('PREMIUM')}
              disabled={loading || currentPlan === 'PREMIUM'}
              className={`w-full mt-8 ${currentPlan === 'PREMIUM' ? 'bg-gray-500' : PLANS.PREMIUM.buttonClass} rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? 'Processing...' : currentPlan === 'PREMIUM' ? 'Your Current Plan' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;