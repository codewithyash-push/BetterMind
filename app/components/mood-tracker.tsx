"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Smile, Meh, Frown, Calendar } from "lucide-react"

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [recentMoods] = useState([
    { date: "2024-01-15", mood: 8, note: "Had a great therapy session today!" },
    { date: "2024-01-14", mood: 6, note: "Feeling okay, some anxiety in the morning" },
    { date: "2024-01-13", mood: 7, note: "Good day overall, practiced mindfulness" },
    { date: "2024-01-12", mood: 5, note: "Challenging day but used coping strategies" },
    { date: "2024-01-11", mood: 9, note: "Excellent day! Felt very positive" },
  ])

  const moodEmojis = [
    { value: 1, emoji: "😢", label: "Very Sad", color: "text-red-500" },
    { value: 2, emoji: "😟", label: "Sad", color: "text-red-400" },
    { value: 3, emoji: "😕", label: "Down", color: "text-orange-500" },
    { value: 4, emoji: "😐", label: "Neutral", color: "text-yellow-500" },
    { value: 5, emoji: "🙂", label: "Okay", color: "text-yellow-400" },
    { value: 6, emoji: "😊", label: "Good", color: "text-green-400" },
    { value: 7, emoji: "😄", label: "Happy", color: "text-green-500" },
    { value: 8, emoji: "😁", label: "Very Happy", color: "text-green-600" },
    { value: 9, emoji: "🤗", label: "Joyful", color: "text-blue-500" },
    { value: 10, emoji: "🥳", label: "Ecstatic", color: "text-purple-500" },
  ]

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // Here you would typically save to a database
      console.log("Mood submitted:", { mood: selectedMood, note: moodNote })
      setSelectedMood(null)
      setMoodNote("")
      // Show success message
    }
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="h-4 w-4 text-green-500" />
    if (mood >= 6) return <Meh className="h-4 w-4 text-yellow-500" />
    return <Frown className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="space-y-6">
      {/* Mood Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>Track your mood to identify patterns and celebrate progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">Select your mood (1-10):</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedMood === mood.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.value}</div>
                </button>
              ))}
            </div>
            {selectedMood && (
              <div className="mt-2 text-center">
                <Badge variant="secondary" className="text-sm">
                  {moodEmojis.find((m) => m.value === selectedMood)?.label}
                </Badge>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="mood-note" className="text-sm font-medium mb-2 block">
              What's influencing your mood today? (optional)
            </label>
            <Textarea
              id="mood-note"
              placeholder="Share what's on your mind..."
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleMoodSubmit} disabled={!selectedMood} className="w-full">
            Log My Mood (+10 points)
          </Button>
        </CardContent>
      </Card>

      {/* Recent Mood History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Mood History
          </CardTitle>
          <CardDescription>Your mood journey over the past few days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMoods.map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  {getMoodIcon(entry.mood)}
                  <span className="font-semibold text-lg">{entry.mood}/10</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <p className="text-sm">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
