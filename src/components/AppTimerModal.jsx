// src/components/AppTimerModal.jsx
import { useState, useEffect, useRef } from "react";

export default function AppTimerModal({
  app,
  tokensToSpend,
  onClose,
  onTimeUp,
}) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState({ type: "timeup", tokensUsed: 0 });
  const totalTime = Math.floor((tokensToSpend / app.costPerMin) * 60); // seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          const next = prev + 1;
          if (next >= totalTime) {
            clearInterval(timerRef.current);
            handleTimeUp(next);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, totalTime]);

  const timeLeft = Math.max(totalTime - time, 0);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const progressPercent = (time / totalTime) * 100;

  // Called when user clicks "Stop Early"
  const handleStop = () => {
    clearInterval(timerRef.current);
    const tokensUsed = Math.ceil((time * app.costPerMin) / 60); // based on actual usage
    setSummary({ type: "early", tokensUsed });
    setShowSummary(true);
  };

  // Called automatically when timer hits totalTime
  const handleTimeUp = (finalTime) => {
    const effectiveTime = finalTime ?? time;
    const tokensUsed = Math.ceil((effectiveTime * app.costPerMin) / 60);
    setSummary({ type: "timeup", tokensUsed });
    setShowSummary(true);
  };

  const handleSummaryClose = () => {
    // Inform parent how many tokens to deduct
    onTimeUp(summary.tokensUsed, summary.type === "early");
    setShowSummary(false);
    onClose();
  };

  return (
    <>
      {/* MAIN TIMER MODAL */}
      {!showSummary && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-11/12 animate-slide-up border-2 border-purple-200">
            <h3 className="text-2xl font-bold mb-6 text-purple-700">
              {app.name}
            </h3>

            <div className="text-center mb-6">
              <p className="text-sm text-purple-600 mb-3 font-medium">
                ⏳ Time Remaining:
              </p>
              <div className="text-5xl font-bold text-purple-600 font-mono mb-3">
                {minutes}:{seconds}
              </div>
              <p className="text-sm text-purple-600 font-medium">
                Brain Coins reserved:{" "}
                <span className="font-bold text-purple-700">
                  {tokensToSpend}
                </span>
              </p>
              <p className="text-xs text-purple-600 font-bold mt-3">
                ⚠️ Time is ticking! Use it wisely.
              </p>
            </div>

            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden mb-6">
              <div
                className="bg-purple-600 h-full transition-all duration-300"
                style={{ width: `${100 - progressPercent}%` }}
              ></div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex-1 bg-purple-500 text-white font-bold py-3 rounded-xl hover:bg-purple-600 transition"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleStop}
                className="flex-1 bg-purple-700 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition"
              >
                Stop Early
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY / NOTIFICATION MODAL */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-11/12 animate-slide-up border-2 border-purple-200 text-center">
            <div className="text-5xl mb-4">
              {summary.type === "timeup" ? "⏰" : "🛑"}
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              {summary.type === "timeup" ? "Time's Up!" : "Stopped Early"}
            </h3>
            <p className="text-purple-600 mb-2">
              Tokens used:{" "}
              <span className="font-bold text-purple-700">
                {summary.tokensUsed}
              </span>
            </p>
            {summary.type === "timeup" ? (
              <p className="text-sm text-purple-500 mb-4">
                Your {app.name} time has finished. Great job sticking to your
                plan! 🎯
              </p>
            ) : (
              <p className="text-sm text-purple-500 mb-4">
                You chose to stop before time. Only the used tokens will be
                deducted. 👍
              </p>
            )}
            <button
              onClick={handleSummaryClose}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
