import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { MessageCircle, Share2, ThumbsUp, Calendar } from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import { AiGeneratedBadge } from "./allBlogs";

interface Author {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  email: string;
}

interface BlogPost {
  heading: string;
  isAiGenerated: boolean;
  description: string;
  imageUrl: string;
  createdAt: string;
  author: Author;
  _count: {
    likes: number;
  };
}

function Blog() {
  // Static blog data
  const blogData: BlogPost = {
    heading: "Shadow fight arena is'nt a game, it's a Irritation",
    isAiGenerated: true,
    description: `## Level Up Your Life: A Comprehensive Guide to the World of Gaming

Gaming. It's more than just a pastime; it's a culture, an art form, a competitive arena, and a community. From humble beginnings with pixelated screens to the sprawling, immersive virtual worlds we inhabit today, gaming has undergone a radical transformation. Whether you're a seasoned veteran or a curious newcomer, this blog post is your comprehensive guide to navigating the exciting, ever-evolving landscape of gaming.

**I. Understanding the Gaming Universe: Genres, Platforms, and Playstyles**

Before diving headfirst, let's break down the fundamental building blocks of the gaming universe:

* **Genres:** The cornerstone of game classification, genres help define the core gameplay mechanics and themes:
    * **Action:** Emphasizing fast-paced combat, reflexes, and problem-solving (e.g., *God of War*, *Devil May Cry*, *Sekiro: Shadows Die Twice*).
    * **Adventure:** Focusing on exploration, storytelling, puzzle-solving, and character development (e.g., *The Legend of Zelda*, *Uncharted*, *Life is Strange*).
    * **Role-Playing Games (RPGs):** Allowing players to customize characters, make impactful choices, and embark on epic quests (e.g., *The Witcher 3*, *Elden Ring*, *Final Fantasy*).`,
    imageUrl:
      "https://images.unsplash.com/photo-1657664072470-99b02c2143f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjkyMzF8MHwxfHNlYXJjaHwxfHxnYW1pbmd8ZW58MHx8fHwxNzQzMDY3MTcxfDA&ixlib=rb-4.0.3&q=80&w=1080",
    createdAt: "2025-03-27T10:01:46.569Z",
    author: {
      firstName: "Sarah",
      lastName: "Connor",
      username: "sarah-789",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "mdnoumanahmed789@gmail.com",
    },
    _count: {
      likes: 57,
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 relative">
        {/* Blur overlay */}
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
          <article className="bg-white/18 backdrop-blur-xl rounded-lg overflow-hidden text-white shadow-lg border border-white/20">
            {/* Author info */}
            <div className="px-1 py-4 flex justify-start w-full max-w-[85vw]">
              <span className="text-start font-bold text-3xl px-5 md:font-extrabold md:text-4xl">
                {blogData.heading}
              </span>
            </div>

            <div className="flex justify-between items-center max-w-[85vw] ">
              <div className="p-6 flex items-center space-x-3">
                <img
                  src={blogData.author.avatar || "/placeholder.svg"}
                  alt={blogData.author.username}
                  className="w-14 h-14 rounded-full border-2 border-blue-400"
                />

                <div className="font-medium flex flex-col text-white">
                  <span>
                    {`${blogData.author.firstName} ${blogData.author.lastName}`}{" "}
                  </span>
                  <span className="text-sm text-blue-400 ">
                    @{blogData.author.username}
                  </span>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {format(new Date(blogData.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
                <Badge className="bg-amber-400 -mt-9">PREMIUM USER</Badge>
              </div>
              <div className="flex md:mr-10">
                {blogData.isAiGenerated && (
                  <AiGeneratedBadge className="w-10 h-10" />
                )}
              </div>
            </div>

            <div className="hidden px-6 py-4 border-t border-b  border-gray-600/50 md:flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{blogData._count.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>33</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Title */}

            {/* Main image */}
            <div className="w-full aspect-video">
              <img
                src={blogData.imageUrl}
                alt={blogData.heading}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="prose prose-invert font-serif prose-lg max-w-none">
                <ReactMarkdown>{blogData.description}</ReactMarkdown>
              </div>
            </div>

            {/* Engagement */}
            <div className="px-6 py-4 border-t  border-gray-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{blogData._count.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>33</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default Blog;
