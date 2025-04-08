import { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Calendar, Sparkles, Loader2 } from "lucide-react";
import { useInView } from 'react-intersection-observer';
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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const fetchBlogs = async (pageNumber: number) => {
    try {
      setLoadingMore(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs?page=${pageNumber}&limit=10`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const newBlogs = response.data;
      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setFilteredBlogs(prev => pageNumber === 1 ? newBlogs : [...prev, ...newBlogs]);
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  useEffect(() => {
    if (inView && !loading && hasMore && !loadingMore) {
      fetchBlogs(page + 1);
    }
  }, [inView, loading, hasMore, loadingMore]);

  const BlogSkeleton = () => (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20 mb-10 animate-pulse">
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="flex-grow">
          {/* Author Info Skeleton */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20"></div>
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 bg-white/20 rounded"></div>
                <div className="h-3 w-16 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="h-7 w-3/4 bg-white/20 rounded mb-3"></div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-white/20 rounded"></div>
            <div className="h-4 w-5/6 bg-white/20 rounded"></div>
            <div className="h-4 w-4/6 bg-white/20 rounded"></div>
          </div>

          {/* Metadata Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-4 w-24 bg-white/20 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-16 bg-white/20 rounded"></div>
              <div className="h-4 w-16 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-white/20 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <div className="min-h-screen py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="space-y-8">
            {loading ? (
              // Show skeletons while loading
              Array.from({ length: 3 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))
            ) : (
              // Show actual blogs when loaded
              <>
                {filteredBlogs.map((blog) => (
                  <Link to={`/blog/${blog.id}`} key={blog.id}>
                    <article className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border cursor-pointer border-white/20 hover:bg-white/20 transition-all duration-300 mb-10">
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

                {/* Loading More Indicator */}
                <div ref={ref} className="w-full flex justify-center py-4">
                  {loadingMore && hasMore && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Loading more blogs...</span>
                    </div>
                  )}
                  {!hasMore && (
                    <p className="text-blue-300">No more blogs to load</p>
                  )}
                </div>
              </>
            )}
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