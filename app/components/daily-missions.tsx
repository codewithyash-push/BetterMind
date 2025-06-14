"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, CheckCircle, Clock, Star, Heart, Brain, Coffee, Book, Smile, Zap } from "lucide-react"

export default function DailyMissions() {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Morning Mood Check-in",
      description: "Log your mood and set intentions for the day",
      points: 10,
      completed: true,
      category: "mood",
      icon: Heart,
      difficulty: "easy",
    },
    {
      id: 2,
      title: "Focus Timer Session",
      description: "Complete a 25-minute focused work session",
      points: 20,
      completed: false,
      category: "productivity",
      icon: Clock,
      difficulty: "medium",
    },
    {
      id: 3,
      title: "Gratitude Journal",
      description: "Write down 3 things you're grateful for today",
      points: 15,
      completed: false,
      category: "mindfulness",
      icon: Book,
      difficulty: "easy",
    },
    {
      id: 4,
      title: "Breathing Exercise",
      description: "Practice 5 minutes of deep breathing or meditation",
      points: 15,
      completed: true,
      category: "wellness",
      icon: Brain,
      difficulty: "easy",
    },
    {
      id: 5,
      title: "Challenge Negative Thought",
      description: "Identify and reframe one negative thought pattern",
      points: 25,
      completed: false,
      category: "cbt",
      icon: Zap,
      difficulty: "hard",
    },
    {
      id: 6,
      title: "Self-Care Activity",
      description: "Do something kind for yourself (bath, walk, hobby)",
      points: 20,
      completed: false,
      category: "wellness",
      icon: Smile,
      difficulty: "medium",
    },
  ])

  const toggleMission = (id: number) => {
    setMissions((prev) =>
      prev.map((mission) => (mission.id === id ? { ...mission, completed: !mission.completed } : mission)),
    )
  }

  const completedMissions = missions.filter((m) => m.completed).length
  const totalPoints = missions.filter((m) => m.completed).reduce((sum, m) => sum + m.points, 0)
  const maxPoints = missions.reduce((sum, m) => sum + m.points, 0)

  const getCategoryColor = (category: string) => {
    const colors = {
      mood: "bg-red-100 text-red-700",
      productivity: "bg-blue-100 text-blue-700",
      mindfulness: "bg-green-100 text-green-700",
      wellness: "bg-purple-100 text-purple-700",
      cbt: "bg-yellow-100 text-yellow-700",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-100 text-green-700 border-green-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      hard: "bg-red-100 text-red-700 border-red-200",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Daily Mission Progress
          </CardTitle>
          <CardDescription className="text-green-100">
            Complete missions to earn points and build healthy habits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {completedMissions} of {missions.length} missions completed
              </span>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-xl font-bold">
                  {totalPoints}/{maxPoints} points
                </span>
              </div>
            </div>
            <Progress value={(completedMissions / missions.length) * 100} className="h-3 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Mission List */}
      <div className="grid gap-4">
        {missions.map((mission) => {
          const IconComponent = mission.icon
          return (
            <Card
              key={mission.id}
              className={`transition-all ${mission.completed ? "bg-green-50 border-green-200" : "hover:shadow-md"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center pt-1">
                    <Checkbox
                      checked={mission.completed}
                      onCheckedChange={() => toggleMission(mission.id)}
                      className="h-5 w-5"
                    />
                  </div>

                  <div className={`p-2 rounded-full ${getCategoryColor(mission.category)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-medium ${mission.completed ? "line-through text-muted-foreground" : ""}`}>
                          {mission.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          +{mission.points} pts
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={`text-xs ${getCategoryColor(mission.category)}`}>
                        {mission.category}
                      </Badge>
                      {mission.completed && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">Completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bonus Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Bonus Challenges
          </CardTitle>
          <CardDescription>Extra activities for additional points and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="h-4 w-4 text-orange-500" />
                <h3 className="font-medium">Mindful Morning</h3>
                <Badge variant="outline" className="text-xs">
                  +30 pts
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Complete all morning missions before 10 AM</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">Perfect Day</h3>
                <Badge variant="outline" className="text-xs">
                  +50 pts
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Complete all daily missions in one day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
