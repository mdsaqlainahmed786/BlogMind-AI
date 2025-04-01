import React, { useState } from 'react';
import { Search, BookOpen, ThumbsUp, MessageCircle } from 'lucide-react';
import Navbar from '@/landingPage/NavBar';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  readTime: number;
  likes: number;
  comments: number;
  createdAt: string;
  image?: string;
}

const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of AI in Content Creation',
    content: 'Artificial Intelligence is revolutionizing how we create and consume content. From automated writing assistance to intelligent content curation, AI is becoming an indispensable tool for modern content creators...',
    author: {
      name: 'Sarah Johnson',
      username: 'sarah-123',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80'
    },
    tags: ['AI', 'Content Creation', 'Technology'],
    readTime: 5,
    likes: 234,
    comments: 42,
    createdAt: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Building Scalable Web Applications',
    content: 'Learn the best practices for building web applications that can handle millions of users. From architecture decisions to performance optimization techniques...',
    author: {
      name: 'Michael Chen',
      username: 'mike-456',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80'
    },
    tags: ['Web Development', 'Scalability', 'Programming'],
    readTime: 8,
    likes: 156,
    comments: 23,
    createdAt: '2024-03-14',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Mastering Modern UI Design Principles',
    content: 'Explore the fundamental principles of modern UI design that create engaging and intuitive user experiences. From color theory to typography...',
    author: {
      name: 'Emily Rodriguez',
      username: 'emily-789',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80'
    },
    tags: ['UI Design', 'UX', 'Design Principles'],
    readTime: 6,
    likes: 312,
    comments: 45,
    createdAt: '2024-03-13',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(sampleBlogs);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = sampleBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.content.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br py-24 from-blue-700 via-black to-blue-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Explore AI-Generated Blogs</h1>
          <p className="text-xl text-blue-200">Discover insights and stories crafted with artificial intelligence</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5" />
            <input
              type="text"
              placeholder="Search blogs by title, content, or tags..."
              className="w-full bg-white/10 backdrop-blur-xl border border-blue-400/20 rounded-full py-3 px-12 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-8">
          {filteredBlogs.map(blog => (
            <article 
              key={blog.id} 
              className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border cursor-pointer border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Author Profile */}
                <div className="flex-shrink-0">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-400"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex-grow">
                  {/* Author Info and Date */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-medium">{blog.author.name}</span>
                    <span className="text-blue-300">·</span>
                    <span className="text-blue-300">{formatDate(blog.createdAt)}</span>
                  </div>

                  {/* Title and Content */}
                  <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-blue-200 mb-4 line-clamp-2">
                    {blog.content}
                  </p>

                  {/* Bottom Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Tags */}
                      <div className="flex gap-2">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read Time */}
                      <div className="flex items-center text-blue-300 text-sm">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-4 text-blue-300 text-sm">
                      <button className="flex items-center hover:text-blue-400 transition-colors">
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
                  <div className="flex-shrink-0 w-48 h-32 ml-4 hidden md:block">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-lg"
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