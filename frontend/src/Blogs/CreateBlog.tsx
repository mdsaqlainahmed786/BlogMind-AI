import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, Upload, Sparkles, Bold, Italic, Link as LinkIcon, List, Quote, Code, Heading1, Heading2, ListOrdered } from 'lucide-react';
import Navbar from '@/landingPage/NavBar';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isAIAssisted, setIsAIAssisted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, coverImage, isAIAssisted });
  };

  const insertFormat = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let formattedText = '';
    switch (format) {
      case 'h1':
        formattedText = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      case 'quote':
        formattedText = `> ${selectedText || 'quote'}`;
        break;
      case 'bullet':
        formattedText = `\n- ${selectedText || 'list item'}`;
        break;
      case 'number':
        formattedText = `\n1. ${selectedText || 'list item'}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = beforeText + formattedText + afterText;
    setContent(newContent);

    // Set cursor position after the inserted format
    setTimeout(() => {
      const newPosition = start + formattedText.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const ToolbarButton = ({ icon: Icon, title, format }: { icon: any, title: string, format: string }) => (
    <button
      type="button"
      onClick={() => insertFormat(format)}
      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
      title={title}
    >
      <Icon className="w-4 h-4 text-gray-300 group-hover:text-white" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-black to-blue-800">
      <Navbar />
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Blog</h1>
            <button
              onClick={() => setIsAIAssisted(!isAIAssisted)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${isAIAssisted ? 'animate-rainbow-bg shadow-rainbow' : 'bg-white/10'}
                text-white hover:scale-105 transform
              `}
              style={{
                backgroundSize: '200% 200%',
                animation: isAIAssisted ? 'gradient 3s ease infinite, glow 1s ease-in-out infinite alternate' : 'none',
              }}
            >
              <Sparkles className={`w-5 h-5 ${isAIAssisted ? 'animate-pulse' : ''}`} />
              <span>AI Assist</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Cover Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/20'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {coverImage ? (
                  <div className="relative">
                    <img
                      src={coverImage}
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
                    <p className="text-gray-400">
                      Drag & drop an image here, or click to select
                    </p>
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

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                Content
              </label>
              
              {/* Fixed Formatting Toolbar */}
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
                className="w-full prose bg-white/10 border border-white/20 rounded-b-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
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
      `}</style>
    </div>
  );
}

export default CreateBlog;