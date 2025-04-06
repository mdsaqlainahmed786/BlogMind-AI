import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircleCheckBig, WandSparkles, X } from "lucide-react";

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHeadingSubmit?: (heading: string) => void;
}
interface BlogData {
  id: string;
}

export default function AIGenerationModal({
  isOpen,
  onClose,
  onHeadingSubmit,
}: AIGenerationModalProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [heading, setHeading] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMemberShipActive, setIsMemberShipActive] = useState(true);
  const [blogData, setBlogData] = useState({} as BlogData);
  const [canClose, setCanClose] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGenerating && !isComplete) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isGenerating, isComplete]);

  const handleGenerateBlog = async (heading: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/aiblogs/generate`,
        { heading },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { blog } = response.data;
      setBlogData(blog);
      console.log("Blog data:", blog);

      if (response.status === 200 || blogData) {
        setProgress(100); // Move to 100% only when blog is present
        setIsComplete(true);
        setIsGenerating(false);
        setCanClose(true);
      }
    } catch (error) {
      console.error("Error generating blog:", error);
      setIsGenerating(false);
      setCanClose(true);
    }
  };

  const handleHeadingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heading.trim()) {
      setIsGenerating(true);
      setProgress(0);
      handleGenerateBlog(heading);
      setCanClose(false);
      if (onHeadingSubmit) {
        onHeadingSubmit(heading);
      }
    }
  };

  const handleEdit = () => {
    navigate("/user/blog/edit", { state: { blogData } });
    console.log("Blog data to edit:", blogData);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setIsComplete(false);
    setIsGenerating(false);
    setProgress(0);
    setCanClose(true);
    setHeading("");
    navigate('/blog/' + blogData.id)

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {isMemberShipActive ? (
        <>
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={canClose ? onClose : undefined}
          ></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
            {canClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {isComplete
                  ? "Blog Generated Successfully!"
                  : isGenerating
                  ? "Generating Blog with AI"
                  : "Create Blog with AI"}
              </h3>
              <p className="text-gray-300 text-sm">
                {isComplete
                  ? ""
                  : isGenerating
                  ? "Please wait while we create your blog content..."
                  : "Enter a heading for your blog to get started."}
              </p>
            </div>

            {!isGenerating && !isComplete ? (
              <form onSubmit={handleHeadingSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="blog-heading"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Blog Heading
                  </label>
                  <input
                    id="blog-heading"
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Enter your blog heading..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="relative inline-flex cursor-pointer items-center justify-center px-6 py-2 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg group hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    <WandSparkles className="w-5 h-5 mr-2" />
                    Generate Blog
                  </button>
                </div>
              </form>
            ) : isGenerating && !isComplete ? (
              <div className="mb-6">
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, #FF0080, #7928CA, #FF0080)",
                      backgroundSize: "200% 200%",
                      animation:
                        "gradient 3s ease infinite, glow 1s ease-in-out infinite alternate",
                      boxShadow:
                        "0 0 10px rgba(255, 0, 128, 0.7), 0 0 20px rgba(121, 40, 202, 0.5)",
                    }}
                  ></div>
                </div>
                <div className="text-right mt-2 text-sm text-white">
                  {progress}%
                </div>
              </div>
            ) : (
              blogData &&
              isComplete && (
                <div className="flex-col justify-center items-center text-center">
                  <div>
                    <CircleCheckBig className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <span>
                      Your AI powered Blog is ready to edit or publish 🎉🎉
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={handleClose}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleEdit}
                      className="flex-1 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 rounded-lg group hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                    >
                      Edit Blog
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px #ff0080,
                       0 0 10px #7928CA;
          }
          to {
            box-shadow: 0 0 10px #ff0080,
                       0 0 20px #7928CA;
          }
        }
      `}</style>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div
              className="flex justify-center items-center"
              onClick={onClose}
            ></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
              {canClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="flex justify-center items-center flex-col text-center">
                <h3 className="text-lg font-bold mb-4">Membership Required</h3>
                <p className="mb-4">
                  Upgrade your membership to generate blogs with AI.
                </p>
                <button
                  onClick={() => navigate("/user/membership")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Upgrade Membership
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
