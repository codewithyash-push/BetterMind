"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, Calendar, Clock, Heart, Brain, Lightbulb, CheckCircle, AlertCircle, Smile } from "lucide-react"

interface AIAssistantProps {
  user: any
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  scheduledActivity?: {
    type: string
    time: string
    description: string
  }
}

export default function AIAssistant({ user }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello ${user.displayName}! 👋 I'm your personal AI therapy assistant. I'm here to help you with your mental health journey, schedule activities, and provide personalized advice. How are you feeling today?`,
      timestamp: new Date(),
      suggestions: [
        "I'm feeling anxious today",
        "Help me plan my day",
        "I need motivation",
        "Schedule a breathing exercise",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    let response = ""
    let suggestions: string[] = []
    let scheduledActivity = undefined

    // Anxiety responses
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried")) {
      response =
        "I understand you're feeling anxious. That's completely normal and you're not alone. Let's try some techniques that can help right now. Would you like me to guide you through a breathing exercise or schedule some calming activities?"
      suggestions = [
        "Start breathing exercise now",
        "Schedule meditation for later",
        "Show me anxiety coping strategies",
        "I want to journal about this",
      ]
    }
    // Depression/sad responses
    else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
      response =
        "I hear that you're going through a tough time. Your feelings are valid, and it's okay to not be okay sometimes. Small steps can make a big difference. What's one tiny thing we could do together right now to help you feel a bit better?"
      suggestions = [
        "Suggest mood-boosting activities",
        "Help me set small goals",
        "Schedule self-care time",
        "Connect me with support groups",
      ]
    }
    // Planning/scheduling
    else if (lowerMessage.includes("plan") || lowerMessage.includes("schedule") || lowerMessage.includes("organize")) {
      response =
        "I'd love to help you plan your day! A structured routine can really support your mental health. Based on your progress, I recommend balancing therapy activities with self-care. What time works best for you?"
      suggestions = ["Schedule morning routine", "Plan evening wind-down", "Set therapy reminders", "Block focus time"]
      scheduledActivity = {
        type: "Daily Planning Session",
        time: "Tomorrow 9:00 AM",
        description: "Review goals and plan therapeutic activities",
      }
    }
    // Motivation
    else if (
      lowerMessage.includes("motivation") ||
      lowerMessage.includes("motivated") ||
      lowerMessage.includes("energy")
    ) {
      response = `Looking at your progress, ${user.displayName}, you've already accomplished so much! You're on a ${user.streak || 7}-day streak and at Level ${user.level || 5}. That shows real commitment to your mental health. What specific area would you like to focus your energy on today?`
      suggestions = [
        "Set a new challenge",
        "Review my achievements",
        "Find accountability partner",
        "Celebrate recent wins",
      ]
    }
    // Breathing/meditation
    else if (lowerMessage.includes("breath") || lowerMessage.includes("meditat") || lowerMessage.includes("calm")) {
      response =
        "Breathing exercises are excellent for managing stress and anxiety. I can guide you through different techniques - from quick 2-minute exercises to longer 10-minute sessions. Which would work better for you right now?"
      suggestions = [
        "Quick 2-minute breathing",
        "Guided 5-minute meditation",
        "Schedule daily breathing",
        "Learn new techniques",
      ]
      scheduledActivity = {
        type: "Breathing Exercise",
        time: "In 5 minutes",
        description: "5-minute guided breathing session for relaxation",
      }
    }
    // Sleep issues
    else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      response =
        "Sleep is crucial for mental health. Poor sleep can worsen anxiety and depression. Let's work on creating a better sleep routine. I can help you schedule wind-down activities and set up sleep hygiene reminders."
      suggestions = [
        "Create bedtime routine",
        "Schedule wind-down time",
        "Learn sleep techniques",
        "Track sleep patterns",
      ]
    }
    // General positive
    else if (lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("happy")) {
      response =
        "That's wonderful to hear! 😊 I'm so glad you're feeling good today. These positive moments are important to acknowledge and celebrate. Would you like to capture this feeling in your journal or use this energy for some productive activities?"
      suggestions = [
        "Journal about this feeling",
        "Set ambitious goals",
        "Help others in community",
        "Try a challenging game",
      ]
    }
    // Default response
    else {
      response =
        "Thank you for sharing that with me. I'm here to support you in whatever way I can. Whether you need help with anxiety, planning your day, staying motivated, or just want to talk through your thoughts - I'm listening. What would be most helpful for you right now?"
      suggestions = ["Help with anxiety", "Plan my activities", "Need motivation", "Just want to chat"]
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: response,
      timestamp: new Date(),
      suggestions,
      scheduledActivity,
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            AI Therapy Assistant
          </CardTitle>
          <CardDescription className="text-purple-100">
            Your personal mental health companion, available 24/7 for support and guidance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AI Assistant Online</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Secure & Private
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "ai" && (
                    <Avatar className="w-8 h-8 bg-purple-100">
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-purple-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[80%] space-y-2 ${message.type === "user" ? "order-1" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Scheduled Activity */}
                    {message.scheduledActivity && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Activity Scheduled</span>
                        </div>
                        <div className="text-sm text-green-700">
                          <div className="font-medium">{message.scheduledActivity.type}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {message.scheduledActivity.time}
                          </div>
                          <div className="text-xs mt-1">{message.scheduledActivity.description}</div>
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-full px-3 py-1 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="w-8 h-8 bg-blue-100">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 bg-purple-100">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common requests you can ask your AI assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => handleSuggestionClick("I'm feeling anxious and need help")}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Anxiety Help</div>
                  <div className="text-xs text-muted-foreground">Get immediate support</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => handleSuggestionClick("Help me plan my day with therapy activities")}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Plan My Day</div>
                  <div className="text-xs text-muted-foreground">Schedule activities</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => handleSuggestionClick("I need motivation to continue my therapy journey")}
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Get Motivated</div>
                  <div className="text-xs text-muted-foreground">Boost your energy</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => handleSuggestionClick("Guide me through a breathing exercise")}
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-green-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Breathing Exercise</div>
                  <div className="text-xs text-muted-foreground">Calm your mind</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI Insights for {user.displayName}
          </CardTitle>
          <CardDescription>Personalized observations based on your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-blue-900">Great Progress Pattern</div>
                <div className="text-sm text-blue-700">
                  You're most active with therapy activities in the morning. Consider scheduling challenging tasks
                  during this peak time.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Smile className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-green-900">Mood Improvement</div>
                <div className="text-sm text-green-700">
                  Your mood scores have increased by 15% this week. The breathing exercises seem particularly effective
                  for you.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-yellow-900">Suggestion</div>
                <div className="text-sm text-yellow-700">
                  Try joining the "Mindfulness Masters" support group - it aligns with your interests and current
                  progress.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
