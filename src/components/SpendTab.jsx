// src/components/SpendTab.jsx
export default function SpendTab({ apps, tokensAvailable, onAppSelect }) {
  return (
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-purple-700 mb-3">
        🎮 Spend Your Brain Coins Carefully!
      </h2>
      <p className="text-purple-600 mb-4 font-medium">
        Apps cost Brain Coins! Choose wisely – which ones are worth your
        attention? 🤔
      </p>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg mb-6">
        <p className="text-purple-700 font-bold">
          💡 Tip: Learning apps cost only 1 coin/min – great value!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppSelect(app)}
            className="border-4 border-purple-600 bg-white text-purple-600 font-bold p-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition flex flex-col items-center gap-2"
          >
            <span className="text-3xl">{app.emoji}</span>
            <span className="text-xs text-center">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
