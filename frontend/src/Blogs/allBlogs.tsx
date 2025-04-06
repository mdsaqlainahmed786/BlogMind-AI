import { useState, useEffect } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Calendar,
  Sparkles,
  EllipsisVertical,
} from "lucide-react";
import Navbar from "../landingPage/NavBar";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AnimatedBackground from "@/UsersAuth/Plasma";
import axios from "axios";
interface Blog {
  id: string;
  heading: string;
  isAIGenerated: boolean;
  description: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  createdAt: string;
  imageUrl?: string;
  likeCount: number;
  Comments: [];
}

function Blogs() {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blogs`,
          {
            withCredentials: true,

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Blogs fetched:", response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <div className="min-h-screen py-24 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="space-y-8">
            {filteredBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <article
                  key={blog.id}
                  className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border cursor-pointer border-white/20 hover:bg-white/20 transition-all duration-300 mb-10"
                >
                  <div className="flex flex-col-reverse md:flex-row gap-6">
                    {/* Content Section */}
                    <div className="flex-grow">
                      {/* Author Info */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          {blog?.avatar === null || blog?.avatar === "" ? (
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm">
                              {blog.firstName[0]}
                              {blog.lastName[0]}
                            </div>
                          ) : (
                            <img
                              src={blog?.avatar || "/placeholder.svg"}
                              alt={blog?.username}
                              className="w-10 h-10 rounded-full border-2 border-blue-400"
                            />
                          )}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">
                                {blog?.firstName} {blog?.lastName}
                              </span>
                            </div>
                            <span className="text-blue-300 text-sm">
                              @{blog?.username}
                            </span>
                          </div>
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                          <EllipsisVertical className="text-blue-400 md:hidden" />
                        </div>
                      </div>

                      {/* Blog Content */}
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {blog.heading}
                      </h2>
                      <p className="text-blue-200 mb-4 line-clamp-3 text-sm md:text-base">
                        <ReactMarkdown>
                          {blog?.description
                            .replace(/\n/g, " ")
                            .replace(/\*\*/g, "")}
                        </ReactMarkdown>
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-300" />
                            <span className="text-blue-300 text-sm">
                              {formatDate(blog?.createdAt)} 2025
                            </span>
                          </div>
                          {blog.isAIGenerated && (
                            <AiGeneratedBadge className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-blue-300 text-sm">
                          <button className="flex items-center hover:text-blue-400 transition-colors">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{blog?.likeCount}</span>
                          </button>
                          <button className="flex items-center hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{blog?.Comments?.length}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    {blog.imageUrl && (
                      <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-full overflow-hidden rounded-lg">
                        <img
                          src={blog?.imageUrl || "/placeholder.svg"}
                          alt={blog.heading}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9));
          }
        }
      `}</style>
    </>
  );
}
interface AiGeneratedBadgeProps {
  className?: string;
}
export const AiGeneratedBadge = ({ className }: AiGeneratedBadgeProps) => {
  return (
    <div
      style={{
        filter: `drop-shadow(0 0 1px #FF0080) 
           drop-shadow(0 0 1px #7928CA) 
           drop-shadow(0 0 1px #0070F3)`,
      }}
      className="relative group z-50"
    >
      <div
        className={`relative flex items-center justify-center rounded-full ${className}`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-60"></div>
        <Sparkles
          className="w-5 h-5 text-white relative z-10 animate-[pulse_2s_ease-infinite]"
          style={{
            filter: `drop-shadow(0 0 4px #FF0080) 
                       drop-shadow(0 0 6px #7928CA) 
                       drop-shadow(0 0 8px #0070F3)`,
          }}
        />
      </div>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
        AI Generated
      </span>
    </div>
  );
};

export default Blogs;
