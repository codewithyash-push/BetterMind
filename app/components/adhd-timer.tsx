"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Timer, Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react"

export default function ADHDTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(25)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const timerPresets = [
    { name: "Pomodoro", duration: 25, icon: Brain, color: "bg-red-100 text-red-700" },
    { name: "Short Focus", duration: 15, icon: Zap, color: "bg-blue-100 text-blue-700" },
    { name: "Deep Work", duration: 45, icon: Timer, color: "bg-purple-100 text-purple-700" },
    { name: "Quick Task", duration: 10, icon: Coffee, color: "bg-green-100 text-green-700" },
  ]

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false)
      if (!isBreak) {
        setCompletedSessions((prev) => prev + 1)
        // Start break timer
        setIsBreak(true)
        setTimeLeft(5 * 60) // 5 minute break
      } else {
        // Break finished
        setIsBreak(false)
        setTimeLeft(selectedDuration * 60)
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, isBreak, selectedDuration])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(selectedDuration * 60)
  }

  const selectPreset = (duration: number) => {
    setSelectedDuration(duration)
    setTimeLeft(duration * 60)
    setIsActive(false)
    setIsBreak(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    const totalTime = isBreak ? 5 * 60 : selectedDuration * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <div className="space-y-6">
      {/* Timer Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Focus Timer Presets
          </CardTitle>
          <CardDescription>Choose a timer duration that works best for your focus needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timerPresets.map((preset) => {
              const IconComponent = preset.icon
              return (
                <button
                  key={preset.name}
                  onClick={() => selectPreset(preset.duration)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedDuration === preset.duration
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`inline-flex p-2 rounded-full mb-2 ${preset.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">{preset.duration} min</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Timer */}
      <Card className={`${isBreak ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isBreak ? "☕ Break Time!" : "🧠 Focus Time"}</CardTitle>
          <CardDescription>
            {isBreak ? "Take a well-deserved break and recharge" : "Stay focused and avoid distractions"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold mb-4">{formatTime(timeLeft)}</div>
            <Progress value={getProgress()} className={`h-3 ${isBreak ? "bg-green-200" : "bg-blue-200"}`} />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`${isBreak ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isActive ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-sm">
              Sessions Completed Today: {completedSessions}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Focus Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Focus Tips</CardTitle>
          <CardDescription>Maximize your productivity with these ADHD-friendly strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">During Focus Time:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Turn off notifications</li>
                <li>• Keep water nearby</li>
                <li>• Use noise-canceling headphones</li>
                <li>• Break large tasks into smaller ones</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">During Break Time:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stand up and stretch</li>
                <li>• Take deep breaths</li>
                <li>• Look away from screens</li>
                <li>• Hydrate and have a snack</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
