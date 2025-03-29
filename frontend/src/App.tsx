import { Sparkles, Newspaper, Rocket, Lock } from "lucide-react";
import { TestimonialsCarousel } from "./landingPage/TestimonialsCarousel";
import Navbar from "./landingPage/NavBar";
import { Footer } from "./landingPage/Footer";
import NeonCardDemo from "./landingPage/FeaturesCard";

function App() {
  const info = [
    {
      id: 1,
      icon: <Newspaper />,
      title: "AI-Powered Writing",
      content:
        "Generate engaging blog posts with our advanced AI that understands your style and tone.",
        gradientColors : ["#00FFFF", "#0066FF", "#00FFFF"]  , titleColor: "from-cyan-200 to-cyan-300" , glowIntensity : 0.5 
    },
    {
      id: 2,
      icon: <Rocket />,
      title: "SEO Optimization",
      content:
        "Automatically optimize your content for search engines to reach a wider audience.",
        gradientColors : ["#00FFFF", "#0066FF", "#00FFFF"]  , titleColor: "from-cyan-200 to-cyan-300" , glowIntensity : 0.5 
    },
    {
      id: 3,
      icon: <Lock />,
      title: "Premium Content",
      content:
        "Access exclusive features and premium AI capabilities with our membership plan.",
        gradientColors : ["#00FFFF", "#0066FF", "#00FFFF"]  , titleColor: "from-cyan-200 to-cyan-300" , glowIntensity : 0.5 
     
    
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-black to-blue-800">
      <div className="absolute w-full h-full inset-0 opacity-50 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Navbar />
      <main>
        <section className="container mx-auto px-6 pt-56 pb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 bg-clip-text text-transparent">
            Transform Your Ideas into Engaging Content
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Harness the power of AI to create compelling blog posts that
            captivate your audience. Write smarter, not harder.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 cursor-pointer to-blue-800 px-8 py-4 rounded-full text-white font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              Start Creating Now
            </button>
          </div>
        </section>
        <section id="features" className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Unleash Your Creative Potential
          </h2>
          <NeonCardDemo info={info} />
        </section>
        <section
          id="features"
          className="pt-80 container mx-auto px-6 md:py-20"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What are users say
          </h2>
          <TestimonialsCarousel />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
