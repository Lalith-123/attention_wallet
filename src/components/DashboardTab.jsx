// src/components/DashboardTab.jsx
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardTab({
  tokens,
  activityHistory,
  appHistory,
  earnedBadges,
}) {
  const totalEarned = activityHistory.reduce(
    (sum, item) => sum + item.tokens,
    0
  );
  const totalSpent = appHistory.reduce((sum, item) => sum + item.tokens, 0);
  const level = Math.floor(tokens / 30) + 1;

  // Smart message
  let message = "📈 Keep building healthy habits!";
  if (totalEarned > totalSpent * 2) {
    message = "🥳 Wow! You saved more attention today – Amazing!";
  } else if (totalSpent > totalEarned) {
    message = "😬 Uh oh… Apps are eating your Brain Coins. Switch gears!";
  }

  // Helpers (defined before use)
  const getEmojiForActivity = (activityName) => {
    const emojiMap = {
      Reading: "📚",
      "Walking/Exercise": "🚴",
      Homework: "📝",
      "Family Time": "👨‍👩‍👧‍👦",
      "Outdoor Play": "⚽",
      "Art & Crafts": "🎨",
      "Kitchen Experiments": "🧪",
      "Gardening/Nature": "🌱",
      "Board Games/Puzzles": "🧩",
      Puzzles: "🎯",
    };
    return emojiMap[activityName] || "🎯";
  };

  const getEmojiForApp = (appName) => {
    const emojiMap = {
      YouTube: "📺",
      Instagram: "📷",
      Games: "🎮",
      Snapchat: "👻",
      "Learning Apps": "💡",
    };
    return emojiMap[appName] || "📱";
  };

  // App stats
  const appStats = {};
  appHistory.forEach((item) => {
    appStats[item.app] = (appStats[item.app] || 0) + item.tokens;
  });

  let topApp = null;
  if (Object.keys(appStats).length > 0) {
    topApp = Object.keys(appStats).reduce((a, b) =>
      appStats[a] > appStats[b] ? a : b
    );
  }

  // Prepare activity chart data (minutes, min 1 for visible slice)
  const activityChartData = activityHistory.reduce((acc, item) => {
    const minutes = Math.max(1, Math.floor(item.time / 60)); // ensure >=1
    const existing = acc.find((a) => a.name === item.activity);
    if (existing) {
      existing.value += minutes;
    } else {
      acc.push({
        name: item.activity,
        value: minutes,
        emoji: getEmojiForActivity(item.activity),
      });
    }
    return acc;
  }, []);

  // Prepare app chart data
  const appChartData = Object.keys(appStats).map((appName) => ({
    name: appName,
    value: appStats[appName],
    emoji: getEmojiForApp(appName),
  }));

  const totalActivityMinutes = activityChartData.reduce(
    (sum, a) => sum + a.value,
    0
  );
  const totalAppTokens = appChartData.reduce((sum, a) => sum + a.value, 0);

  const pieChartColors = [
    "#C4B5FD",
    "#A78BFA",
    "#8B5CF6",
    "#7C3AED",
    "#6D28D9",
  ];

  const CustomTooltip = ({ active, payload, isActivityChart }) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    const total = isActivityChart ? totalActivityMinutes : totalAppTokens;
    const unit = isActivityChart ? "min" : "tokens";
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-purple-200 min-w-[150px]">
        <p className="font-bold text-purple-700 mb-1">
          {data.emoji} {data.name}
        </p>
        <p className="text-purple-600 mb-1">
          {data.value} {unit}
        </p>
        <p className="text-sm text-purple-500">{percentage}%</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        📊 Your Brain Report Today
      </h2>

      <div className="bg-purple-100 border-l-4 border-purple-600 p-4 rounded-lg mb-6">
        <p className="text-purple-800 font-bold">{message}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-600 text-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium mb-2">🪙 Coins Balance</p>
          <p className="text-3xl font-bold">{tokens}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium mb-2">📈 Coins Earned</p>
          <p className="text-3xl font-bold">{totalEarned}</p>
        </div>
        <div className="bg-purple-700 text-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium mb-2">📉 Coins Spent</p>
          <p className="text-3xl font-bold">{totalSpent}</p>
        </div>
        <div className="bg-purple-800 text-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium mb-2">⭐ Brain Level</p>
          <p className="text-3xl font-bold">{level}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Activities Pie Chart */}
        <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-purple-700 mb-4 text-lg">
            📚 Activities Breakdown
          </h3>
          {activityChartData.length > 0 ? (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                  >
                    {activityChartData.map((entry, index) => (
                      <Cell
                        key={`cell-act-${index}`}
                        fill={pieChartColors[index % pieChartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip isActivityChart={true} />} />
                  <Legend
                    formatter={(value) =>
                      `${getEmojiForActivity(value)} ${value}`
                    }
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 text-purple-400">📚</div>
              <p className="text-purple-600 font-medium">
                No activities yet. Start earning! 🌟
              </p>
            </div>
          )}
        </div>

        {/* Apps Pie Chart */}
        <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-purple-700 mb-4 text-lg">
            📱 App Usage Breakdown
          </h3>
          {appChartData.length > 0 ? (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                  >
                    {appChartData.map((entry, index) => (
                      <Cell
                        key={`cell-app-${index}`}
                        fill={pieChartColors[index % pieChartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<CustomTooltip isActivityChart={false} />}
                  />
                  <Legend
                    formatter={(value) => `${getEmojiForApp(value)} ${value}`}
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 text-purple-400">📱</div>
              <p className="text-purple-600 font-medium">
                No apps used yet. Great job! 🎉
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Attention Thief */}
      <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
        <h3 className="font-bold text-purple-700 mb-4">
          🎯 Attention Thief Meter
        </h3>
        {topApp && totalSpent > 0 ? (
          <div>
            <div className="bg-purple-300 rounded-full h-6 overflow-hidden mb-3">
              <div
                className={`h-full transition-all ${
                  (appStats[topApp] / totalSpent) * 100 > 50
                    ? "bg-purple-700"
                    : "bg-purple-600"
                }`}
                style={{
                  width: `${(appStats[topApp] / totalSpent) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-center font-bold text-purple-700">
              😱 {topApp} steals{" "}
              {Math.round((appStats[topApp] / totalSpent) * 100)}% of your
              attention!
            </p>
          </div>
        ) : (
          <p className="text-center text-purple-600 font-medium">
            No apps used yet. You're crushing it! 🌟
          </p>
        )}
      </div>

      {/* Badges */}
      {earnedBadges.length > 0 && (
        <div className="bg-purple-100 rounded-2xl p-6 border-2 border-purple-300">
          <h3 className="font-bold text-purple-700 mb-4">🏆 Your Badges</h3>
          <div className="space-y-2">
            {earnedBadges.map((badge) => (
              <div
                key={badge}
                className="bg-white p-3 rounded-xl text-center font-bold text-purple-700 border-2 border-purple-200"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
