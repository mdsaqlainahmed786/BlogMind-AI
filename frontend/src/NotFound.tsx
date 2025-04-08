import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import AnimatedBackground from '@/UsersAuth/Plasma';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 max-w-2xl w-full border border-white/20 shadow-2xl">
          <div className="text-center space-y-6">
            {/* 404 Number */}
            <div className="relative">
              <h1 className="text-[120px] md:text-[180px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 leading-none select-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <Ghost className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Page Not Found
              </h2>
              <p className="text-blue-200 max-w-md mx-auto">
                Oops! It seems like you've entered into uncharted territory. The page you're looking for has lost forever into the digital void.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="group flex cursor-pointer items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white w-full sm:w-auto justify-center"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Go Back</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="group flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-300 text-white w-full sm:w-auto justify-center"
              >
                <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Return Home</span>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-600 rounded-full opacity-10 animate-pulse delay-300" />
          </div>
        </div>
      </div>

      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent top-1/4 -translate-x-full animate-[slide_3s_linear_infinite]" />
        <div className="absolute left-0 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent bottom-1/4 -translate-x-full animate-[slide_3s_linear_infinite_0.5s]" />
      </div>

      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;