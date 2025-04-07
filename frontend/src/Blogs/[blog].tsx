import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import AnimatedBackground from "@/UsersAuth/Plasma";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  MessageCircle,
  Share2,
  ThumbsUp,
  Calendar,
  ThumbsDown,
  SendHorizonal,
  Edit2,
  Trash,
} from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { AiGeneratedBadge } from "./allBlogs";
import { useUserStore } from "@/stores/useUserStore";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  email: string;
}

interface BlogPost {
  heading: string;
  isAIGenerated: boolean;
  description: string;
  imageUrl: string;
  createdAt: string;
  author: Author;
  Comments: {
    id: string;
    userId: string;
    blogId: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      avatar: string;
      email: string;
    };
  }[];
  _id: string;
  _count: {
    likes: number;
  };
}

function Blog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [comments, setComments] = useState<BlogPost["Comments"]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams<{ blogId: string }>();
  const [likedByUser, setLikedByUser] = useState(Boolean);
  const [likesOfBlog, setLikesOfBlog] = useState(0);
  const { user } = useUserStore();
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShareCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Copied to clip board!", {
        style: {
          border: "1px solid blue",
          backgroundColor: "blue",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "blue",
          secondary: "white",
        },
      });
    });
  };

  const deleteBlogHandler = async (authorId: string) => {
    if (user?.id !== authorId) {
      toast.error("You are not authorized to delete this blog", {
        style: {
          border: "1px solid red",
          backgroundColor: "red",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Blog deleted:", response.data);
      setBlog(null);
      navigate("/blogs/all");
      toast.success("Blog deleted successfully!", {
        style: {
          border: "1px solid green",
          backgroundColor: "green",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "green",
          secondary: "white",
        },
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const processContent = (text: string) => {
    return text?.replace(/\n\n/g, "\n\n")?.replace(/\n/g, "\n");
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blog/comments/${blogId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  useEffect(() => {
    if (!blog) return;
    if (user?.id === blog?.author.id) {
      setIsAuthorized(true);
    }
  }, [blog, user]);
  const fetchBlogData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Blog data fetched:", response.data);
      if (response.data) {
        setBlog(response.data);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id !== undefined ? user?.id : "";
    getLikesOfBlog(userId);
  }, [blogId, user?.id]);

  useEffect(() => {
    fetchBlogData();
  }, [blogId]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Comment cannot be empty", {
        style: {
          border: "1px solid red",
          backgroundColor: "red",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog/comments/`,
        {
          blogId: blogId,
          comment: comment,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchComments();
      console.log("Comment submitted:", response.data);
      setComments((prev) => [...prev, response.data]);

      setComment("");
      toast.success("Comment submitted successfully!", {
        style: {
          border: "1px solid green",
          backgroundColor: "green",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "green",
          secondary: "white",
        },
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error submitting comment", {
        style: {
          border: "1px solid red",
          backgroundColor: "red",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
    }
  };

  const BlogSkeleton = () => (
    <article className="bg-white/18 backdrop-blur-xl rounded-lg overflow-hidden text-white shadow-lg border border-white/20 animate-pulse">
      {/* Title Skeleton */}
      <div className="px-1 py-4 flex justify-start w-full max-w-[85vw]">
        <div className="h-8 w-3/4 bg-white/20 rounded"></div>
      </div>

      {/* Author Info Skeleton */}
      <div className="flex justify-between items-center max-w-[85vw]">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-white/20"></div>
          <div className="space-y-2">
            <div className="h-5 w-32 bg-white/20 rounded"></div>
            <div className="h-4 w-24 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="px-6 py-4 border-t border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="h-5 w-20 bg-white/20 rounded"></div>
          <div className="h-5 w-20 bg-white/20 rounded"></div>
          <div className="h-5 w-32 bg-white/20 rounded"></div>
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-white/20"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-4 w-full bg-white/20 rounded"></div>
        <div className="h-4 w-5/6 bg-white/20 rounded"></div>
        <div className="h-4 w-4/6 bg-white/20 rounded"></div>
      </div>

      {/* Comments Section Skeleton */}
      <div className="px-6 py-4 border-t border-gray-700/50">
        <div className="h-6 w-48 bg-white/20 rounded mb-4"></div>
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/20"></div>
          <div className="flex-1 h-12 bg-white/20 rounded"></div>
        </div>
      </div>
    </article>
  );

  const getLikesOfBlog = async (userId?: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}/likes`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const likesData = response.data;
      setLikesOfBlog(likesData.length);

      // const userId = user?.id;
      if (likesData && userId) {
        const hasUserLiked = likesData.some(
          (entry: { user: { id: string } }) => entry.user.id === userId
        );
        setLikedByUser(hasUserLiked);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const likeHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}/like`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getLikesOfBlog();
        if (response.data.message === "Blog liked") {
          setLikedByUser(true);
          toast.success("Blog liked successfully!", {
            style: {
              border: "1px solid green",
              backgroundColor: "green",
              padding: "16px",
              color: "white",
            },
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          });
        } else if (response.data.message === "Like removed") {
          setLikedByUser(false);
          toast.success("Blog unliked successfully!", {
            style: {
              border: "1px solid green",
              backgroundColor: "green",
              padding: "16px",
              color: "white",
            },
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
      <Navbar />
      <AnimatedBackground />

      <div className="min-h-screen py-16 relative">
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
          {loading ? (
            <BlogSkeleton />
          ) : (
            <article className="bg-white/18 backdrop-blur-xl rounded-lg overflow-hidden text-white shadow-lg border border-white/20">
              {/* Rest of your existing article content */}
              <div className="px-1 py-4 flex justify-start w-full max-w-[85vw]">
                <span className="text-start font-bold text-3xl px-5 md:font-extrabold md:text-4xl">
                  {blog?.heading}
                </span>
              </div>

              <div className="flex justify-between items-center max-w-[85vw]">
                <div className="p-6 flex items-center space-x-3">
                  {blog?.author.avatar === null ||
                  blog?.author.avatar === "" ? (
                    <div className="w-14 h-14 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-lg">
                      {blog?.author.firstName[0]}
                      {blog?.author.lastName[0]}
                    </div>
                  ) : (
                    <img
                      src={blog?.author.avatar || "/placeholder.svg"}
                      alt={blog?.author.username}
                      className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />
                  )}

                  <div className="font-medium flex flex-col text-white">
                    <span className="text-lg md:text-lg">
                      {`${blog?.author?.firstName} ${blog?.author?.lastName}`}{" "}
                    </span>
                    <span className="text-sm text-gray-200">
                      @{blog?.author?.username}
                    </span>
                  </div>
                </div>
                <div className="flex md:mr-10">
                  {blog?.isAIGenerated && (
                    <AiGeneratedBadge className="w-8 h-8 md:w-10 md:h-10" />
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t md:hidden border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={likeHandler}
                    className={`flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors ${
                      likedByUser
                        ? "text-green-600"
                        : "text-gray-200 hover:text-blue-600"
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{likesOfBlog}</span>
                  </button>
                  <button
                    onClick={scrollToComments}
                    className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{comments.length}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-200">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {blog?.createdAt
                        ? format(new Date(blog.createdAt), "MMM dd, yyyy")
                        : "Date not available"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <button
                    onClick={handleShareCopyToClipboard}
                    className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          if (user?.id !== blog?.author.id) {
                            toast.error(
                              "You are not authorized to edit this blog",
                              {
                                style: {
                                  border: "1px solid red",
                                  backgroundColor: "red",
                                  padding: "16px",
                                  color: "white",
                                },
                                iconTheme: {
                                  primary: "red",
                                  secondary: "white",
                                },
                              }
                            );
                          } else {
                            navigate("/user/blog/edit", {
                              state: { blogData: blog },
                            });
                          }
                        }}
                        className={`flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors`}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          blog?.author.id && deleteBlogHandler(blog.author.id)
                        }
                        className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-red-600 transition-colors"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="hidden px-6 py-4 border-t border-b border-gray-600/50 md:flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={likeHandler}
                    className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                      likedByUser
                        ? "text-green-600"
                        : "text-gray-200 hover:text-blue-600"
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{likesOfBlog}</span>
                  </button>
                  <button
                    onClick={scrollToComments}
                    className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{blog?.Comments.length}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-200">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {blog?.createdAt
                        ? format(new Date(blog.createdAt), "MMM dd, yyyy")
                        : "Date not available"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleShareCopyToClipboard}
                    className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          if (user?.id !== blog?.author.id) {
                            toast.error(
                              "You are not authorized to edit this blog",
                              {
                                style: {
                                  border: "1px solid red",
                                  backgroundColor: "red",
                                  padding: "16px",
                                  color: "white",
                                },
                                iconTheme: {
                                  primary: "red",
                                  secondary: "white",
                                },
                              }
                            );
                          } else {
                            navigate("/user/blog/edit", {
                              state: { blogData: blog },
                            });
                          }
                        }}
                        className={`flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors`}
                      >
                        <Edit2 className="w-5 h-5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          blog?.author.id && deleteBlogHandler(blog.author.id)
                        }
                        className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-red-600 transition-colors"
                      >
                        <Trash className="w-5 h-5" />
                        <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {blog?.imageUrl && (
                <div className="w-full aspect-video">
                  <img
                    src={blog?.imageUrl}
                    alt={blog?.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => (
                      <ul className="list-disc ml-5">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal ml-5">{children}</ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-2">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mb-2">{children}</h2>
                    ),
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-2">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-800 text-white px-1 rounded">
                        {children}
                      </code>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  }}
                >
                  {processContent(blog?.description || "") ||
                    "*Preview will appear here...*"}
                </ReactMarkdown>
              </div>

              <div
                ref={commentsRef}
                className="px-6 py-4 border-t border-gray-700/50"
              >
                <h3 className="text-2xl font-semibold">
                  Comments({comments.length})
                </h3>
                <div className="flex space-x-4 mt-4">
                  {user?.avatar === null || user?.avatar === "" ? (
                    <div className="w-12 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </div>
                  ) : (
                    <img
                      src={user?.avatar || "/placeholder.svg"}
                      alt={user?.username}
                      className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />
                  )}

                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitComment(e);
                      }
                    }}
                    placeholder="Share your thoughts..."
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />

                  <button
                    onClick={submitComment}
                    className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
                  >
                    <SendHorizonal className="w-6 h-6 text-gray-200 cursor-pointer transition-colors" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {comments.length === 0 && (
                    <p className="text-gray-400 text-center py-10">
                      No comments yet. Be the first to comment
                    </p>
                  )}
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex flex-col border-t border-gray-700/50 items-start py-6 space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        {comment.user?.avatar === null ||
                        comment.user?.avatar === "" ? (
                          <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm">
                            {comment.user?.firstName[0]}
                            {comment.user?.lastName[0]}
                          </div>
                        ) : (
                          <img
                            src={comment.user?.avatar || "/placeholder.svg"}
                            alt={comment.user?.username}
                            className="w-10 h-10 rounded-full border-2 border-blue-400"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {comment?.user?.firstName} {comment?.user?.lastName}
                          </span>
                          <span className="text-sm text-gray-400">
                            {format(
                              new Date(comment?.createdAt),
                              "MMM dd, yyyy"
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-200">{comment?.comment}</p>
                      <div className="flex mt-5 items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span>10</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-200 cursor-pointer hover:text-blue-600 transition-colors">
                          <ThumbsDown className="w-5 h-5" />
                          <span>2</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
