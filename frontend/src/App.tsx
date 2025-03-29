import { Brain, Sparkles, Newspaper, Rocket, Lock } from 'lucide-react';
import { TestimonialsCarousel } from './landingPage/TestimonialsCarousel';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <nav className="container mx-auto px-6 py-4 sticky top-0 bg-white/5 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-pink-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              BlogMind AI
            </span>
          </div>
          <div className="hidden items-center md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Transform Your Ideas into Engaging Content
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Harness the power of AI to create compelling blog posts that captivate your audience. Write smarter, not harder.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 cursor-pointer to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              Start Creating Now
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Unleash Your Creative Potential
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:transform hover:-translate-y-1 transition">
              <Newspaper className="h-12 w-12 text-pink-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Writing</h3>
              <p className="text-gray-300">Generate engaging blog posts with our advanced AI that understands your style and tone.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:transform hover:-translate-y-1 transition">
              <Rocket className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">SEO Optimization</h3>
              <p className="text-gray-300">Automatically optimize your content for search engines to reach a wider audience.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:transform hover:-translate-y-1 transition">
              <Lock className="h-12 w-12 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Premium Content</h3>
              <p className="text-gray-300">Access exclusive features and premium AI capabilities with our membership plan.</p>
            </div>
          </div>
        </section>
        <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            What are users say
          </h2>
          <TestimonialsCarousel />
        </section>
      </main>
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-pink-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                BlogMind AI
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;