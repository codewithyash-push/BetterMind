"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Trophy,
  Calendar,
  Crown,
  Shield,
  User,
  Plus,
  Send,
  MessageSquare,
  Settings,
  UserMinus,
  UserPlus,
} from "lucide-react"

interface SocialHubProps {
  user: any
}

export default function SocialHub({ user }: SocialHubProps) {
  const [newPost, setNewPost] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  // Mock data for social features
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        username: "mindful_mike",
        displayName: "Mike Chen",
        avatar: "🧘‍♂️",
        level: 12,
        role: "user",
      },
      content:
        "Just completed my 30th day of meditation! The breathing exercises in MindQuest really helped me stay consistent. Anyone else finding the mini-games helpful for anxiety management?",
      timestamp: "2024-01-15T10:30:00Z",
      likes: 15,
      comments: 8,
      tags: ["meditation", "anxiety", "milestone"],
      liked: false,
    },
    {
      id: 2,
      author: {
        username: "therapist_sarah",
        displayName: "Dr. Sarah Johnson",
        avatar: "👩‍⚕️",
        level: 25,
        role: "therapist",
      },
      content:
        "Reminder: Progress isn't always linear! Some days will be harder than others, and that's completely normal. Celebrate small wins and be kind to yourself. 💙 #MentalHealthMatters",
      timestamp: "2024-01-15T09:15:00Z",
      likes: 32,
      comments: 12,
      tags: ["motivation", "therapy", "selfcare"],
      liked: true,
    },
    {
      id: 3,
      author: {
        username: "wellness_warrior",
        displayName: "Alex Rivera",
        avatar: "💪",
        level: 8,
        role: "user",
      },
      content:
        "The Focus Flow game is addictive! 🎯 Just hit my personal best score. It's amazing how gaming can actually help with ADHD symptoms. Thanks MindQuest team!",
      timestamp: "2024-01-15T08:45:00Z",
      likes: 18,
      comments: 5,
      tags: ["gaming", "adhd", "focus"],
      liked: false,
    },
  ])

  const [supportGroups] = useState([
    {
      id: 1,
      name: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety",
      members: 127,
      category: "Anxiety",
      isPrivate: false,
      moderator: "therapist_sarah",
      joined: true,
    },
    {
      id: 2,
      name: "ADHD Focus Friends",
      description: "Connect with others managing ADHD and share productivity tips",
      members: 89,
      category: "ADHD",
      isPrivate: false,
      moderator: "mindful_mike",
      joined: false,
    },
    {
      id: 3,
      name: "Depression Warriors",
      description: "Supporting each other through the ups and downs of depression",
      members: 156,
      category: "Depression",
      isPrivate: true,
      moderator: "therapist_sarah",
      joined: true,
    },
    {
      id: 4,
      name: "Mindfulness Masters",
      description: "Daily meditation and mindfulness practice community",
      members: 203,
      category: "Mindfulness",
      isPrivate: false,
      moderator: "wellness_warrior",
      joined: true,
    },
  ])

  const [leaderboard] = useState([
    {
      rank: 1,
      username: "ByteBusters",
      displayName: "Platform Owner",
      avatar: "🏆",
      points: 10000,
      level: 50,
      streak: 365,
      role: "owner",
    },
    {
      rank: 2,
      username: "therapist_sarah",
      displayName: "Dr. Sarah Johnson",
      avatar: "👩‍⚕️",
      points: 5000,
      level: 25,
      streak: 45,
      role: "therapist",
    },
    {
      rank: 3,
      username: "mindful_mike",
      displayName: "Mike Chen",
      avatar: "🧘‍♂️",
      points: 2400,
      level: 12,
      streak: 28,
      role: "user",
    },
    {
      rank: 4,
      username: "wellness_warrior",
      displayName: "Alex Rivera",
      avatar: "💪",
      points: 1800,
      level: 8,
      streak: 15,
      role: "user",
    },
  ])

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          level: user.level,
          role: user.role,
        },
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        tags: [],
        liked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "therapist":
        return <Shield className="h-4 w-4 text-blue-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "owner":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Owner</Badge>
      case "therapist":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Therapist</Badge>
      default:
        return <Badge variant="secondary">Member</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Feed</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Groups</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{user.role === "owner" ? "Admin" : "Settings"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          <div className="space-y-6">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Share Your Journey
                </CardTitle>
                <CardDescription>Connect with the community and share your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="What's on your mind? Share your thoughts, progress, or ask for support..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className="text-sm text-muted-foreground">{user.displayName}</span>
                        {getRoleBadge(user.role)}
                      </div>
                      <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{post.author.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{post.author.displayName}</span>
                            {getRoleIcon(post.author.role)}
                            <Badge variant="outline" className="text-xs">
                              Level {post.author.level}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>

                      {/* Post Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 pt-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${post.liked ? "text-red-500" : ""}`}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="space-y-6">
            {/* Create Group (Owner/Therapist only) */}
            {(user.role === "owner" || user.role === "therapist") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Support Group
                  </CardTitle>
                  <CardDescription>Start a new community for specific topics or conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Group name..."
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                  <Button disabled={!newGroupName.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Support Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportGroups.map((group) => (
                <Card key={group.id} className={group.joined ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {group.name}
                          {group.isPrivate && <Shield className="h-4 w-4 text-gray-500" />}
                        </CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{group.members} members</span>
                        <span className="text-muted-foreground">Mod: @{group.moderator}</span>
                      </div>
                      <Button variant={group.joined ? "outline" : "default"} size="sm" className="w-full">
                        {group.joined ? (
                          <>
                            <UserMinus className="h-4 w-4 mr-2" />
                            Leave Group
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Join Group
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Community Leaderboard
              </CardTitle>
              <CardDescription>See how you rank among the MindQuest community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((member) => (
                  <div
                    key={member.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      member.username === user.username ? "border-blue-200 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          member.rank === 1
                            ? "bg-yellow-100 text-yellow-700"
                            : member.rank === 2
                              ? "bg-gray-100 text-gray-700"
                              : member.rank === 3
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {member.rank}
                      </div>
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{member.displayName}</span>
                        {getRoleIcon(member.role)}
                        {member.username === user.username && (
                          <Badge variant="secondary" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">@{member.username}</span>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{member.points.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          <span>{member.streak} days</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Level {member.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          {user.role === "owner" ? <OwnerAdminPanel user={user} /> : <UserSettings user={user} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OwnerAdminPanel({ user }: { user: any }) {
  const [stats] = useState({
    totalUsers: 1247,
    activeToday: 89,
    totalPosts: 3456,
    supportGroups: 23,
    totalSessions: 15678,
    avgMoodScore: 7.2,
  })

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Owner Dashboard
          </CardTitle>
          <CardDescription className="text-yellow-100">
            Welcome back, {user.displayName}! Here's your platform overview.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeToday}</div>
            <p className="text-xs text-muted-foreground">Users online today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.supportGroups}</div>
            <p className="text-xs text-muted-foreground">Active communities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Therapy Sessions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Completed activities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Mood Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgMoodScore}/10</div>
            <p className="text-xs text-muted-foreground">Community wellbeing</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
          <CardDescription>Administrative tools and controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              Moderate Content
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Platform Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserSettings({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </CardTitle>
          <CardDescription>Manage your profile and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.displayName}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Level {user.level}</Badge>
                <Badge variant="secondary">{user.points} points</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline">Privacy Settings</Button>
            <Button variant="outline">Notification Settings</Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
