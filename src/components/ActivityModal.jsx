// src/components/ActivityModal.jsx
import { useState, useEffect, useRef } from "react";

export default function ActivityModal({ activity, onClose, onComplete }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused]);

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setShowCelebration(true);
  };

  const handleContinue = () => {
    const tokensEarned = Math.floor(time * activity.tokensPerMin);
    onComplete(tokensEarned, time, activity);
    onClose();
  };

  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toString().padStart(2, "0");
  const tokensEarned = Math.floor(minutes * activity.tokensPerMin);
  const totalTime = Math.floor(time / 60);

  if (showCelebration) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-11/12 animate-slide-up border-2 border-purple-200">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-700">
              Great Job!
            </h3>
            <p className="text-lg text-purple-600 mb-4">
              You earned{" "}
              <span className="font-bold text-2xl text-purple-600">
                {tokensEarned}
              </span>{" "}
              Brain Coins! 🪙
            </p>
            <p className="text-sm text-purple-500 mb-6">
              Time: {totalTime} min
            </p>
            <button
              onClick={handleContinue}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-11/12 animate-slide-up border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-5xl">{activity.emoji}</span>
          <h3 className="text-2xl font-bold text-purple-700">
            {activity.name}
          </h3>
        </div>

        <div className="text-5xl font-bold text-purple-600 text-center my-6 font-mono">
          {minutes}:{seconds}
        </div>

        <div className="text-xl text-purple-600 text-center font-bold mb-6">
          🪙 Earning: {tokensEarned} coins
        </div>

        <div className="flex gap-3 flex-wrap justify-center mb-4">
          {!isRunning && !isPaused ? (
            <button
              onClick={() => setIsRunning(true)}
              className="flex-1 min-w-24 bg-purple-500 text-white font-bold py-3 rounded-xl hover:bg-purple-600 transition"
            >
              ▶ Start
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex-1 min-w-24 bg-purple-400 text-white font-bold py-3 rounded-xl hover:bg-purple-500 transition"
              >
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>
              <button
                onClick={handleStop}
                className="flex-1 min-w-24 bg-purple-700 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition"
              >
                ⏹ Stop
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-100 text-purple-700 font-bold py-3 rounded-xl hover:bg-purple-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
