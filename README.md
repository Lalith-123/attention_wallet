## Live Demo

attention_wallet is deployed on GitHub Pages.

Live demo: https://lalith-123.github.io/attention_wallet/ [web:98]


This is a README you can drop into the root of your BrainBank project and adjust as needed.

***

# BrainBank – Attention Wallet for Kids

BrainBank is a React + Tailwind app that turns screen time into a token economy. Kids earn tokens by doing healthy activities and spend them on apps, making attention and time more visible and intentional.

***

## Features

- Token system  
  - Earn tokens by completing offline activities  
  - Spend tokens to unlock limited screen time on apps  
  - Live token balance visible at the top of the app  

- Three main tabs  
  - Earn Tokens: Start timers for activities like reading or exercise  
  - Spend Tokens: Choose apps and decide how many tokens to spend  
  - My Dashboard: View stats, charts, and attention thief meter  

- Timers and modals  
  - Activity timer for earning tokens  
  - App usage timer for spending tokens  
  - Summary after time is up or when the user stops early, showing how many tokens were used  

- Dashboard analytics  
  - Total earned, spent, and current tokens  
  - Brain level based on token balance  
  - Attention thief meter showing which app consumes most tokens  
  - Pie charts for activities breakdown and app usage breakdown  

- Tech stack  
  - React (Vite)  
  - Tailwind CSS  
  - Recharts for charts  

- Design  
  - Purple and white theme  
  - No gradient utilities  
  - Responsive layout for mobile and desktop  

***

### Install dependencies

```bash
# Tailwind and tooling
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind config files
npx tailwindcss init -p

# Charts
npm install recharts
```

***

## Project Structure

```text
brainbank/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── EarnTab.jsx
│   │   ├── SpendTab.jsx
│   │   ├── DashboardTab.jsx
│   │   ├── ActivityModal.jsx
│   │   ├── AppModal.jsx
│   │   └── AppTimerModal.jsx
│   ├── hooks/
│   │   └── useBrainBankState.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js
```

- `App.jsx`: Main shell, tab switching, modals and token badge  
- `Header.jsx`: App title and tagline  
- `EarnTab.jsx`: Activity buttons to start earning timers  
- `SpendTab.jsx`: Apps list to start spending timers  
- `DashboardTab.jsx`: Stats, pie charts, attention thief meter, badges  
- `ActivityModal.jsx`: Timer for earning activities  
- `AppModal.jsx`: Token input before starting app timer  
- `AppTimerModal.jsx`: Countdown for app usage and summary dialog  
- `useBrainBankState.js`: Centralised state and initial data  

***
Color theme:

- Background: `bg-purple-50`  
- Cards: `bg-white` with `border-purple-100` or `border-purple-200`  
- Primary actions: `bg-purple-600 text-white`  
- Secondary actions: `bg-purple-500`, `bg-purple-400`, or `bg-purple-100`  
- Text: `text-purple-700` and `text-purple-600`  

Gradients are not used; only solid Tailwind colors.

***

## Core Logic

### Token Flow

- Earning  
  - `ActivityModal` runs a timer  
  - When the user stops and confirms, the parent `App` receives `(tokensEarned, time, activity)`  
  - `handleActivityComplete` updates `tokens` and `activityHistory`

- Spending  
  - User chooses an app and enters the number of tokens in `AppModal`  
  - `AppTimerModal` runs a countdown based on `tokensToSpend` and `app.costPerMin`  
  - When time is up or user stops early, `onTimeUp(tokensUsed, stoppedEarly)` is called  
  - `handleAppTimeUp` in `App` subtracts `tokensUsed` and records an entry in `appHistory`

### Dashboard

`DashboardTab` computes:

- `totalEarned`, `totalSpent`, `tokens`, `level`  
- `appStats` aggregated by app  
- Top attention thief (`topApp`) based on tokens spent  
- Pie chart data:
  - Activities breakdown: total minutes per activity  
  - App usage breakdown: total tokens per app  

Recharts is used for the pie charts with a purple color palette.

---

## Running in Development

```bash
npm run dev
```

Open the printed localhost URL in your browser.

***

## Building for Production

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc).

---

## Customisation

- Add or change activities in `useBrainBankState.js`  
- Add or change apps with different `costPerMin` values  
- Adjust thresholds for brain level or messages in `DashboardTab.jsx`  
- Tweak colors by replacing Tailwind purple shades with your preferred palette  

---

## Known Considerations

- Time and tokens are stored in memory. Refreshing the page resets state; for persistence you can later add localStorage or a backend.  
- Token calculations assume consistent `costPerMin` and simple integer rounding; adjust the math if you want more exact behaviour.  

***

## Scripts Summary

- `npm run dev` – start development server  
- `npm run build` – production build  
- `npm run preview` – preview the production build locally
