"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Calendar, Tag } from "lucide-react"

export default function EmotionalJournal() {
  const [newEntry, setNewEntry] = useState("")
  const [entryTitle, setEntryTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [journalEntries] = useState([
    {
      id: 1,
      title: "Therapy Session Reflection",
      content:
        "Today I learned about cognitive restructuring. It was eye-opening to realize how my thoughts affect my emotions. I practiced identifying negative thought patterns and challenging them with evidence.",
      date: "2024-01-15",
      tags: ["therapy", "learning", "growth"],
      mood: 8,
    },
    {
      id: 2,
      title: "Anxiety Management",
      content:
        "Had a panic attack this morning but used the breathing techniques I learned. It helped me calm down faster than usual. I'm proud of myself for remembering to use my coping strategies.",
      date: "2024-01-14",
      tags: ["anxiety", "coping", "breathing"],
      mood: 6,
    },
    {
      id: 3,
      title: "Gratitude Practice",
      content:
        "Three things I'm grateful for today: 1) My supportive family, 2) A beautiful sunset I witnessed, 3) Making progress in my therapy journey. Focusing on gratitude really shifts my perspective.",
      date: "2024-01-13",
      tags: ["gratitude", "positivity", "family"],
      mood: 9,
    },
  ])

  const availableTags = [
    "anxiety",
    "depression",
    "therapy",
    "gratitude",
    "coping",
    "breathing",
    "mindfulness",
    "growth",
    "learning",
    "family",
    "work",
    "relationships",
    "self-care",
    "exercise",
    "sleep",
    "nutrition",
    "positivity",
    "challenges",
  ]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmitEntry = () => {
    if (newEntry.trim()) {
      // Here you would typically save to a database
      console.log("New journal entry:", {
        title: entryTitle || "Untitled Entry",
        content: newEntry,
        tags: selectedTags,
        date: new Date().toISOString().split("T")[0],
      })
      setNewEntry("")
      setEntryTitle("")
      setSelectedTags([])
      // Show success message
    }
  }

  return (
    <div className="space-y-6">
      {/* New Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Write a New Entry
          </CardTitle>
          <CardDescription>
            Express your thoughts and feelings. Writing helps process emotions and track your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="entry-title" className="text-sm font-medium mb-2 block">
              Entry Title (optional)
            </label>
            <Input
              id="entry-title"
              placeholder="Give your entry a title..."
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="journal-entry" className="text-sm font-medium mb-2 block">
              Your thoughts and feelings
            </label>
            <Textarea
              id="journal-entry"
              placeholder="What's on your mind today? How are you feeling? What did you learn or experience?"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmitEntry} disabled={!newEntry.trim()} className="w-full">
            Save Entry (+15 points)
          </Button>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Your Journal Entries
          </CardTitle>
          <CardDescription>Reflect on your previous thoughts and see your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Mood: {entry.mood}/10
                  </Badge>
                </div>

                <p className="text-gray-700 leading-relaxed">{entry.content}</p>

                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
