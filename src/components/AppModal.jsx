// src/components/AppModal.jsx
import { useState } from "react";

export default function AppModal({ app, tokensAvailable, onClose, onSubmit }) {
  const [tokenInput, setTokenInput] = useState(5);
  const timeInMinutes = Math.floor(tokenInput / app.costPerMin);
  const hasEnough = tokenInput <= tokensAvailable;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-11/12 animate-slide-up border-2 border-purple-200">
        <h3 className="text-2xl font-bold mb-6 text-purple-700">{app.name}</h3>

        <div className="mb-6">
          <label className="block font-bold text-purple-700 mb-3">
            How many Brain Coins do you want to spend?
          </label>
          <input
            type="number"
            value={tokenInput}
            onChange={(e) =>
              setTokenInput(Math.max(1, parseInt(e.target.value) || 1))
            }
            max={tokensAvailable}
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 text-purple-700"
          />
          <div className="text-purple-600 font-bold mt-3">
            ⏱ You can use this app for ~{timeInMinutes} minutes
          </div>
        </div>

        {!hasEnough && (
          <div className="bg-purple-100 border-l-4 border-purple-600 p-3 mb-6 text-purple-700 font-bold">
            ❌ You don't have enough tokens!
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => onSubmit(tokenInput)}
            disabled={!hasEnough}
            className={`flex-1 font-bold py-3 rounded-xl transition ${
              hasEnough
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-purple-200 text-purple-400 cursor-not-allowed"
            }`}
          >
            Start Using App
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-purple-100 text-purple-700 font-bold py-3 rounded-xl hover:bg-purple-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
