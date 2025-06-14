"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, TrendingUp, Award, Zap, Heart, Brain, Users, MessageCircle } from "lucide-react"

export default function ProgressDashboard() {
  const achievements = [
    { name: "First Steps", description: "Complete your first mood check-in", earned: true, icon: Heart },
    { name: "Consistent Tracker", description: "Log mood for 7 days straight", earned: true, icon: Calendar },
    { name: "Deep Thinker", description: "Write 10 journal entries", earned: true, icon: Brain },
    { name: "Focus Master", description: "Complete 50 timer sessions", earned: false, icon: Zap },
    { name: "Mission Accomplished", description: "Complete 25 daily missions", earned: false, icon: Target },
    { name: "Community Helper", description: "Help others in support groups", earned: false, icon: Users },
  ]

  const weeklyStats = [
    { day: "Mon", mood: 7, activities: 4 },
    { day: "Tue", mood: 6, activities: 5 },
    { day: "Wed", mood: 8, activities: 3 },
    { day: "Thu", mood: 7, activities: 5 },
    { day: "Fri", mood: 9, activities: 4 },
    { day: "Sat", mood: 8, activities: 2 },
    { day: "Sun", mood: 7, activities: 3 },
  ]

  const recentActivities = [
    { activity: "Completed breathing exercise", time: "2 hours ago", points: 15 },
    { activity: "Logged mood (8/10)", time: "4 hours ago", points: 10 },
    { activity: "Wrote journal entry", time: "Yesterday", points: 15 },
    { activity: "Helped in support group", time: "Yesterday", points: 20 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1,250</div>
            <p className="text-xs text-muted-foreground">+50 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7.4/10</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities Done</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">26</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest therapeutic activities and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{activity.activity}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +{activity.points} pts
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
          <CardDescription>Your mood and activity levels this week</CardDescription>
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
                    <span className="text-xs font-medium w-8">{day.mood}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12">Tasks</span>
                    <Progress value={day.activities * 20} className="flex-1 h-2" />
                    <span className="text-xs font-medium w-8">{day.activities}/5</span>
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
          <CardDescription>Your therapy journey milestones</CardDescription>
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
