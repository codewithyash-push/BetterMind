"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, UserPlus, LogIn } from "lucide-react"

interface AuthComponentProps {
  onLogin: (user: any) => void
}

export default function AuthComponent({ onLogin }: AuthComponentProps) {
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [signupData, setSignupData] = useState({ username: "", password: "", email: "", displayName: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock user database
  const users = [
    {
      id: 1,
      username: "ByteBusters",
      password: "winner",
      email: "admin@bettermind.com",
      displayName: "Platform Owner",
      role: "owner",
      avatar: "🏆",
      joinDate: "2024-01-01",
      level: 50,
      points: 10000,
      streak: 365,
    },
    {
      id: 2,
      username: "therapist_sarah",
      password: "therapy123",
      email: "sarah@bettermind.com",
      displayName: "Dr. Sarah Johnson",
      role: "therapist",
      avatar: "👩‍⚕️",
      joinDate: "2024-01-15",
      level: 25,
      points: 5000,
      streak: 45,
    },
    {
      id: 3,
      username: "mindful_mike",
      password: "mindful123",
      email: "mike@example.com",
      displayName: "Mike Chen",
      role: "user",
      avatar: "🧘‍♂️",
      joinDate: "2024-02-01",
      level: 12,
      points: 2400,
      streak: 28,
    },
    {
      id: 4,
      username: "wellness_warrior",
      password: "wellness123",
      email: "alex@example.com",
      displayName: "Alex Rivera",
      role: "user",
      avatar: "💪",
      joinDate: "2024-02-15",
      level: 8,
      points: 1800,
      streak: 15,
    },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = users.find((u) => u.username === loginData.username && u.password === loginData.password)

    if (user) {
      localStorage.setItem("bettermind_user", JSON.stringify(user))
      onLogin(user)
    } else {
      setError("Invalid username or password")
    }

    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if username already exists
    const existingUser = users.find((u) => u.username === signupData.username)
    if (existingUser) {
      setError("Username already exists")
      setLoading(false)
      return
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username: signupData.username,
      password: signupData.password,
      email: signupData.email,
      displayName: signupData.displayName,
      role: "user",
      avatar: "😊",
      joinDate: new Date().toISOString().split("T")[0],
      level: 1,
      points: 0,
      streak: 0,
    }

    localStorage.setItem("bettermind_user", JSON.stringify(newUser))
    onLogin(newUser)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to BetterMind</CardTitle>
          <CardDescription>Your gamified CBT therapy journey starts here</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
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
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
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
                  <Label htmlFor="signup-displayName">Display Name</Label>
                  <Input
                    id="signup-displayName"
                    type="text"
                    placeholder="How should others see you?"
                    value={signupData.displayName}
                    onChange={(e) => setSignupData({ ...signupData, displayName: e.target.value })}
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
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
