import { Sparkles, Newspaper, Rocket, Lock, Plus, Minus } from "lucide-react";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { useNavigate } from "react-router-dom";
import NeonCardDemo from "./FeaturesCard";
import {useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Navbar from "./NavBar";
import { useUserStore } from "@/stores/useUserStore";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { Cover } from "@/components/ui/cover";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between cursor-pointer items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-white">{question}</span>
        <span className="ml-6">
          {isOpen ? (
            <Minus className="w-6 h-6 text-blue-400" />
          ) : (
            <Plus className="w-6 h-6 text-blue-400" />
          )}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-400">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll Progress:", latest);
  })
  const navigate = useNavigate();
  const { user } = useUserStore();
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const info = [
    {
      id: 1,
      icon: <Newspaper />,
      title: "AI-Powered Writing",
      content:
        "Generate engaging blog posts with our advanced AI that understands your style and tone.",
      gradientColors: ["#00FFFF", "#0066FF", "#00FFFF"],
      titleColor: "from-cyan-200 to-cyan-300",
      glowIntensity: 0.5,
    },
    {
      id: 2,
      icon: <Rocket />,
      title: "HD Image Generation",
      content:
        "Create stunning images to complement your content, all generated in high definition.",
      gradientColors: ["#00FFFF", "#0066FF", "#00FFFF"],
      titleColor: "from-cyan-200 to-cyan-300",
      glowIntensity: 0.5,
    },
    {
      id: 3,
      icon: <Lock />,
      title: "Premium Content",
      content:
        "Access exclusive features and premium AI capabilities with our membership plan.",
      gradientColors: ["#00FFFF", "#0066FF", "#00FFFF"],
      titleColor: "from-cyan-200 to-cyan-300",
      glowIntensity: 0.5,
    },
  ];

  const faqs = [
    {
      question: "How does the AI writing assistant work?",
      answer: "Our AI writing assistant uses advanced machine learning algorithms to understand your writing style and content requirements. It analyzes your input and generates high-quality, engaging content while maintaining your unique voice and tone. The AI continuously learns from feedback to improve its output quality."
    },
    {
      question: "What types of content can I create?",
      answer: "You can create a wide variety of content including blog posts, articles, social media content, product descriptions, and more. Our platform is versatile enough to handle different writing styles and topics, from technical content to creative storytelling."
    },
    {
      question: "How does the image generation feature work?",
      answer: "Our HD image generation feature uses state-of-the-art AI models to create unique, high-quality images based on your descriptions. Simply describe what you want, and the AI will generate images that perfectly complement your content while maintaining high resolution and visual appeal."
    },
    {
      question: "What's included in the premium membership?",
      answer: "Premium membership gives you access to advanced AI capabilities, priority processing, higher word limits, HD image generation, and exclusive templates. You'll also get priority support and early access to new features as they're released."
    },
    {
      question:"How do I cancel my subscription?",
      answer:"You can just mail us with all details of your subscription and we will cancel it for you within 24 hours."
    }
  ];

  return (
    <div className="">
      <Navbar />
      <div className="absolute w-full h-full inset-0 opacity-50 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-floating overflow-hidden"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <main>
        <section className="container mx-auto px-6 pt-64 pb-48 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Transform Your Ideas into Engaging Content <br /> at <Cover>warp speed</Cover>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Harness the power of AI to create compelling blog posts that
            captivate your audience. Write smarter, not harder.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              style={{
                filter: `
                   drop-shadow(0 0 3px #7928CA) 
                   drop-shadow(0 0 4px #0070F3)`,
              }}
              onClick={() => {
                if (!user) {
                  navigate("/user/login");
                } else if (
                  user.MemberShipPlan === "STANDARD" ||
                  user.MemberShipPlan === "PREMIUM"
                ) {
                  navigate("blog/create");
                } else if (user.MemberShipPlan === "BASIC") {
                  navigate("/user/membership");
                }
              }}
              className="bg-gradient-to-r from-blue-500 cursor-pointer to-blue-800 px-5 py-3 rounded-md text-white font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2 hover:scale-105 transform duration-200"
            >
              <span className="bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
              <Sparkles className="h-5 w-5" />
              Start Creating Now
            </button>

            <button
              onClick={() => navigate("/blogs/all")}
              className="hover:bg-white hover:text-gray-500 md:hover:bg-transparent md:hover:text-white relative cursor-pointer items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-md group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                Start Reading
              </span>
              <span className="absolute inset-0 border-2 border-white rounded-md"></span>
            </button>
          </div>
        </section>
        <section id="features" className="container mx-auto px-6 py-20 ">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Unleash Your Creative Potential
          </h2>
          <NeonCardDemo info={info} />
        </section>
        <section className="pt-72 md:pt-36">
          <div
            className="h-[1000px] md:h-[150vh] w-full rounded-md relative pt-40 overflow-clip"
            ref={ref}
          >
            <GoogleGeminiEffect
              pathLengths={[
                pathLengthFirst,
                pathLengthSecond,
                pathLengthThird,
                pathLengthFourth,
                pathLengthFifth,
              ]}
            />
          </div>
        </section>
        <section
          id="features"
          className="container mx-auto px-6 md:pb-20 -mt-96 md:pt-28"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            What Our Users Say
          </h2>
          <TestimonialsCarousel />
        </section>
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to know about our AI-powered content creation platform
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}