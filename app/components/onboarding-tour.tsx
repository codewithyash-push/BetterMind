"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  X,
  ArrowRight,
  ArrowLeft,
  Heart,
  BookOpen,
  Timer,
  Target,
  Gamepad2,
  Users,
  Bot,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Play,
} from "lucide-react"

interface OnboardingTourProps {
  onComplete: () => void
  onSkip: () => void
}

interface TourStep {
  id: string
  title: string
  description: string
  icon: any
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
  highlight?: boolean
}

export default function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const tourSteps: TourStep[] = [
    {
      id: "welcome",
      title: "Welcome to BetterMind! 🎉",
      description:
        "Your personal mental health companion is ready to help you on your wellness journey. Let's take a quick tour to show you around!",
      icon: Sparkles,
      target: "header",
      position: "bottom",
      highlight: true,
    },
    {
      id: "dashboard",
      title: "Your Progress Dashboard",
      description:
        "This is your command center! Track your daily progress, see your achievements, and monitor your mental health journey over time.",
      icon: TrendingUp,
      target: "dashboard-tab",
      position: "bottom",
      action: "Click to explore",
    },
    {
      id: "mood",
      title: "Mood Tracking",
      description:
        "Log your daily emotions and feelings. Understanding your mood patterns is the first step to better mental health.",
      icon: Heart,
      target: "mood-tab",
      position: "bottom",
      action: "Track your first mood",
    },
    {
      id: "journal",
      title: "Emotional Journaling",
      description:
        "Express your thoughts and feelings through writing. Journaling is a powerful CBT technique for processing emotions.",
      icon: BookOpen,
      target: "journal-tab",
      position: "bottom",
      action: "Write your first entry",
    },
    {
      id: "timer",
      title: "Focus Timer",
      description:
        "ADHD-friendly Pomodoro timers to help you stay focused and productive. Perfect for work, study, or any task requiring concentration.",
      icon: Timer,
      target: "timer-tab",
      position: "bottom",
      action: "Start a focus session",
    },
    {
      id: "missions",
      title: "Daily Missions",
      description:
        "Gamified daily goals that make mental health activities fun and rewarding. Complete missions to earn points and build healthy habits.",
      icon: Target,
      target: "missions-tab",
      position: "bottom",
      action: "View your missions",
    },
    {
      id: "games",
      title: "Therapeutic Mini-Games",
      description:
        "Fun, science-based games designed to improve focus, memory, and emotional awareness while supporting your mental health.",
      icon: Gamepad2,
      target: "games-tab",
      position: "bottom",
      action: "Play a game",
    },
    {
      id: "social",
      title: "Community Support",
      description:
        "Connect with others on similar journeys. Join support groups, share experiences, and find encouragement in our safe community.",
      icon: Users,
      target: "social-tab",
      position: "bottom",
      action: "Explore community",
    },
    {
      id: "ai",
      title: "AI Therapy Assistant",
      description:
        "Your 24/7 mental health companion. Get personalized advice, schedule activities, and receive support whenever you need it.",
      icon: Bot,
      target: "ai-tab",
      position: "bottom",
      action: "Chat with AI",
    },
    {
      id: "complete",
      title: "You're All Set! 🚀",
      description:
        "You now know all the key features of BetterMind. Start with tracking your mood or writing in your journal. Remember, small steps lead to big changes!",
      icon: CheckCircle,
      target: "progress-card",
      position: "top",
      highlight: true,
    },
  ]

  const currentTourStep = tourSteps[currentStep]
  const progress = ((currentStep + 1) / tourSteps.length) * 100

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeTour = () => {
    setIsVisible(false)
    // Mark tour as completed in localStorage
    localStorage.setItem("bettermind_tour_completed", "true")
    onComplete()
  }

  const skipTour = () => {
    setIsVisible(false)
    localStorage.setItem("bettermind_tour_completed", "true")
    onSkip()
  }

  // Add tour overlay styles
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"
      // Add tour overlay
      const overlay = document.createElement("div")
      overlay.id = "tour-overlay"
      overlay.className = "fixed inset-0 bg-black/50 z-40 pointer-events-none"
      document.body.appendChild(overlay)

      // Highlight target element
      if (currentTourStep.target !== "welcome" && currentTourStep.target !== "complete") {
        const targetElement = document.querySelector(`[data-tour="${currentTourStep.target}"]`)
        if (targetElement) {
          targetElement.classList.add("tour-highlight")
        }
      }

      return () => {
        document.body.style.overflow = "unset"
        const overlay = document.getElementById("tour-overlay")
        if (overlay) {
          overlay.remove()
        }
        // Remove all highlights
        document.querySelectorAll(".tour-highlight").forEach((el) => {
          el.classList.remove("tour-highlight")
        })
      }
    }
  }, [isVisible, currentStep, currentTourStep.target])

  if (!isVisible) return null

  return (
    <>
      {/* Tour Styles */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 50;
          border-radius: 8px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2);
          animation: tour-pulse 2s infinite;
        }

        @keyframes tour-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.7), 0 0 0 12px rgba(59, 130, 246, 0.1);
          }
        }
      `}</style>

      {/* Tour Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <Card className="w-full max-w-md pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <currentTourStep.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Step {currentStep + 1} of {tourSteps.length}
                    </Badge>
                    {currentTourStep.highlight && (
                      <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-500">Important</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={skipTour} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>

          <CardContent className="space-y-4">
            <CardDescription className="text-sm leading-relaxed">{currentTourStep.description}</CardDescription>

            {currentTourStep.action && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Play className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">{currentTourStep.action}</span>
              </div>
            )}

            {/* Special content for specific steps */}
            {currentStep === 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <Heart className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-800">Mood Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <span className="text-xs text-purple-800">AI Assistant</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                    <Target className="h-4 w-4 text-orange-600" />
                    <span className="text-xs text-orange-800">Daily Missions</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-blue-800">Community</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === tourSteps.length - 1 && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Quick Start Tips:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Start by tracking your mood daily</li>
                    <li>• Complete 1-2 daily missions each day</li>
                    <li>• Use the AI assistant when you need support</li>
                    <li>• Join a support group that interests you</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={skipTour} className="text-sm">
                  Skip Tour
                </Button>
                <Button onClick={nextStep} className="flex items-center gap-2">
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      Get Started
                      <CheckCircle className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
