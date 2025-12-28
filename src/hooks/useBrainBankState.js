// src/hooks/useBrainBankState.js
import { useState } from "react";

export function useBrainBankState() {
  const [state, setState] = useState({
    tokens: 0,
    activities: [
      { id: "reading", name: "Reading", emoji: "📚", tokensPerMin: 0.5 },
      {
        id: "exercise",
        name: "Walking/Exercise",
        emoji: "🚴",
        tokensPerMin: 0.5,
      },
      { id: "homework", name: "Homework", emoji: "📝", tokensPerMin: 0.5 },
      { id: "family", name: "Family Time", emoji: "👨‍👩‍👧‍👦", tokensPerMin: 0.5 },
      { id: "outdoor", name: "Outdoor Play", emoji: "⚽", tokensPerMin: 0.5 },
      { id: "crafts", name: "Art & Crafts", emoji: "🎨", tokensPerMin: 0.5 },
      {
        id: "kitchen",
        name: "Kitchen Experiments",
        emoji: "🧪",
        tokensPerMin: 0.5,
      },
      {
        id: "gardening",
        name: "Gardening/Nature",
        emoji: "🌱",
        tokensPerMin: 0.5,
      },
      {
        id: "games",
        name: "Board Games/Puzzles",
        emoji: "🧩",
        tokensPerMin: 0.5,
      },
      { id: "puzzles", name: "Puzzles", emoji: "🎯", tokensPerMin: 0.5 },
    ],
    apps: [
      { id: "youtube", name: "YouTube", emoji: "📺", costPerMin: 5 },
      { id: "instagram", name: "Instagram", emoji: "📷", costPerMin: 4 },
      { id: "games", name: "Games", emoji: "🎮", costPerMin: 3 },
      { id: "snapchat", name: "Snapchat", emoji: "👻", costPerMin: 4 },
      { id: "learning", name: "Learning Apps", emoji: "💡", costPerMin: 1 },
    ],
    activityHistory: [],
    appHistory: [],
    earnedBadges: [],
  });

  return { state, setState };
}
