"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  X,
  Upload,
  Sparkles,
  Bold,
  Italic,
  LinkIcon,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  ListOrdered,
  Eye,
  Edit3,
} from "lucide-react"
import Navbar from "@/landingPage/NavBar"
import ReactMarkdown from "react-markdown"
import AnimatedBackground from "@/UsersAuth/Plasma"
import AIGenerationModal from "@/Blogs/AIGenerationModal"

function CreateBlog() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [activeBold, setActiveBold] = useState(false)
  const [activeItalic, setActiveItalic] = useState(false)
  const [activeCode, setActiveCode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const insertFormat = (format: string) => {
    if (!contentRef.current) return

    const start = contentRef.current.selectionStart
    const end = contentRef.current.selectionEnd
    const text = content
    let insertion = ""

    switch (format) {
      case "h1":
        insertion = "# "
        break
      case "h2":
        insertion = "## "
        break
      case "bold":
        insertion = "**"
        break
      case "italic":
        insertion = "_"
        break
      case "link":
        insertion = "[](url)"
        break
      case "bullet":
        insertion = "* "
        break
      case "number":
        insertion = "1. "
        break
      case "quote":
        insertion = "> "
        break
      case "code":
        insertion = "`"
        break
    }

    const newText = text.substring(0, start) + insertion + text.substring(end)
    setContent(newText)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const processContent = (text: string) => {
    return text.replace(/\n\n/g, "\n\n").replace(/\n/g, "\n")
  }

  const handleCreateWithAI = () => {
    setIsModalOpen(true)
  }

  const ToolbarButton = ({
    icon: Icon,
    title,
    format,
  }: {
    icon: React.ElementType
    title: string
    format: string
  }) => (
    <button
      type="button"
      onClick={() => {
        if (format === "bold") {
          setActiveBold(!activeBold)
        } else if (format === "italic") {
          setActiveItalic(!activeItalic)
        } else if (format === "code") {
          setActiveCode(!activeCode)
        }
        insertFormat(format)
      }}
      className={`p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group ${
        (activeBold && format === "bold") || (activeCode && format === "code") || (activeItalic && format === "italic")
          ? "bg-blue-500 text-white"
          : "text-gray-300"
      }`}
      title={title}
    >
      <Icon className="w-4 h-4 text-gray-300 group-hover:text-white" />
    </button>
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatedBackground />
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Create Blog</h1>
            <button
              onClick={handleCreateWithAI}
              className="flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer animate-rainbow-bg shadow-rainbow text-white hover:scale-105 transform"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite, glow 1s ease-in-out infinite alternate",
              }}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Create with AI</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Cover Image</label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  isDragging ? "border-blue-500 bg-blue-500/10" : "border-white/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {coverImage ? (
                  <div className="relative">
                    <img
                      src={coverImage || "/placeholder.svg"}
                      alt="Cover"
                      className="max-h-64 mx-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center py-8 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-400">Drag & drop an image here, or click to select</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-white text-sm font-medium">Content</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg transition-colors ${
                      activeTab === "write" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-2 px-3 cursor-pointer py-1.5 rounded-lg transition-colors ${
                      activeTab === "preview" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {activeTab === "write" ? (
                <div className="space-y-0">
                  <div className="flex items-center gap-1 p-2 bg-white/10 border border-white/20 rounded-t-lg">
                    <div className="flex items-center gap-1">
                      <ToolbarButton icon={Heading1} title="Heading 1" format="h1" />
                      <ToolbarButton icon={Heading2} title="Heading 2" format="h2" />
                    </div>
                    <div className="w-px h-6 bg-white/20 mx-1" />
                    <div className="flex items-center gap-1">
                      <ToolbarButton icon={Bold} title="Bold" format="bold" />
                      <ToolbarButton icon={Italic} title="Italic" format="italic" />
                      <ToolbarButton icon={LinkIcon} title="Link" format="link" />
                    </div>
                    <div className="w-px h-6 bg-white/20 mx-1" />
                    <div className="flex items-center gap-1">
                      <ToolbarButton icon={List} title="Bullet List" format="bullet" />
                      <ToolbarButton icon={ListOrdered} title="Numbered List" format="number" />
                      <ToolbarButton icon={Quote} title="Quote" format="quote" />
                      <ToolbarButton icon={Code} title="Code" format="code" />
                    </div>
                  </div>
                  <textarea
                    ref={contentRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content here..."
                    rows={12}
                    className="w-full bg-white/10 border border-white/20 rounded-b-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              ) : (
                <div className="bg-white/10 border border-white/20 rounded-lg p-6 prose prose-invert max-w-none min-h-[300px] overflow-y-auto">
                  <div className="prose prose-lg dark:prose-invert font-sans">
                    <ReactMarkdown>{processContent(content) || "*Preview will appear here...*"}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg group hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>

      <AIGenerationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 10px #ff0080,
                       0 0 20px #7928CA,
                       0 0 30px #FF0080;
          }
          to {
            box-shadow: 0 0 20px #ff0080,
                       0 0 30px #7928CA,
                       0 0 40px #FF0080;
          }
        }

        .animate-rainbow-bg {
          background: linear-gradient(45deg, #FF0080, #7928CA, #FF0080);
          background-size: 200% 200%;
        }

        .shadow-rainbow {
          box-shadow: 0 0 20px #ff0080,
                     0 0 30px #7928CA,
                     0 0 40px #FF0080;
        }

        /* Custom scrollbar for the preview */
        .prose::-webkit-scrollbar {
          width: 8px;
        }

        .prose::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .prose::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .prose::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default CreateBlog

