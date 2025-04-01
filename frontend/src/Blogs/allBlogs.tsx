import { useState } from "react";
import { BookOpen, ThumbsUp, MessageCircle, Calendar } from "lucide-react";
import Navbar from "@/landingPage/NavBar";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  readTime: number;
  likes: number;
  comments: number;
  createdAt: string;
  image?: string;
}

const sampleBlogs: Blog[] = [
  {
    id: "1",
    title: "The Future of AI in Content Creation",
    content:
      "Artificial Intelligence is revolutionizing how we create and consume content. From automated writing assistance to intelligent content curation, AI is becoming an indispensable tool for modern content creators...",
    author: {
      name: "Sarah Johnson",
      username: "sarah-123",
      avatar:
        "https://i.pravatar.cc/150?img=1",
    },
    readTime: 5,
    likes: 234,
    comments: 42,
    createdAt: "2024-03-15",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Building Scalable Web Applications",
    content:
      "Learn the best practices for building web applications that can handle millions of users. From architecture decisions to performance optimization techniques...",
    author: {
      name: "Michael Chen",
      username: "mike-456",
      avatar:
        "https://i.pravatar.cc/150?img=2",
    },
    readTime: 8,
    likes: 156,
    comments: 23,
    createdAt: "2024-03-14",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Mastering Modern UI Design Principles",
    content:
      "Explore the fundamental principles of modern UI design that create engaging and intuitive user experiences. From color theory to typography...",
    author: {
      name: "Emily Rodriguez",
      username: "emily-789",
      avatar:
        "https://i.pravatar.cc/150?img=3",
    },
    readTime: 6,
    likes: 312,
    comments: 45,
    createdAt: "2024-03-13",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
];

function Blogs() {
  //   const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(sampleBlogs);

  //   const handleSearch = (query: string) => {
  //     setSearchQuery(query);
  //     const filtered = sampleBlogs.filter(blog =>
  //       blog.title.toLowerCase().includes(query.toLowerCase()) ||
  //       blog.content.toLowerCase().includes(query.toLowerCase()) ||
  //       blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  //     );
  //     setFilteredBlogs(filtered);
  //   };

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
      <div className="min-h-screen bg-gradient-to-br py-24 from-blue-700 via-black to-blue-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Explore AI-Generated Blogs</h1>
          <p className="text-xl text-blue-200">Discover insights and stories crafted with artificial intelligence</p>
        </div> */}
          <div className="space-y-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border cursor-pointer border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-grow">
                    {/* Author Info and Date */}
                    <div className="flex-shrink-0 flex items-center gap-2 mb-1 md:mb-4 md:gap-4">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-blue-400"
                      />
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-md md:text-lg">
                          {blog.author.name}
                        </span>
                        <span className="text-blue-300 text-sm ">
                          @{blog.author.username}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2"></div>

                    {/* Title and Content */}
                    <h2 className="text-sm md:text-2xl font-bold text-white mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-blue-200 mb-4 line-clamp-2 text-xs md:text-base">
                      {blog.content}
                    </p>

                    {/* Bottom Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-300" />
                          <span className="text-blue-300 text-sm">
                            {formatDate(blog.createdAt)} 2025
                          </span>
                        </div>

                        {/* Read Time */}
                      </div>

                      {/* Engagement */}
                      <div className="flex items-center gap-4 text-blue-300 text-sm -mr-5 md:-mr-0">
                        <button className="flex items-center hover:text-blue-400 transition-colors cursor-pointer">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{blog.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{blog.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Blog Image */}
                  {blog.image && (
                    <div className="flex-shrink-0 w-24 h-24 ml-4 mt-10 rounded-lg md:mt-10 md:w-32 md:h-32 lg:w-48 lg:h-48 lg:mt-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-sm md:rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
