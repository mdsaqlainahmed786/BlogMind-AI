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
    description:
      "## Level Up Your Life: A Comprehensive Guide to the World of Gaming\n\nGaming. It's more than just a pastime; it's a culture, an art form, a competitive arena, and a community. From humble beginnings with pixelated screens to the sprawling, immersive virtual worlds we inhabit today, gaming has undergone a radical transformation. Whether you're a seasoned veteran or a curious newcomer, this blog post is your comprehensive guide to navigating the exciting, ever-evolving landscape of gaming.\n\n**I. Understanding the Gaming Universe: Genres, Platforms, and Playstyles**\n\nBefore diving headfirst, let's break down the fundamental building blocks of the gaming universe:\n\n* **Genres:** The cornerstone of game classification, genres help define the core gameplay mechanics and themes:\n    * **Action:** Emphasizing fast-paced combat, reflexes, and problem-solving (e.g., *God of War*, *Devil May Cry*, *Sekiro: Shadows Die Twice*).\n    * **Adventure:** Focusing on exploration, storytelling, puzzle-solving, and character development (e.g., *The Legend of Zelda*, *Uncharted*, *Life is Strange*).\n    * **Role-Playing Games (RPGs):** Allowing players to customize characters, make impactful choices, and embark on epic quests (e.g., *The Witcher 3*, *Elden Ring*, *Final Fantasy*).\n    * **Strategy:** Demanding tactical thinking, resource management, and long-term planning (e.g., *StarCraft*, *Civilization*, *Total War*).\n    * **Simulation:** Replicating real-world activities or creating new systems for players to manage (e.g., *The Sims*, *Cities: Skylines*, *Microsoft Flight Simulator*).\n    * **Sports:** Emulating real-life sports and competitions (e.g., *FIFA*, *NBA 2K*, *Madden NFL*).\n    * **Fighting:** Emphasizing head-to-head combat using various characters and techniques (e.g., *Street Fighter*, *Mortal Kombat*, *Tekken*).\n    * **Puzzle:** Challenging players with intricate problems requiring logical reasoning and pattern recognition (e.g., *Portal*, *Tetris*, *The Witness*).\n    * **Shooter (FPS/TPS):** Involving gunplay and combat from a first-person (FPS) or third-person (TPS) perspective (e.g., *Call of Duty*, *Halo*, *Gears of War*, *Fortnite*).\n    * **Horror:** Designed to evoke fear and suspense through atmospheric environments, jump scares, and psychological elements (e.g., *Resident Evil*, *Silent Hill*, *Outlast*).\n\n* **Platforms:** The hardware on which you play games:\n    * **PC (Personal Computer):** Offering versatility, customization, and the ability to play a vast library of games. Requires specific hardware (CPU, GPU, RAM) to meet game requirements.\n    * **Consoles:** Dedicated gaming devices like PlayStation (PS5), Xbox (Series X/S), and Nintendo Switch. Known for their ease of use, exclusive titles, and optimized performance.\n    * **Mobile:** Smartphones and tablets offering convenient gaming on the go, with a growing selection of free-to-play and premium titles.\n    * **Cloud Gaming:** Streaming games over the internet, allowing you to play on various devices without requiring powerful hardware (e.g., Xbox Cloud Gaming, GeForce NOW).\n\n* **Playstyles:** How you approach gaming:\n    * **Single-player:** Engaging in solo adventures with compelling narratives and immersive experiences.\n    * **Multiplayer:** Connecting with friends and strangers online for cooperative or competitive gameplay.\n    * **Competitive (eSports):** Participating in organized tournaments and leagues with the aim of winning prizes and recognition.\n    * **Casual:** Playing games for relaxation and enjoyment without a strong focus on competition or progression.\n    * **Speedrunning:** Completing games as quickly as possible, often using glitches and exploits.\n    * **Modding:** Modifying game files to create new content, features, or experiences.\n\n**II. The Art of Choosing Your Game: Factors to Consider**\n\nWith such a vast selection of games available, choosing the right one can feel overwhelming. Here's a breakdown of factors to consider:\n\n* **Genre Preference:** What types of games do you generally enjoy? Action-packed thrills, intricate puzzles, or sprawling RPGs?\n* **Platform Availability:** Ensure the game is available on your preferred platform.\n* **Budget:** Games can range from free-to-play to premium titles costing $60 or more. Consider subscription services like Xbox Game Pass or PlayStation Plus for access to a library of games.\n* **Time Commitment:** Some games require a significant time investment, while others are designed for shorter play sessions.\n* **Online Connectivity:** If you're interested in multiplayer, ensure you have a stable internet connection and any necessary subscriptions.\n* **Reviews and Ratings:** Read reviews from critics and players to get an idea of the game's quality and overall experience.\n* **Game Content and Themes:** Be mindful of the game's content, including violence, language, and mature themes, and ensure it's appropriate for your age and preferences.\n\n**III. The Gaming Community: Connecting and Collaborating**\n\nGaming is a social experience, and the community plays a vital role:\n\n* **Online Forums and Communities:** Websites like Reddit (r/gaming, r/[game title]), Discord servers, and dedicated forums provide spaces to discuss games, share tips, and connect with other players.\n* **Streaming and Content Creation:** Platforms like Twitch and YouTube allow gamers to broadcast their gameplay, create tutorials, and share their experiences with a wider audience.\n* **Gaming Conventions and Events:** Events like PAX, E3, and Gamescom provide opportunities to meet developers, play upcoming games, and connect with fellow gamers.\n* **Esports Leagues and Tournaments:** Professional gaming leagues and tournaments offer exciting competitions and opportunities for skilled players to showcase their talents.\n\n**IV. The Evolving Landscape: Trends and Technologies**\n\nGaming is a constantly evolving industry, driven by technological advancements and changing player preferences:\n\n* **Virtual Reality (VR):** Offering immersive gaming experiences that transport players into virtual worlds.\n* **Augmented Reality (AR):** Overlaying digital elements onto the real world, creating interactive gaming experiences.\n* **Cloud Gaming:** Allowing players to stream games over the internet, eliminating the need for powerful hardware.\n* **Blockchain Gaming:** Integrating blockchain technology and NFTs into games, offering players ownership of in-game assets.\n* **Cross-Platform Play:** Enabling players on different platforms (PC, consoles, mobile) to play together.\n* **Accessibility:** Increased focus on creating games that are accessible to players with disabilities, including customizable controls, subtitles, and visual aids.\n\n**V. Maintaining a Healthy Gaming Lifestyle**\n\nWhile gaming can be a fun and rewarding hobby, it's essential to maintain a healthy balance:\n\n* **Set Time Limits:** Allocate specific times for gaming and stick to them.\n* **Take Breaks:** Get up and move around regularly to avoid eye strain and fatigue.\n* **Prioritize Physical Activity:** Incorporate exercise into your daily routine.\n* **Maintain a Healthy Diet:** Avoid unhealthy snacks and drinks while gaming.\n* **Get Enough Sleep:** Ensure you're getting adequate sleep to maintain focus and energy.\n* **Socialize Offline:** Spend time with friends and family outside of gaming.\n* **Seek Help if Needed:** If you're struggling with gaming addiction or other mental health issues, seek professional help.\n\n**VI. Tips for Becoming a Better Gamer**\n\nWant to level up your skills? Here are some tips to help you improve your gameplay:\n\n* **Practice Regularly:** Consistent practice is key to improving your skills.\n* **Watch Gameplay Videos:** Learn from experienced players by watching their gameplay videos and tutorials.\n* **Read Guides and Strategies:** Research game mechanics and strategies to gain an advantage.\n* **Experiment with Different Characters and Playstyles:** Find what works best for you.\n* **Communicate with Teammates:** Effective communication is crucial for success in multiplayer games.\n* **Analyze Your Mistakes:** Identify areas where you can improve and learn from your mistakes.\n* **Stay Positive:** Maintain a positive attitude and don't get discouraged by losses.\n* **Have Fun!** Remember to enjoy the process of learning and improving.\n\n**VII. Conclusion: The Future is Play**\n\nGaming is more than just pressing buttons; it's a dynamic and evolving art form that connects people, fosters creativity, and pushes the boundaries of technology. Whether you're exploring vast open worlds, competing in esports tournaments, or simply relaxing with a casual mobile game, there's a place for everyone in the gaming community. So, grab your controller, fire up your PC, or download your favorite mobile game and prepare to level up your life!\n\n**What are your favorite games and platforms? Share your thoughts in the comments below!**\n",
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
                  <span className="text-xs md:text-lg">
                    {`${blogData.author.firstName} ${blogData.author.lastName}`}{" "}
                  </span>
                  <span className="text-sm text-blue-400 ">
                    @{blogData.author.username}
                  </span>
                  {/*  */}
                </div>
                <Badge className="bg-amber-400">PREMIUM USER</Badge>
              </div>
              <div className="flex md:mr-10">
                {blogData.isAiGenerated && (
                  <AiGeneratedBadge className="w-8 h-8 md:w-10 md:h-10" />
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
                <div className="flex items-center space-x-2 text-blue-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {format(new Date(blogData.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
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
                <div className="flex items-center space-x-2 text-blue-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {format(new Date(blogData.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
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
