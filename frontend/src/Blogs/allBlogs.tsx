import { useState } from "react";
import { ThumbsUp, MessageCircle, Calendar, Sparkles } from "lucide-react";
import Navbar from "../landingPage/NavBar";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AnimatedBackground from "@/UsersAuth/Plasma";

interface Blog {
  id: string;
  heading: string;
  AiGenerated: boolean;
  description: string;
  author: {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  imageUrl?: string;
  likeCount: number;
  comments: number;
}

const blogsData: Blog[] = [
  {
    id: "f086901a-918a-4031-a169-6e0932e0dfd2",
    heading: "Shadow fight arena is'nt a game, it's a Irritation",
    description:
      "## Level Up Your Life: A Comprehensive Guide to the World of Gaming\n\nGaming. It's more than just a pastime; it's a culture, an art form, a competitive arena, and a community. From humble beginnings with pixelated screens to the sprawling, immersive virtual worlds we inhabit today, gaming has undergone a radical transformation. Whether you're a seasoned veteran or a curious newcomer, this blog post is your comprehensive guide to navigating the exciting, ever-evolving landscape of gaming.\n\n**I. Understanding the Gaming Universe: Genres, Platforms, and Playstyles**\n\nBefore diving headfirst, let's break down the fundamental building blocks of the gaming universe:\n\n* **Genres:** The cornerstone of game classification, genres help define the core gameplay mechanics and themes:\n    * **Action:** Emphasizing fast-paced combat, reflexes, and problem-solving (e.g., *God of War*, *Devil May Cry*, *Sekiro: Shadows Die Twice*).\n    * **Adventure:** Focusing on exploration, storytelling, puzzle-solving, and character development (e.g., *The Legend of Zelda*, *Uncharted*, *Life is Strange*).\n",
    AiGenerated: true,
    author: {
      firstName: "Sarah ",
      lastName: "Connors",
      username: "sarah-789",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    createdAt: "2025-03-27T10:01:46.569Z",
    imageUrl:
      "https://images.unsplash.com/photo-1657664072470-99b02c2143f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjkyMzF8MHwxfHNlYXJjaHwxfHxnYW1pbmd8ZW58MHx8fHwxNzQzMDY3MTcxfDA&ixlib=rb-4.0.3&q=80&w=1080",
    likeCount: 42,
    comments: 0,
  },
  {
    id: "f086901a-918a-4031-a169-6e0932e0dfd3",
    heading: "The Future of Web Development: AI-Assisted Coding",
    description:
      "Artificial intelligence is revolutionizing how we build websites and applications. From code completion to automated testing, AI tools are becoming an essential part of every developer's toolkit. This article explores the latest advancements and how they're changing the development landscape.",
    AiGenerated: false,
    author: {
      firstName: "John Developer",
      lastName: "Smith",
      username: "jdev-289",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    createdAt: "2025-03-25T14:30:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    likeCount: 24,
    comments: 7,
  },
];

function Blogs() {
  const [filteredBlogs, setFilteredBlogs] = useState(blogsData);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={blog.author.avatar || "/placeholder.svg"}
                        alt={blog.author.username}
                        className="w-10 h-10 rounded-full border-2 border-blue-400"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">
                            {blog.author.firstName} {blog.author.lastName}
                          </span>
                         
                        </div>
                        <span className="text-blue-300 text-sm">
                          @{blog.author.username}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {blog.heading}
                    </h2>
                    <p className="text-blue-200 mb-4 line-clamp-3 text-sm md:text-base">
                      <ReactMarkdown>{blog.description
                        .replace(/\n/g, " ")
                        .replace(/\*\*/g, "")}</ReactMarkdown>
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
                        {blog.AiGenerated && <AiGeneratedBadge className="w-6 h-6"/>}
                      </div>
                      <div className="flex items-center gap-4 text-blue-300 text-sm">
                        <button className="flex items-center hover:text-blue-400 transition-colors">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{blog.likeCount}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{blog.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Section */}
                  {blog.imageUrl && (
                    <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-full overflow-hidden rounded-lg">
                      <img
                        src={blog.imageUrl || "/placeholder.svg"}
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
export const AiGeneratedBadge = ({className}: AiGeneratedBadgeProps) => {
    return (
      <div
      style={{
        filter: `drop-shadow(0 0 1px #FF0080) 
           drop-shadow(0 0 1px #7928CA) 
           drop-shadow(0 0 1px #0070F3)`,
      }}
      className="relative group z-50">
        <div className={`relative flex items-center justify-center rounded-full ${className}`}>
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
