// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import EarnTab from "./components/EarnTab";
import SpendTab from "./components/SpendTab";
import DashboardTab from "./components/DashboardTab";
import ActivityModal from "./components/ActivityModal";
import AppModal from "./components/AppModal";
import AppTimerModal from "./components/AppTimerModal";
import { useBrainBankState } from "./hooks/useBrainBankState";
import "./App.css";

export default function App() {
  const { state, setState } = useBrainBankState();
  const [activeTab, setActiveTab] = useState("earn");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showAppTimer, setShowAppTimer] = useState(false);
  const [appTimerData, setAppTimerData] = useState(null);

  const handleActivityComplete = (tokensEarned, time, activity) => {
    setState((prev) => ({
      ...prev,
      tokens: prev.tokens + tokensEarned,
      activityHistory: [
        ...prev.activityHistory,
        {
          activity: activity.name,
          time,
          tokens: tokensEarned,
          timestamp: new Date(),
        },
      ],
    }));
    setSelectedActivity(null);
  };

  const handleAppSubmit = (tokens) => {
    setAppTimerData({ tokens });
    setShowAppModal(false);
    setShowAppTimer(true);
  };

  const handleAppTimeUp = (tokensUsed, stoppedEarly = false) => {
    setState((prev) => ({
      ...prev,
      tokens: prev.tokens - tokensUsed,
      appHistory: [
        ...prev.appHistory,
        {
          app: selectedApp.name,
          time: (appTimerData.tokens / selectedApp.costPerMin) * 60,
          tokens: tokensUsed,
          timestamp: new Date(),
        },
      ],
    }));
    setShowAppTimer(false);
    setSelectedApp(null);
    setAppTimerData(null);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Top-right tokens badge */}
        <div className="flex justify-end mb-3">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-purple-200 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xl">🪙</span>
            <span className="text-sm font-semibold text-purple-600">
              Total Tokens:
            </span>
            <span className="text-lg font-bold text-purple-700">
              {state.tokens}
            </span>
          </div>
        </div>

        {/* Header */}
        <Header />

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-purple-100">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: "earn", label: "Earn Tokens" },
              { id: "spend", label: "Spend Tokens" },
              { id: "dashboard", label: "My Dashboard" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "earn" && (
          <EarnTab
            activities={state.activities}
            onActivitySelect={setSelectedActivity}
          />
        )}
        {activeTab === "spend" && (
          <SpendTab
            apps={state.apps}
            tokensAvailable={state.tokens}
            onAppSelect={(app) => {
              setSelectedApp(app);
              setShowAppModal(true);
            }}
          />
        )}
        {activeTab === "dashboard" && (
          <DashboardTab
            tokens={state.tokens}
            activityHistory={state.activityHistory}
            appHistory={state.appHistory}
            earnedBadges={state.earnedBadges}
          />
        )}
      </div>

      {/* Modals */}
      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onComplete={handleActivityComplete}
        />
      )}

      {showAppModal && selectedApp && (
        <AppModal
          app={selectedApp}
          tokensAvailable={state.tokens}
          onClose={() => setShowAppModal(false)}
          onSubmit={handleAppSubmit}
        />
      )}

      {showAppTimer && selectedApp && appTimerData && (
        <AppTimerModal
          app={selectedApp}
          tokensToSpend={appTimerData.tokens}
          onClose={() => setShowAppTimer(false)}
          onTimeUp={handleAppTimeUp}
        />
      )}
    </div>
  );
}
