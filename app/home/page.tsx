"use client";

import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getLanguageFontClass } from "@/lib/font-utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSelector } from "@/components/language-selector";
import {
  Home,
  FileText,
  Users,
  MessageCircle,
  FolderOpen,
  Calendar,
  BookOpen,
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Search,
  Download,
  Bell,
  Settings,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: FileText, label: "Posts" },
  { icon: Users, label: "Friends" },
  { icon: MessageCircle, label: "Messages" },
  { icon: FolderOpen, label: "Projects" },
  { icon: Calendar, label: "Events" },
  { icon: BookOpen, label: "Blog Posts" },
];

const topCreators = [
  {
    name: "Liza Doe",
    followers: "1.2k followers",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Liza Doe",
    followers: "1.2k followers",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "MAYTO",
    followers: "1.2k followers",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "MAYTO",
    followers: "1.2k followers",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const posts = [
  {
    id: 1,
    author: "Tenzil Makhar",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content:
      "Here comes a creative Facebook Post to write a script at an Elephant How to write a script at a beginner.",
    image: "/placeholder.svg?height=200&width=300",
    likes: 42,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    author: "Tenzil Makhar",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "4 hours ago",
    content: "Question Question Question Question Question Question Question ?",
    poll: {
      question: "What's your favorite programming language?",
      options: [
        { text: "JavaScript", votes: 45, percentage: 45 },
        { text: "Python", votes: 35, percentage: 35 },
        { text: "Java", votes: 20, percentage: 20 },
      ],
    },
    likes: 28,
    comments: 12,
    shares: 5,
  },
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const [newPost, setNewPost] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-screen bg-gray-50", getLanguageFontClass(language))}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search anything"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded w-80 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-teal-600 text-white hover:bg-teal-700 rounded"
              >
                <Download className="h-4 w-4 mr-2" />
                Download App
              </Button>
              <LanguageSelector />
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="p-4 rounded">
              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors",
                      item.active
                        ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                        : "text-gray-600 hover:bg-gray-50",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </Card>

            {/* Get recognized section */}
            <Card className="p-4 mt-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded">
              <h3 className="font-bold text-gray-900 mb-2">
                Get recognized, and standout from the rest
              </h3>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Join now
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {/* Post Creation */}
            <Card className="p-4 mb-6 rounded">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        📷
                      </Button>
                      <Button variant="ghost" size="sm">
                        📊
                      </Button>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {post.author}
                        </h3>
                        <span className="text-blue-500">✓</span>
                        <span className="text-gray-500 text-sm">
                          {post.time}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="mb-4">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full rounded max-h-80 object-cover"
                          />
                        </div>
                      )}

                      {post.poll && (
                        <div className="mb-4 p-4 bg-gray-50 rounded">
                          <h4 className="font-medium mb-3">
                            {post.poll.question}
                          </h4>
                          <div className="space-y-2">
                            {post.poll.options.map((option, index) => (
                              <div key={index} className="relative">
                                <div className="flex justify-between items-center p-3 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                                  <span>{option.text}</span>
                                  <span className="text-sm text-gray-500">
                                    {option.percentage}%
                                  </span>
                                </div>
                                <div
                                  className="absolute left-0 top-0 h-full bg-teal-100 rounded"
                                  style={{ width: `${option.percentage}%` }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                        <button className="ml-auto text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Top Creators */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Top Creators</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-teal-600">
                    This week
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    Previous
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {topCreators.map((creator, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={creator.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {creator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{creator.name}</p>
                        <p className="text-xs text-gray-500">
                          {creator.followers}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-4 mt-4">
              <h3 className="font-bold text-gray-900 mb-4">
                Trending on WordWise
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-sm mb-1">
                    How to write a script as a beginner
                  </h4>
                  <p className="text-xs text-gray-500">Trending in Writing</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-sm mb-1">
                    AI Tools for Content Creation
                  </h4>
                  <p className="text-xs text-gray-500">
                    Trending in Technology
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
