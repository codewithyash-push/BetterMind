"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Heart,
  BookOpen,
  Timer,
  Target,
  Gamepad2,
  Flame,
  Star,
  Calendar,
  TrendingUp,
  Users,
  Bot,
} from "lucide-react"
import MoodTracker from "./components/mood-tracker"
import EmotionalJournal from "./components/emotional-journal"
import ADHDTimer from "./components/adhd-timer"
import DailyMissions from "./components/daily-missions"
import MiniGames from "./components/mini-games"
import ProgressDashboard from "./components/progress-dashboard"
import AuthComponent from "./components/auth-component"
import SocialHub from "./components/social-hub"
import AIAssistant from "./components/ai-assistant"
import OnboardingTour from "./components/onboarding-tour"

export default function TherapyPlatform() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(1250)
  const [level, setLevel] = useState(5)
  const [completedToday, setCompletedToday] = useState(3)
  const [dailyGoal] = useState(5)

  // Add user state and authentication check at the top of the component
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showTour, setShowTour] = useState(false)

  // Add useEffect to check authentication and tour status
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("bettermind_user")
      const tourCompleted = localStorage.getItem("bettermind_tour_completed")

      if (userData) {
        const user = JSON.parse(userData)
        setUser(user)

        // Show tour for new users who haven't completed it
        if (user.isNewUser && !tourCompleted) {
          setShowTour(true)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const handleTourComplete = () => {
    setShowTour(false)
    // Update user to no longer be new
    if (user) {
      const updatedUser = { ...user, isNewUser: false }
      setUser(updatedUser)
      localStorage.setItem("bettermind_user", JSON.stringify(updatedUser))
    }
  }

  const handleTourSkip = () => {
    setShowTour(false)
    // Update user to no longer be new
    if (user) {
      const updatedUser = { ...user, isNewUser: false }
      setUser(updatedUser)
      localStorage.setItem("bettermind_user", JSON.stringify(updatedUser))
    }
  }

  // Add conditional rendering for authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <p>Loading BetterMind...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthComponent onLogin={setUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Onboarding Tour */}
      {showTour && <OnboardingTour onComplete={handleTourComplete} onSkip={handleTourSkip} />}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50" data-tour="header">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BetterMind</h1>
                <p className="text-sm text-gray-600">Your CBT Journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-orange-600">{currentStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-yellow-600">{totalPoints} points</span>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Level {level}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Daily Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white" data-tour="progress-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Progress
            </CardTitle>
            <CardDescription className="text-blue-100">
              Keep up the great work! You're making excellent progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">
                {completedToday} of {dailyGoal} activities completed
              </span>
              <span className="text-2xl font-bold">{Math.round((completedToday / dailyGoal) * 100)}%</span>
            </div>
            <Progress value={(completedToday / dailyGoal) * 100} className="h-3 bg-white/20" />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-fit lg:grid-cols-7">
            <TabsTrigger value="dashboard" className="flex items-center gap-2" data-tour="dashboard-tab">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2" data-tour="mood-tab">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2" data-tour="journal-tab">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2" data-tour="timer-tab">
              <Timer className="h-4 w-4" />
              <span className="hidden sm:inline">Timer</span>
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex items-center gap-2" data-tour="missions-tab">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Missions</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2" data-tour="games-tab">
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden sm:inline">Games</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2" data-tour="social-tab">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2" data-tour="ai-tab">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ProgressDashboard />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="journal">
            <EmotionalJournal />
          </TabsContent>

          <TabsContent value="timer">
            <ADHDTimer />
          </TabsContent>

          <TabsContent value="missions">
            <DailyMissions />
          </TabsContent>

          <TabsContent value="games">
            <MiniGames />
          </TabsContent>

          <TabsContent value="social">
            <SocialHub user={user} />
          </TabsContent>
          <TabsContent value="ai">
            <AIAssistant user={user} />
          </TabsContent>
        </Tabs>
        {/* Footer */}
        <footer className="mt-16 border-t bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">BetterMind</span>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>
                  Created by <span className="font-semibold text-blue-600">ByteBusters</span>
                </p>
                <p className="mt-1">© 2024 BetterMind. All rights reserved.</p>
              </div>
              <div className="text-xs text-gray-500">Empowering mental wellness through technology</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
