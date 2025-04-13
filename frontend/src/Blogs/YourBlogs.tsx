import { useState, useEffect } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
} from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import { AiGeneratedBadge } from "./allBlogs";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import AnimatedBackground from "@/UsersAuth/Plasma";
import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

// const blogsData: Blog[] = [
//   {
//     id: "f086901a-918a-4031-a169-6e0932e0dfd2",
//     heading: "Gaming in 2025: The Future of Interactive Entertainment",
//     description:
//       "## Level Up Your Life: A Comprehensive Guide to the World of Gaming\n\nGaming. It's more than just a pastime; it's a culture, an art form, a competitive arena, and a community. From humble beginnings with pixelated screens to the sprawling, immersive virtual worlds we inhabit today, gaming has undergone a radical transformation.",
//     AiGenerated: true,
//     author: {
//       firstName: "Sarah",
//       lastName: "Connors",
//       username: "sarah-789",
//       avatar: "https://i.pravatar.cc/150?img=5",
//     },
//     createdAt: "2025-03-27T10:01:46.569Z",
//     imageUrl:
//       "https://images.unsplash.com/photo-1657664072470-99b02c2143f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjkyMzF8MHwxfHNlYXJjaHwxfHxnYW1pbmd8ZW58MHx8fHwxNzQzMDY3MTcxfDA&ixlib=rb-4.0.3&q=80&w=1080",
//     likeCount: 156,
//     comments: 32,
//   },
//   {
//     id: "7c5d7bf5-1d8b-4f1a-9c9d-23b6e4f8f9a1",
//     heading: "The Art of Coffee Brewing",
//     description:
//       "Discover the secrets of brewing the perfect cup of coffee. From bean selection to grinding techniques, temperature control, and brewing methods, this comprehensive guide will elevate your coffee game.",
//     AiGenerated: false,
//     author: {
//       firstName: "Sarah",
//       lastName: "Connors",
//       username: "sarah-789",
//       avatar: "https://i.pravatar.cc/150?img=5",
//     },
//     createdAt: "2025-03-26T15:30:00.000Z",
//     imageUrl:
//       "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//     likeCount: 89,
//     comments: 122,
//   },
//   {
//     id: "9e8d7c6b-5a4b-3c2d-1e0f-9a8b7c6d5e4f",
//     heading: "Sustainable Living in Modern Cities",
//     description:
//       "Explore practical ways to live sustainably in urban environments. From zero-waste practices to energy conservation and urban gardening, learn how to reduce your environmental footprint while enjoying city life.",
//     AiGenerated: true,
//     author: {
//       firstName: "Sarah",
//       lastName: "Connors",
//       username: "sarah-789",
//       avatar: "https://i.pravatar.cc/150?img=5",
//     },
//     createdAt: "2025-03-25T09:15:00.000Z",
//     imageUrl:
//       "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//     likeCount: 234,
//     comments: 67,
//   },
// ];
interface BlogResponse {
  id: string;
  authorId: string;
  heading: string;
  AiGenerated: boolean;
  description: string;
  Comments: [];
  createdAt: string;
  imageUrl?: string;
  likeCount: number;
}
type SortOption = "recent" | "likes" | "comments";

function YourBlogs() {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogResponse[]>([]);
  const { user } = useUserStore();

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    const sortedBlogs = [...blogs];

    switch (option) {
      case "likes":
        sortedBlogs.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "comments":
        sortedBlogs.sort((a, b) => b.Comments.length - a.Comments.length);
        break;
      case "recent":
        sortedBlogs.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredBlogs(sortedBlogs);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const fetchBlogs = async (userId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/user-blogs/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const userId = user?.id !== undefined ? user?.id : "";
    fetchBlogs(userId);
  }, [user?.id]);

  const SortButton = ({
    option,
    icon: Icon,
    label,
  }: {
    option: SortOption;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
  }) => (
    <button
      onClick={() => handleSort(option)}
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
        sortBy === option
          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
          : "bg-white/10 text-blue-200 hover:bg-white/20"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <div className="min-h-screen py-24 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Sort Controls */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 mb-8 border border-white/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Your Blogs</h2>
              <div className="flex items-center gap-3">
                <SortButton option="recent" icon={Clock} label="Most Recent" />
                <SortButton
                  option="likes"
                  icon={TrendingUp}
                  label="Most Liked"
                />
                <SortButton
                  option="comments"
                  icon={MessageSquare}
                  label="Most Commented"
                />
              </div>
            </div>
          </div>

          {/* Blog List */}
          <div className="space-y-8">
            {filteredBlogs.length === 0 && (
              <div className="text-center text-blue-200 text-lg">
              You have not created any blogs yet.
              </div>
            )}
            {filteredBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <article
                  key={blog.id}
                  className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border cursor-pointer mb-10 border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col-reverse md:flex-row gap-6">
                    {/* Content Section */}
                    <div className="flex-grow">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={user?.avatar}
                          alt={user?.username}
                          className="w-10 h-10 rounded-full border-2 border-blue-400"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                              {user?.firstName} {user?.lastName}
                            </span>
                          </div>
                          <span className="text-blue-300 text-sm">
                            @{user?.username}
                          </span>
                        </div>
                      </div>

                      {/* Blog Content */}
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {blog.heading}
                      </h2>
                      <p className="text-blue-200 mb-4 line-clamp-3 text-sm md:text-base">
                        <ReactMarkdown>
                          {blog.description
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
                              {formatDate(blog.createdAt)} 2025
                            </span>
                          </div>
                          {blog.AiGenerated && (
                            <div className="relative group">
                              <AiGeneratedBadge className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-blue-300 text-sm">
                          <button className="flex items-center hover:text-blue-400 transition-colors">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{blog.likeCount}</span>
                          </button>
                          <button className="flex items-center hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{blog.Comments?.length}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    {blog.imageUrl && (
                      <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-full overflow-hidden rounded-lg">
                        <img
                          src={blog.imageUrl}
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
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}

export default YourBlogs;
