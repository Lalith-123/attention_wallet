// src/components/EarnTab.jsx
export default function EarnTab({ activities, onActivitySelect }) {
  const activityColors = {
    reading: "bg-purple-500",
    exercise: "bg-purple-600",
    homework: "bg-purple-500",
    family: "bg-purple-600",
    outdoor: "bg-purple-500",
    crafts: "bg-purple-600",
    kitchen: "bg-purple-500",
    gardening: "bg-purple-600",
    games: "bg-purple-500",
    puzzles: "bg-purple-600",
  };

  return (
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-purple-700">
          🌱 Grow Your Brain Coins!
        </h2>
        <div className="text-4xl animate-bounce">🦊</div>
      </div>
      <p className="text-purple-600 mb-6 font-medium">
        Do healthy activities to earn shiny Brain Coins. Every 2 minutes = 1
        coin! 🪙
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {activities.map((activity, idx) => (
          <button
            key={activity.id}
            onClick={() => onActivitySelect(activity)}
            className={`${
              activityColors[activity.id]
            } text-white font-bold p-4 rounded-2xl hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col items-center gap-2`}
          >
            <span className="text-3xl">{activity.emoji}</span>
            <span className="text-xs text-center">{activity.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
