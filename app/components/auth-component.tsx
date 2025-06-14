"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, Users, Bot, Target, Gamepad2, BookOpen, Timer } from "lucide-react"

interface AuthComponentProps {
  onLogin: (user: any) => void
}

export default function AuthComponent({ onLogin }: AuthComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const user = {
        username: loginData.username,
        displayName: loginData.username === "ByteBusters" ? "Platform Owner" : "Demo User",
        email: "user@example.com",
        avatar: loginData.username === "ByteBusters" ? "🏆" : "😊",
        level: loginData.username === "ByteBusters" ? 50 : 5,
        points: loginData.username === "ByteBusters" ? 10000 : 1250,
        streak: loginData.username === "ByteBusters" ? 365 : 7,
        role: loginData.username === "ByteBusters" ? "owner" : "user",
        isNewUser: false, // Existing users are not new
      }

      localStorage.setItem("bettermind_user", JSON.stringify(user))
      onLogin(user)
      setIsLoading(false)
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const user = {
        username: signupData.username,
        displayName: signupData.displayName || signupData.username,
        email: signupData.email,
        avatar: "😊",
        level: 1,
        points: 0,
        streak: 0,
        role: "user",
        isNewUser: true, // New signups are marked as new users
      }

      localStorage.setItem("bettermind_user", JSON.stringify(user))
      onLogin(user)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and Features */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">BetterMind</h1>
                <p className="text-gray-600">Your CBT Journey Starts Here</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Transform Your Mental Health with AI-Powered Therapy
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of users improving their mental wellness through evidence-based CBT techniques, gamified
              activities, and 24/7 AI support.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-white/80">
              <Heart className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-medium text-gray-800">Mood Tracking</h3>
                <p className="text-sm text-gray-600">Daily emotional insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-white/80">
              <Bot className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="font-medium text-gray-800">AI Assistant</h3>
                <p className="text-sm text-gray-600">24/7 therapy support</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-white/80">
              <Target className="h-6 w-6 text-orange-500" />
              <div>
                <h3 className="font-medium text-gray-800">Daily Missions</h3>
                <p className="text-sm text-gray-600">Gamified wellness goals</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-white/80">
              <Users className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Community</h3>
                <p className="text-sm text-gray-600">Peer support groups</p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">Journaling</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full">
              <Timer className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">Focus Timers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 rounded-full">
              <Gamepad2 className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-800">Therapy Games</span>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to BetterMind</CardTitle>
              <CardDescription>Sign in to continue your mental health journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Enter your username"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="Choose a username"
                        value={signupData.username}
                        onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-display-name">Display Name</Label>
                      <Input
                        id="signup-display-name"
                        type="text"
                        placeholder="Your display name"
                        value={signupData.displayName}
                        onChange={(e) => setSignupData({ ...signupData, displayName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Demo Account Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Try Demo Account:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>Owner:</strong> ByteBusters / winner
                  </p>
                  <p>
                    <strong>User:</strong> demo / demo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
