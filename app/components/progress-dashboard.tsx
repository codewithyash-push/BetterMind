"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, TrendingUp, Award, Zap, Heart, Brain, Users, MessageCircle } from "lucide-react"

export default function ProgressDashboard() {
  // Get current user from localStorage to check if they're new
  const currentUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("bettermind_user") || "{}") : {}
  const isNewUser = currentUser.isNewUser || (currentUser.points === 0 && currentUser.streak === 0)

  const achievements = [
    { name: "First Steps", description: "Complete your first mood check-in", earned: !isNewUser, icon: Heart },
    { name: "Consistent Tracker", description: "Log mood for 7 days straight", earned: false, icon: Calendar },
    { name: "Deep Thinker", description: "Write 10 journal entries", earned: false, icon: Brain },
    { name: "Focus Master", description: "Complete 50 timer sessions", earned: false, icon: Zap },
    { name: "Mission Accomplished", description: "Complete 25 daily missions", earned: false, icon: Target },
    { name: "Community Helper", description: "Help others in support groups", earned: false, icon: Users },
  ]

  const weeklyStats = isNewUser
    ? [
        { day: "Mon", mood: 0, activities: 0 },
        { day: "Tue", mood: 0, activities: 0 },
        { day: "Wed", mood: 0, activities: 0 },
        { day: "Thu", mood: 0, activities: 0 },
        { day: "Fri", mood: 0, activities: 0 },
        { day: "Sat", mood: 0, activities: 0 },
        { day: "Sun", mood: 0, activities: 0 },
      ]
    : [
        { day: "Mon", mood: 7, activities: 4 },
        { day: "Tue", mood: 6, activities: 5 },
        { day: "Wed", mood: 8, activities: 3 },
        { day: "Thu", mood: 7, activities: 5 },
        { day: "Fri", mood: 9, activities: 4 },
        { day: "Sat", mood: 8, activities: 2 },
        { day: "Sun", mood: 7, activities: 3 },
      ]

  const recentActivities = isNewUser
    ? [
        { activity: "Welcome to BetterMind! 🎉", time: "Just now", points: 0 },
        { activity: "Start your journey by tracking your mood", time: "Get started", points: 10 },
        { activity: "Write your first journal entry", time: "Get started", points: 15 },
        { activity: "Complete your first daily mission", time: "Get started", points: 20 },
      ]
    : [
        { activity: "Completed breathing exercise", time: "2 hours ago", points: 15 },
        { activity: "Logged mood (8/10)", time: "4 hours ago", points: 10 },
        { activity: "Wrote journal entry", time: "Yesterday", points: 15 },
        { activity: "Helped in support group", time: "Yesterday", points: 20 },
      ]

  return (
    <div className="space-y-6">
      {/* Welcome message for new users */}
      {isNewUser && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Welcome to BetterMind! 🎉</h2>
              <p className="text-blue-600 mb-4">
                Your mental health journey starts here. Let's begin by exploring the features!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="bg-white">
                  Track your mood
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Write in your journal
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Complete daily missions
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Use focus timers
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{isNewUser ? 0 : 7} days</div>
            <p className="text-xs text-muted-foreground">{isNewUser ? "Start your streak!" : "Keep it up!"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{isNewUser ? 0 : 1250}</div>
            <p className="text-xs text-muted-foreground">
              {isNewUser ? "Earn your first points!" : "+50 from yesterday"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{isNewUser ? "--" : "7.4/10"}</div>
            <p className="text-xs text-muted-foreground">{isNewUser ? "Track your first mood" : "This week"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities Done</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{isNewUser ? 0 : 26}</div>
            <p className="text-xs text-muted-foreground">{isNewUser ? "Complete your first activity!" : "This week"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {isNewUser ? "Getting Started" : "Recent Activity"}
          </CardTitle>
          <CardDescription>
            {isNewUser
              ? "Here's how to begin your mental health journey"
              : "Your latest therapeutic activities and achievements"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${isNewUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
              >
                <div>
                  <div className="font-medium text-sm">{activity.activity}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.points > 0 ? `+${activity.points} pts` : isNewUser && index === 0 ? "🎉" : "Start"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>
            {isNewUser
              ? "Your progress will appear here as you use the app"
              : "Your mood and activity levels this week"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12">Mood</span>
                    <Progress value={day.mood * 10} className="flex-1 h-2" />
                    <span className="text-xs font-medium w-8">{day.mood > 0 ? `${day.mood}/10` : "--"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12">Tasks</span>
                    <Progress value={day.activities * 20} className="flex-1 h-2" />
                    <span className="text-xs font-medium w-8">{day.activities > 0 ? `${day.activities}/5` : "--"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            {isNewUser
              ? "Unlock achievements as you progress on your therapy journey"
              : "Your therapy journey milestones"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${achievement.earned ? "bg-yellow-100" : "bg-gray-100"}`}>
                      <IconComponent
                        className={`h-4 w-4 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      {achievement.earned && (
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
