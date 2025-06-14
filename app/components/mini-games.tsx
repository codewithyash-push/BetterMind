"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Brain, Heart, Zap, Target, Timer, Trophy } from "lucide-react"

export default function MiniGames() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)

  const games = [
    {
      id: "breathing",
      name: "Breathing Bubbles",
      description: "Follow the expanding bubble to practice deep breathing",
      icon: Heart,
      category: "Mindfulness",
      difficulty: "Easy",
      points: 10,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "memory",
      name: "Memory Palace",
      description: "Remember sequences to improve working memory",
      icon: Brain,
      category: "Cognitive",
      difficulty: "Medium",
      points: 20,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "focus",
      name: "Focus Flow",
      description: "Maintain attention on moving targets",
      icon: Target,
      category: "Attention",
      difficulty: "Hard",
      points: 30,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "mood",
      name: "Emotion Explorer",
      description: "Identify and categorize different emotions",
      icon: Zap,
      category: "Emotional",
      difficulty: "Easy",
      points: 15,
      color: "bg-yellow-100 text-yellow-700",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Games Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Therapeutic Mini-Games
          </CardTitle>
          <CardDescription>Fun, engaging activities designed to support your mental health journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((game) => {
              const IconComponent = game.icon
              return (
                <Card
                  key={game.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedGame === game.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${game.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{game.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            +{game.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {game.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              game.difficulty === "Easy"
                                ? "border-green-200 text-green-700"
                                : game.difficulty === "Medium"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            }`}
                          >
                            {game.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Game */}
      {selectedGame && (
        <GameComponent game={games.find((g) => g.id === selectedGame)!} onClose={() => setSelectedGame(null)} />
      )}

      {/* Game Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Gaming Stats
          </CardTitle>
          <CardDescription>Track your progress and achievements in therapeutic gaming</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">47</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">890</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GameComponent({ game, onClose }: { game: any; onClose: () => void }) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished")
    }
    return () => clearInterval(interval)
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(60)
  }

  const resetGame = () => {
    setGameState("ready")
    setScore(0)
    setTimeLeft(60)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <game.icon className="h-5 w-5" />
            {game.name}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {gameState === "ready" && (
          <div className="text-center space-y-4">
            <div className="p-8 bg-gray-50 rounded-lg">
              <game.icon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Ready to Play?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This game will help you practice {game.category.toLowerCase()} skills while having fun!
              </p>
              <Button onClick={startGame} className="w-full">
                Start Game
              </Button>
            </div>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span className="font-medium">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{score} points</span>
              </div>
            </div>

            <Progress value={((60 - timeLeft) / 60) * 100} className="h-2" />

            <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg text-center">
              <div className="space-y-4">
                {game.id === "breathing" && <BreathingGame score={score} setScore={setScore} />}
                {game.id === "memory" && <MemoryGame score={score} setScore={setScore} />}
                {game.id === "focus" && <FocusGame score={score} setScore={setScore} />}
                {game.id === "mood" && <MoodGame score={score} setScore={setScore} />}
              </div>
            </div>
          </div>
        )}

        {gameState === "finished" && (
          <div className="text-center space-y-4">
            <div className="p-8 bg-green-50 rounded-lg">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium mb-2">Great Job!</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">{score} Points Earned</p>
              <p className="text-sm text-muted-foreground mb-4">
                You've completed the {game.name} game and earned therapeutic benefits!
              </p>
              <div className="flex gap-2">
                <Button onClick={resetGame} variant="outline" className="flex-1">
                  Play Again
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Continue Journey
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function BreathingGame({ score, setScore }: { score: number; setScore: (score: number) => void }) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [bubbleSize, setBubbleSize] = useState(50)

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === "inhale") {
        setBubbleSize((prev) => (prev < 100 ? prev + 2 : prev))
        if (bubbleSize >= 100) {
          setPhase("hold")
          setTimeout(() => setPhase("exhale"), 2000)
        }
      } else if (phase === "exhale") {
        setBubbleSize((prev) => (prev > 50 ? prev - 2 : prev))
        if (bubbleSize <= 50) {
          setPhase("inhale")
          setScore(score + 5)
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [phase, bubbleSize, score, setScore])

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">
        {phase === "inhale" && "Breathe In..."}
        {phase === "hold" && "Hold..."}
        {phase === "exhale" && "Breathe Out..."}
      </div>
      <div className="flex justify-center">
        <div
          className="rounded-full bg-blue-300 transition-all duration-100 flex items-center justify-center"
          style={{
            width: `${bubbleSize}px`,
            height: `${bubbleSize}px`,
            opacity: 0.7,
          }}
        >
          <Heart className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Follow the bubble's rhythm</p>
    </div>
  )
}

function MemoryGame({ score, setScore }: { score: number; setScore: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [showingSequence, setShowingSequence] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)

  useEffect(() => {
    // Start with a sequence of 3
    setSequence([1, 2, 3])
    showSequence([1, 2, 3])
  }, [])

  const showSequence = async (seq: number[]) => {
    setShowingSequence(true)
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setActiveButton(seq[i])
      await new Promise((resolve) => setTimeout(resolve, 500))
      setActiveButton(null)
    }
    setShowingSequence(false)
  }

  const handleButtonClick = (num: number) => {
    if (showingSequence) return

    const newUserSequence = [...userSequence, num]
    setUserSequence(newUserSequence)

    if (newUserSequence.length === sequence.length) {
      // Check if sequence matches
      const isCorrect = newUserSequence.every((val, idx) => val === sequence[idx])
      if (isCorrect) {
        setScore(score + 10)
        // Generate new longer sequence
        const newSeq = Array.from({ length: sequence.length + 1 }, () => Math.floor(Math.random() * 4) + 1)
        setSequence(newSeq)
        setUserSequence([])
        setTimeout(() => showSequence(newSeq), 1000)
      } else {
        // Reset on wrong sequence
        setUserSequence([])
        setTimeout(() => showSequence(sequence), 1000)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">{showingSequence ? "Watch the sequence..." : "Repeat the sequence"}</div>
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {[1, 2, 3, 4].map((num) => (
          <Button
            key={num}
            onClick={() => handleButtonClick(num)}
            disabled={showingSequence}
            className={`h-16 w-16 text-lg font-bold transition-all ${
              activeButton === num ? "bg-yellow-400 scale-110" : ""
            }`}
            variant={activeButton === num ? "default" : "outline"}
          >
            {num}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Sequence length: {sequence.length} | Your progress: {userSequence.length}/{sequence.length}
      </p>
    </div>
  )
}

function FocusGame({ score, setScore }: { score: number; setScore: (score: number) => void }) {
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleTargetClick = () => {
    setClicks((prev) => prev + 1)
    setScore(score + 15)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">Click the moving target!</div>
      <div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
        <button
          onClick={handleTargetClick}
          className="absolute w-8 h-8 bg-red-500 rounded-full transition-all duration-1000 hover:bg-red-600 hover:scale-110"
          style={{
            left: `${targetPosition.x}%`,
            top: `${targetPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Target className="h-4 w-4 text-white mx-auto" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">Targets hit: {clicks}</p>
    </div>
  )
}

function MoodGame({ score, setScore }: { score: number; setScore: (score: number) => void }) {
  const [currentEmotion, setCurrentEmotion] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState("")

  const emotions = [
    { emoji: "😊", name: "Happy", category: "Positive" },
    { emoji: "😢", name: "Sad", category: "Negative" },
    { emoji: "😠", name: "Angry", category: "Negative" },
    { emoji: "😰", name: "Anxious", category: "Negative" },
    { emoji: "😌", name: "Calm", category: "Positive" },
    { emoji: "🤔", name: "Thoughtful", category: "Neutral" },
  ]

  useEffect(() => {
    generateNewQuestion()
  }, [])

  const generateNewQuestion = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    setCurrentEmotion(randomEmotion.emoji)

    // Create options with correct answer and 2 wrong ones
    const wrongOptions = emotions
      .filter((e) => e.name !== randomEmotion.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)

    const allOptions = [randomEmotion, ...wrongOptions].sort(() => Math.random() - 0.5)

    setOptions(allOptions.map((e) => e.name))
    setFeedback("")
  }

  const handleAnswer = (selectedName: string) => {
    const correctEmotion = emotions.find((e) => e.emoji === currentEmotion)
    if (selectedName === correctEmotion?.name) {
      setScore(score + 10)
      setFeedback("Correct! Great emotional awareness!")
    } else {
      setFeedback(`Not quite. This emotion is: ${correctEmotion?.name}`)
    }

    setTimeout(() => {
      generateNewQuestion()
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">What emotion is this?</div>
      <div className="text-6xl mb-4">{currentEmotion}</div>
      <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswer(option)}
            variant="outline"
            disabled={!!feedback}
            className="w-full"
          >
            {option}
          </Button>
        ))}
      </div>
      {feedback && (
        <div className={`text-sm font-medium ${feedback.includes("Correct") ? "text-green-600" : "text-blue-600"}`}>
          {feedback}
        </div>
      )}
    </div>
  )
}
