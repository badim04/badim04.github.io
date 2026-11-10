/* Portfolio content. Projects are written for non-technical readers first:
   what problem it solves, how it works step by step, and the clever parts. */

window.PROJECTS = [
  {
    id: "versusx",
    name: "VersusX",
    kind: "Real-time multiplayer games platform",
    tags: ["fullstack", "backend", "frontend"],
    tagline: "13 head-to-head games, live, in the browser, with fair ratings and a referee that can't be fooled.",
    problem: "Playing games like chess, Ludo or Whot against a real person online needs much more than a pretty board. Both players must see the same game at the same moment, nobody should be able to cheat, and the rankings must actually mean something.",
    flow: [
      ["Sign in", "Players sign in with Google. No passwords to remember."],
      ["Find an opponent", "Matchmaking pairs players of similar skill who picked the same game and stake."],
      ["Play live", "Every move travels over a live WebSocket connection. The server is the referee and checks every move against the real rules."],
      ["Shared physics", "For 8-ball, tanks and racing, the browser and server run the exact same physics code, so what you see is what the server decides."],
      ["Anti-cheat review", "After the game, a background worker compares moves with a chess engine, checks timing and tab-switching, and flags suspicious games."],
      ["Ratings update", "Glicko-2 (the system used by top chess sites) updates each player's rating per game."]
    ],
    genius: [
      "Full FIDE chess rules with a move generator verified by 'perft' testing, the same counting test chess-engine authors use to prove every legal move is generated.",
      "Deterministic physics: the 8-ball table and tank shells behave identically on the phone and the server, which makes cheating by editing the browser useless.",
      "If the server restarts mid-game, every stake is refunded automatically. A ledger audit script checks that the books always balance.",
      "No front-end build step: the whole app is plain JavaScript that installs like a phone app (PWA). The 3D racing engine (Three.js) loads only when a race starts."
    ],
    stack: ["Node.js", "WebSockets", "SQLite", "Glicko-2", "Three.js", "PWA", "Worker threads", "Google Identity", "Vercel + VPS"],
    stats: [["13", "live games"], ["~19.6k", "lines of code"], ["Glicko-2", "skill ratings"]],
    links: [["Play the test site", "https://versusx-theta.vercel.app"]]
  },
  {
    id: "finlo",
    name: "Finlo",
    kind: "Personal finance app · Android, iOS & web",
    tags: ["fullstack", "frontend", "mobile", "data", "ai"],
    tagline: "A budgeting app that reads your receipts and bank emails, and tells you honestly when you'll run out of money.",
    problem: "Most budget apps make you type in every expense, then show a bar that says '60% spent', which tells you nothing on its own. Is 60% fine on the 25th of the month? Is it a disaster on the 5th?",
    flow: [
      ["Capture", "Snap a receipt, connect Gmail read-only, or import a bank statement (PDF, Excel, CSV)."],
      ["Read", "OCR pulls text from the photo; email parsers read bank alerts, but only from verified sender domains."],
      ["Categorise", "Four layers decide the category: your rules, then your history, then a merchant dictionary, then an AI model (Gemini) as a last resort."],
      ["Check", "Only confident results are saved automatically. Anything unsure goes to a review queue with the guess filled in."],
      ["Budget by the calendar", "Budgets are judged against how much of the month has passed, with a daily safe-to-spend amount."],
      ["Forecast", "Three forecasting models compete on past data, and the winner ships with its error rate visible."]
    ],
    genius: [
      "Money is stored as whole kobo/cents and never as decimals, so splitting ₦10,000 three ways gives 3334/3333/3333 and no kobo silently disappears.",
      "Forecasts admit uncertainty: the prediction band widens further into the future, and a shaky forecast is labelled shaky.",
      "Email is treated as untrusted input. A bank alert from 'gtbank.com.phish.example' cannot pose as GTBank, and there is a test for exactly that.",
      "Chart colours were checked mathematically for colour-blind users (ΔE scores) instead of eyeballed."
    ],
    stack: ["React Native", "Expo", "react-native-web", "TypeScript", "SQLite", "Gemini", "OCR", "Gmail API", "Vitest"],
    stats: [["347", "automated tests"], ["3", "platforms, 1 codebase"], ["14", "screens"]],
    links: [],
    repo: "https://github.com/badim04/AI_Budget_Spending_App/tree/v1.2",
    repoPublic: true
  },
  {
    id: "caresync",
    name: "Caresync EMR",
    kind: "Electronic medical records platform",
    tags: ["fullstack", "frontend", "backend", "mobile"],
    tagline: "Hospital records on web and mobile, where every role sees exactly what it should, and nothing more.",
    problem: "In a clinic, a nurse, a pharmacist, a lab scientist and a patient all need the same records, but each should only see and change their own part. Getting that wrong is a privacy disaster.",
    flow: [
      ["Sign in by role", "Super admin, admin officer, doctor, nurse, lab scientist, pharmacist or patient."],
      ["Database guards", "Row-Level Security rules inside the Postgres database decide what each role can read or write, even if the app has a bug."],
      ["Clinical work", "Patients, appointments, consultations (general, dental, psychiatric), lab reports, prescriptions and drug inventory."],
      ["Outreach missions", "Teams plan and run medical outreach missions and track the patients they see."],
      ["Web and mobile", "A Next.js web app for staff and an Expo mobile app for patients and clinical tablets share one design system."]
    ],
    genius: [
      "Security lives in the database itself, not just in the screens, so a forgotten check in the UI can't leak a patient record.",
      "One monorepo shares design tokens and TypeScript types between web and mobile, so both apps always agree on what a 'patient' is.",
      "A calm clinical design language (soft teal and sage) chosen for long shifts on bright screens."
    ],
    stack: ["Next.js 15", "Expo", "React Native", "Supabase", "PostgreSQL RLS", "TypeScript", "pnpm monorepo"],
    stats: [["7", "user roles"], ["~13.5k", "lines of code"], ["2", "apps, 1 codebase"]],
    links: []
  },
  {
    id: "shiftpilot",
    name: "ShiftPilot",
    kind: "Shift scheduling app with AI email reading",
    tags: ["fullstack", "backend", "mobile", "ai", "automation"],
    tagline: "Forward a shift email; the AI files it. Then the app tells you exactly when to leave, based on live traffic.",
    problem: "Agency workers juggle shifts from several agencies, booked by email, at different locations. Double-booking and arriving late both cost money.",
    flow: [
      ["Forward the email", "Each user gets a private forwarding address. They forward any agency confirmation to it."],
      ["AI extracts", "Claude reads the email and pulls out the date, times, venue and agency."],
      ["You confirm", "The shift lands as 'pending' so a person always approves it."],
      ["Clash check", "A database function warns if the new shift overlaps another one."],
      ["Live traffic", "Every 5 minutes a scheduled job asks Google Maps how long the journey takes right now."],
      ["Leave now!", "A push notification arrives at the exact moment you need to leave."]
    ],
    genius: [
      "The AI never writes directly to your calendar: it proposes, you approve.",
      "The 'leave-by' time is recalculated from live traffic, not a fixed estimate, so a jam on the way changes your alert.",
      "Running cost per parsed email is about $0.003, worked out before launch."
    ],
    stack: ["Expo Router", "TypeScript", "Supabase", "pg_cron", "Edge Functions", "Claude API", "Google Maps", "Expo Push"],
    stats: [["5 min", "traffic refresh"], ["~$0.003", "per parsed email"], ["3", "platforms"]],
    links: [],
    repo: "https://github.com/badim04/shiftpilot",
    repoPublic: true
  },
  {
    id: "codedial",
    name: "CodeDial",
    kind: "Offline-first Android app",
    tags: ["mobile", "frontend", "fullstack"],
    tagline: "Every USSD code for Nigerian networks and banks, searchable offline, one tap to dial.",
    problem: "Nobody remembers *310# or their bank's transfer code, and searching the web for them is slow, often wrong, and needs data you may not have.",
    flow: [
      ["Search", "Type 'data balance' or 'transfer' and the directory filters instantly, even without internet."],
      ["Tap to dial", "The app hands the code to the phone's dialer, with the # correctly encoded."],
      ["Quick prompt", "After a recharge or data purchase, it asks if you want to log the amount."],
      ["Track spending", "Monthly airtime and data totals by category, plus borrowed-credit and repayment tracking."]
    ],
    genius: [
      "It deliberately does not read your SMS or call logs, so no scary permissions, and privacy passed review by design.",
      "Codes are marked 'official' only when a provider-owned source confirms them. Unverified bank codes carry a visible warning.",
      "Data is stored with MMKV, a very fast native key-value store, so the app opens instantly."
    ],
    stack: ["React Native", "Expo SDK 57", "TypeScript", "NativeWind", "Zustand", "MMKV", "Jest", "EAS Build"],
    stats: [["4", "networks + banks"], ["0", "risky permissions"], ["100%", "works offline"]],
    links: [["Privacy & listing site", "https://codedial-legal.vercel.app"]]
  },
  {
    id: "football",
    name: "Football Shots Model",
    kind: "Machine learning prediction system",
    tags: ["data", "ds", "de", "ai"],
    tagline: "Predicts how many shots each player will take next match, and retrains itself every Monday.",
    problem: "Will a striker take 3+ shots this weekend? The answer depends on his recent form, his history against this opponent, and how leaky that opponent's defence is. That's too much to track by hand across 8 competitions.",
    flow: [
      ["Collect", "A polite scraper downloads every finished match once, ever (~9,000 matches since 2023-24), and caches the raw data."],
      ["Store", "Player minutes, shots, shots on target and xG go into a SQLite database."],
      ["Build features", "Rolling form, record against this opponent, and the opponent's defence rating. Only data from before the match is ever used."],
      ["Train", "XGBoost predicts expected shots; Poisson maths turns that into the chance of 1+, 2+ and 3+ shots."],
      ["Check", "A time-based holdout and drift check catch a model that has quietly got worse."],
      ["Publish", "GitHub Actions runs it all every Monday and the Streamlit app updates itself."]
    ],
    genius: [
      "Strictly no peeking at the future: every feature uses only matches before the one being predicted (no data leakage).",
      "The scraper is polite, not sneaky: no proxy rotation, randomised 2–4 s delays, and it stops cleanly if refused.",
      "Raw responses are kept, so a parser fix can be re-applied to history without downloading anything again."
    ],
    stack: ["Python", "XGBoost", "Poisson", "pandas", "SQLite", "Streamlit", "GitHub Actions"],
    stats: [["~9,000", "matches"], ["8", "competitions"], ["Weekly", "auto-retrain"]],
    links: [],
    repo: "https://github.com/badim04/football-shots-model",
    repoPublic: true
  },
  {
    id: "sports",
    name: "Sports Bet Claude",
    kind: "Self-calibrating sports analytics engine",
    tags: ["data", "ds", "de", "automation"],
    tagline: "Turns a punter's stat checklist into an engine that grades its own picks and gets more honest every week.",
    problem: "A careful sports analyst checks last-5 form, home/away splits, head-to-head records and xG before every pick. That's hours of tabs, and nobody keeps score of whether their 'sure' picks actually win.",
    flow: [
      ["Gather", "Fixtures, form, xG and head-to-head for 20+ competitions across football, basketball, tennis and hockey."],
      ["Score", "Each pick's confidence is a real hit-rate, shrunk when the sample is small."],
      ["Explain", "Every pick shows its evidence in plain words, e.g. 'unbeaten 4/5 at home'."],
      ["Price", "Live bookmaker odds are attached and tickets respect a minimum-odds floor."],
      ["Grade", "After the games, every pick and ticket is checked against the real result."],
      ["Re-calibrate", "Markets where the engine was over-confident get pulled down; proven ones get boosted."]
    ],
    genius: [
      "Confidence is earned, not typed in: 4/5 counts for less than 40/50.",
      "A built-in A/B test compares two ticket strategies on win rate, profit and ROI.",
      "Loss review shows exactly which leg sank each ticket, by market, side and league."
    ],
    stack: ["Python", "Flask", "Playwright", "Docker", "SQLite", "Statistics"],
    stats: [["20+", "competitions"], ["4", "sports"], ["Weekly", "self-calibration"]],
    links: []
  },
  {
    id: "prowl",
    name: "PROWL",
    kind: "Multi-agent AI crypto-research agent",
    tags: ["ai", "automation", "fullstack", "frontend"],
    tagline: "A pack of AI agents that spots trending tokens, checks them for scams, and explains the verdict.",
    problem: "New crypto tokens appear every minute, and many are traps: hidden fees, unlocked liquidity, copycat names. A human can't vet them fast enough.",
    flow: [
      ["Scout", "Watches X (Twitter) and Telegram for narratives that are starting to trend."],
      ["Guard", "Runs 17 safety checks on each token contract through the GoPlus security API."],
      ["Verdict", "Shows a clear risk scale and the reasons behind it."],
      ["Act", "An execution agent can act on approved tokens with take-profit and stop-loss rules."]
    ],
    genius: [
      "Each agent does one job well, and the hand-off between them is visible on the dashboard.",
      "A full launch content pack (videos, images, captions) was generated from the same codebase. See the video project below."
    ],
    stack: ["React 19", "Vite", "Tailwind", "Supabase", "Python", "GoPlus API", "lightweight-charts"],
    stats: [["4", "agents"], ["17", "safety checks"], ["Live", "dashboard"]],
    links: [["Visit prowl-agent.xyz", "https://prowl-agent.xyz"]]
  },
  {
    id: "salesbot",
    name: "AI Sales Assistant",
    kind: "AI chatbot + e-commerce automation",
    tags: ["ai", "automation", "va"],
    tagline: "A shop assistant on Telegram that knows the stock, the prices and the delivery fees, and speaks Pidgin.",
    problem: "Small online stores lose sales when customers message at midnight asking 'do you have this in black, how much to Ikeja?' and nobody answers until morning.",
    flow: [
      ["Customer asks", "A message arrives on Telegram, in English or Pidgin."],
      ["AI picks a tool", "Gemini decides which of 8 tools to use: search, stock check, recommendations, order total, bundle deals…"],
      ["Real data", "The tool runs a real SQL query on the store's product database, so prices are never made up."],
      ["Reply", "The assistant answers with exact prices, delivery and promo codes applied."]
    ],
    genius: [
      "Function calling means the AI can't invent a price. It must look it up.",
      "The same project feeds Google Shopping: a script builds Merchant Center spreadsheets per category, with an 'issues' sheet for anything the owner must fix.",
      "A photo-prep tool turns messy product photos into clean, square, compressed images for the website."
    ],
    stack: ["Python", "Gemini function calling", "Telegram Bot API", "SQLite", "Google Merchant Center", "Pillow"],
    stats: [["8", "AI tools"], ["2", "languages"], ["24/7", "replies"]],
    links: []
  },
  {
    id: "hoodwatch",
    name: "Hood Watch",
    kind: "Telegram trading bot",
    tags: ["backend", "automation"],
    tagline: "Paste a token, see if it's safe, buy in one tap, and let the bot sell at your targets.",
    problem: "Trading new tokens means watching charts all day to sell at the right time, and copying calls from Telegram groups by hand is too slow.",
    flow: [
      ["Paste a token", "The bot shows market cap, liquidity, holders, age and a safety label."],
      ["One-tap buy", "Every Uniswap pool for the token is simulated to find the best route."],
      ["Auto-sell", "Take-profit ladder and stop-loss are checked every 5 seconds."],
      ["Copy calls", "Listener accounts read Telegram groups and buy for each follower, using their own filters."],
      ["Share", "Closed trades produce a shareable PnL card image."]
    ],
    genius: [
      "Listener accounts join groups once and serve every user watching that group, with no admin rights needed.",
      "One purchase per token per user, even if the token is posted ten times."
    ],
    stack: ["Node.js", "grammY", "GramJS", "viem", "Uniswap v2/v3/v4", "resvg"],
    stats: [["5 s", "price checks"], ["6", "PnL card designs"]],
    links: []
  },
  {
    id: "deliver",
    name: "DELIVER",
    kind: "Smart-contract marketplace for AI agents",
    tags: ["fullstack", "backend", "ai"],
    tagline: "Don't trust AI, stake it: AI agents put money on the line and lose it if they don't deliver.",
    problem: "AI agents can hallucinate or go silent, and today they face no consequence. Businesses can't safely hand them real work.",
    flow: [
      ["Post a task", "The requester locks payment in escrow."],
      ["Agent stakes", "An AI agent accepts and locks its own collateral."],
      ["Deliver & verify", "The result is submitted and checked by a pluggable verifier."],
      ["Settle", "Success pays the agent; failure slashes its stake to the requester. Reputation is recorded permanently."]
    ],
    genius: [
      "The whole escrow is one tested state machine in Solidity, so no single party can change the outcome.",
      "Reputation (completed vs slashed) is portable and public."
    ],
    stack: ["Solidity", "Hardhat", "OpenZeppelin", "Next.js 15", "Prisma", "ethers v6", "Tailwind"],
    stats: [["4-step", "escrow loop"]],
    links: []
  },
  {
    id: "ensemble",
    name: "ML Ensemble Trading System",
    kind: "Machine learning + NLP",
    tags: ["data", "ds", "ai"],
    tagline: "Fifteen models vote on the market, with a news-reading AI adding the mood of the day.",
    problem: "Any single prediction model is fragile: it works until the market changes. Prices also react to news, which pure price models can't see.",
    flow: [
      ["Prices + news", "Market prices plus financial headlines."],
      ["Read the news", "FinBERT, a finance-trained language model, scores headline sentiment."],
      ["Many models", "LSTM, Transformer, XGBoost and Random Forest models each make a prediction."],
      ["Ensemble vote", "15 components are combined into one signal."],
      ["Monitor", "A live web dashboard shows signals and model health."]
    ],
    genius: [
      "Mixing very different model families means one model's blind spot is covered by another.",
      "News sentiment adds information that isn't in the price chart."
    ],
    stack: ["Python", "LSTM", "Transformer", "XGBoost", "Random Forest", "FinBERT", "Web dashboard"],
    stats: [["15", "model components"], ["4", "model families"]],
    links: []
  },
  {
    id: "forex",
    name: "Forex & Prop-Firm Bots",
    kind: "Algorithmic trading · MQL5 + Python",
    tags: ["data", "ds"],
    tagline: "Trading strategies turned into rules a computer can follow, then tested on years of history.",
    problem: "Prop-firm challenges have strict rules (lose 3% in a day and you're out), and humans break them under pressure.",
    flow: [
      ["Read structure", "Detects market structure, fair value gaps, order blocks and liquidity sweeps across timeframes."],
      ["Wait for setup", "Enters only when the full rule-set lines up."],
      ["Guard risk", "Daily and total loss limits are enforced by a kill-switch."],
      ["Backtest", "An event-driven Python backtester replays 2019–2025 with no look-ahead."]
    ],
    genius: [
      "Event-driven backtesting means the bot only ever sees candles that had already closed, so results aren't secretly using the future.",
      "Same strategy built twice: MQL5 for live MetaTrader trading, Python for research."
    ],
    stack: ["MQL5", "MQL4", "Python", "pandas", "Backtesting"],
    stats: [["2019–25", "backtest window"], ["3% / 6%", "loss limits enforced"]],
    links: []
  },
  {
    id: "j2d",
    name: "J2D Online Academy",
    kind: "Teaching web app",
    tags: ["fullstack", "frontend"],
    tagline: "An online school: students join classes and submit work, teachers grade, admins see everything.",
    problem: "A tutoring academy was running on WhatsApp and spreadsheets. Parents couldn't see progress and teachers lost track of assignments.",
    flow: [
      ["Visitors", "A clear home page with programmes, pricing, testimonials and a free assessment session."],
      ["Students", "Profile, subscription, class schedule, join class, submit assignments, report cards."],
      ["Teachers", "Upload assignments and report cards, manage schedules."],
      ["Admins", "Student and teacher databases, class lists and totals."]
    ],
    genius: [
      "Built against the client's written requirements, with an honest 'still to do' list (e.g. automatic class recording needs a provider with consent and safeguarding for children)."
    ],
    stack: ["Full-stack web", "Role-based dashboards", "Responsive UI"],
    stats: [["3", "dashboards"]],
    links: []
  },
  {
    id: "giovanni",
    name: "Giovanni Couture",
    kind: "Fashion brand website",
    tags: ["frontend", "video"],
    tagline: "A fashion house website where you can upload your photo and preview outfits on yourself.",
    problem: "A fashion brand wanted its site to feel like the collection, not a template, and to let shoppers picture themselves in the clothes.",
    flow: [
      ["Hero & gallery", "Animated sections with Framer Motion."],
      ["Upload a photo", "The shopper adds their own picture."],
      ["Try it on", "Pick a catalogue item to preview over the photo."]
    ],
    genius: ["Everything happens in the browser: the shopper's photo never leaves their device."],
    stack: ["React", "Vite", "Framer Motion", "Vercel"],
    stats: [["0", "photos uploaded to a server"]],
    links: []
  },
  {
    id: "oikos",
    name: "Oikos QA Suite",
    kind: "Automated testing for a property SaaS",
    tags: ["backend", "fullstack", "automation", "va"],
    tagline: "103 robot testers that click through a real-estate platform and report every failure with a screenshot.",
    problem: "A property-management platform (NestJS + React) had a 100+ step test plan that took days to run by hand.",
    flow: [
      ["Test plan", "103 scenarios across SIT and UAT stages: auth, navigation, dashboard and more."],
      ["Robot browser", "Playwright drives a real Chrome through each scenario."],
      ["Evidence", "Every failure saves a screenshot."],
      ["Report", "Results land in an Excel report and JSON for the developers."]
    ],
    genius: ["Stages can be run separately and against any environment (local, staging) with one flag."],
    stack: ["Python", "Playwright", "Excel reporting"],
    stats: [["103", "automated scenarios"]],
    links: []
  },
  {
    id: "prowl-video",
    name: "PROWL Launch Video Pack",
    kind: "Motion graphics & social content",
    tags: ["video", "va"],
    tagline: "Five promo and tutorial videos, 15 social images and banners, all generated from code so every frame is perfect.",
    problem: "A product launch needed a teaser, an explainer, a tutorial and square cuts for TikTok, Reels and Shorts, fast and on-brand.",
    flow: [
      ["Script & storyboard", "Hook, message and call to action for each video."],
      ["Animate", "Scenes are designed as HTML/CSS keyframe animations."],
      ["Render frame-perfect", "A script pauses every animation at each frame, screenshots it, and FFmpeg stitches 30 fps MP4s."],
      ["Cut for each platform", "1920×1080 for X and YouTube, 1080×1080 for feeds and short-form."],
      ["Ready to post", "Captions, alt text and a posting schedule ship with the files."]
    ],
    genius: [
      "Rendering is deterministic: no dropped frames, and any text change re-renders the whole pack in minutes.",
      "Videos are silent on purpose so a trending sound can be added at upload, which helps reach.",
      "Honesty rules: example tokens are labelled 'Illustration', real screenshots are real."
    ],
    stack: ["HTML/CSS animation", "Playwright", "FFmpeg", "Python", "Copywriting"],
    stats: [["5", "videos"], ["15", "social images"], ["10–45 s", "lengths"]],
    links: [["See the product", "https://prowl-agent.xyz"]]
  },
  {
    id: "ai-birthday-video",
    name: "AI Birthday Video",
    kind: "AI video generation",
    tags: ["video", "va"],
    video: "media/ai-birthday-video.mp4",
    poster: "media/ai-birthday-video.jpg",
    tagline: "A 32-second animated birthday film starring a child's favourite cartoon character, made with AI tools instead of an animation studio.",
    problem: "A birthday wish for a young nephew needed to feel special, not like a generic card. His favourite show was the obvious starring role.",
    flow: [
      ["Idea", "A personal birthday message told as a short cartoon scene with his favourite characters."],
      ["Story and prompts", "The wish and each scene are written out as clear descriptions, with ChatGPT helping to shape them."],
      ["Generate the scenes", "Google Flow turns each description into animated, voiced clips."],
      ["Final film", "The clips come together as one 32-second video that plays on any phone."]
    ],
    genius: [
      "A personal story told through a character the child already loves, so it lands in the first second.",
      "No animation team or software skills needed: writing clear scene descriptions does the directing.",
      "Short, widescreen and phone-friendly, so it can be shared in a chat in one tap."
    ],
    stack: ["ChatGPT", "Google Flow", "AI video generation", "Prompt writing", "Storyboarding"],
    stats: [["32 s", "length"], ["16:9", "format"], ["2", "AI tools"]],
    links: []
  },
  {
    id: "browser",
    name: "Browser Automation Control Room",
    kind: "Playwright + live dashboard",
    tags: ["automation", "backend"],
    tagline: "Many browser robots running in parallel, with a live control room showing what each one is doing.",
    problem: "Repetitive web workflows (forms, checks, data collection) eat hours, and when several run at once you can't see which one is stuck.",
    flow: [
      ["Define the workflow", "Each step of the web task is written as a reusable module."],
      ["Run in parallel", "Several browser instances run at once."],
      ["Stream status", "Each robot reports its progress live over Socket.IO."],
      ["Control", "Start, stop and inspect any instance from the dashboard."]
    ],
    genius: ["Real-time logs per instance mean a stuck robot is visible in seconds, not discovered hours later."],
    stack: ["Python", "Playwright", "Flask", "Socket.IO", "React", "Tailwind"],
    stats: [["Live", "status stream"]],
    links: []
  },
  {
    id: "llm-eval",
    name: "Frontier LLM Evaluation",
    kind: "AI training & benchmarking",
    tags: ["ai", "trainer"],
    tagline: "Designing tasks that make the world's best AI models fail, so they can be measured and improved.",
    problem: "AI labs need hard, honest tests. If a benchmark is too easy or has a loophole, it says nothing about real ability.",
    flow: [
      ["Find a weak spot", "Pick a domain or scenario where models are likely to struggle."],
      ["Write the task", "Clear instructions, a verifiable answer, and no shortcuts."],
      ["Test against models", "Confirm frontier models genuinely fail or struggle."],
      ["Review", "Quality checks and annotation in specialist domains such as finance."]
    ],
    genius: ["Binary recovery scenarios: tasks with one provably correct outcome, so grading is objective."],
    stack: ["Prompt engineering", "Python", "Linux/terminal tasks", "Finance domain", "Rubrics"],
    stats: [["Frontier", "model benchmarks"]],
    links: []
  },
  {
    id: "churn",
    name: "Customer Churn & Start-Up Funding",
    kind: "Data analysis · published articles",
    tags: ["data", "analyst", "ds"],
    tagline: "Which customers are about to leave, and where Indian start-up money really goes, written up for everyone.",
    problem: "Businesses lose money when customers quietly leave, and investors and founders need a clear picture of funding trends.",
    flow: [
      ["Clean", "Fix missing values, outliers and messy categories."],
      ["Explore", "Find the patterns behind churn and funding."],
      ["Model", "Classification models predict which customers will churn."],
      ["Share", "Power BI dashboards and Medium articles explain the findings."]
    ],
    genius: ["Findings are written for a business reader, not just a data scientist."],
    stack: ["Python", "scikit-learn", "pandas", "Power BI", "Medium"],
    stats: [["2", "published articles"], ["2", "Power BI reports"]],
    links: [
      ["Churn article", "https://medium.com/@adebayoabdulakeem/unveiling-customer-churn-leveraging-classification-algorithms-for-predictive-insights-7fa77c7b9115"],
      ["Start-up funding article", "https://medium.com/@adebayoabdulakeem/title-indian-start-up-funding-analysis-b5d0995f44aa"],
      ["Churn code", "https://github.com/badim04/Customer-Churn-ML-Prediction"]
    ]
  },
  {
    id: "technotrend",
    name: "Telecom VAS Analytics",
    kind: "Industry work · Technotrend",
    tags: ["analyst", "data", "va", "backend"],
    tagline: "Dashboards, A/B tests and fraud checks for mobile value-added services used over IVR, USSD, SMS and web.",
    problem: "Telecom services like Miniloan and Call Collect live or die on conversion, churn and fraud, across four very different channels.",
    flow: [
      ["Track the funnel", "CTR, conversion, ARPU and churn per channel."],
      ["Find the why", "Behaviour analysis that lifted retention by 15%."],
      ["Test changes", "A/B tests that raised satisfaction by 18%."],
      ["Recommend", "ML recommendations that raised engagement by 25%."],
      ["Report faster", "Power BI, Tableau and Excel dashboards cut reporting time by 30%."]
    ],
    genius: ["Double opt-in and fraud checks kept services compliant with telecom regulation."],
    stack: ["SQL", "Power BI", "Tableau", "Excel", "Python", "Node.js"],
    stats: [["+15%", "retention"], ["+25%", "engagement"], ["−30%", "reporting time"]],
    links: []
  }
];

/* Role pages. `projects` sets order; `resume` is the PDF in /resumes. */
window.ROLES = {
  general: {
    nav: "Everything",
    title: "Full-stack developer, data scientist & AI automation engineer",
    lead: "I design and ship complete products (web and mobile apps, machine learning systems and AI automations) and I explain them so anyone can follow.",
    pitch: ["Ships complete products, not demos", "Data and ML background behind every decision", "AI where it does real work, with a human check where it matters"],
    projects: ["versusx", "finlo", "caresync", "shiftpilot", "football", "prowl", "codedial", "sports", "salesbot", "prowl-video", "ai-birthday-video", "deliver", "hoodwatch", "ensemble", "forex", "j2d", "giovanni", "oikos", "browser", "llm-eval", "churn", "technotrend"],
    skills: ["React · Next.js · TypeScript", "React Native · Expo", "Node.js · Python · Flask", "PostgreSQL · Supabase · SQLite", "XGBoost · LSTM · FinBERT", "Power BI · Tableau · SQL", "Claude · Gemini · agents", "Playwright · automation"],
    resume: "Abdulakeem_Adebayo_Master_Resume.pdf"
  },
  fullstack: {
    nav: "Full-stack",
    title: "Full-Stack Developer",
    lead: "From database schema to the last pixel: I build complete web and mobile products, test them properly and ship them.",
    pitch: ["Real-time systems (WebSockets, live games)", "Secure data (Row-Level Security, integer money)", "Web + iOS + Android from one codebase"],
    projects: ["versusx", "finlo", "caresync", "shiftpilot", "codedial", "j2d", "deliver", "prowl", "giovanni", "oikos"],
    skills: ["React · Next.js 15", "TypeScript", "Node.js · WebSockets", "Python · Flask · FastAPI", "PostgreSQL · Supabase", "React Native · Expo", "Vitest · Jest · Playwright", "Vercel · Docker · VPS"],
    resume: "Abdulakeem_Adebayo_Full-Stack_Developer_Resume.pdf"
  },
  frontend: {
    nav: "Frontend",
    title: "Frontend Developer",
    lead: "Interfaces that are fast, clear and honest: design systems, accessible colour, smooth motion, and every empty/loading/error state handled.",
    pitch: ["Design systems and tokens", "Colour-blind-validated data viz", "Same UI on web, iOS and Android"],
    projects: ["finlo", "versusx", "giovanni", "caresync", "prowl", "codedial", "j2d", "shiftpilot"],
    skills: ["React · Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native Web", "Three.js", "Accessibility", "Responsive layout"],
    resume: "Abdulakeem_Adebayo_Frontend_Developer_Resume.pdf"
  },
  backend: {
    nav: "Backend",
    title: "Backend Developer",
    lead: "Servers that stay correct under pressure: real-time game referees, audited ledgers, database-level security, cron jobs and integrations.",
    pitch: ["Authoritative WebSocket servers", "Postgres schemas with RLS and SQL functions", "Scheduled jobs, webhooks and third-party APIs"],
    projects: ["versusx", "shiftpilot", "caresync", "deliver", "football", "hoodwatch", "oikos", "browser", "technotrend"],
    skills: ["Node.js", "Python", "PostgreSQL", "Supabase", "SQLite", "WebSockets", "REST APIs", "Docker · VPS"],
    resume: "Abdulakeem_Adebayo_Backend_Developer_Resume.pdf"
  },
  mobile: {
    nav: "Mobile",
    title: "Mobile App Developer",
    lead: "Cross-platform apps with React Native and Expo, offline-first, store-ready and properly tested.",
    pitch: ["Play Store listing and privacy pages", "Offline-first storage (SQLite, MMKV)", "Push notifications, camera, permissions"],
    projects: ["codedial", "finlo", "shiftpilot", "caresync", "versusx"],
    skills: ["React Native", "Expo · EAS", "TypeScript", "NativeWind", "Zustand", "SQLite · MMKV", "Expo Push", "Jest · Vitest"],
    resume: "Abdulakeem_Adebayo_Mobile_App_Developer_Resume.pdf"
  },
  "data-science": {
    nav: "Data science",
    title: "Data Scientist",
    lead: "Models that survive contact with reality: leakage-safe features, honest validation, and systems that retrain and re-calibrate themselves.",
    pitch: ["Prediction systems retrained automatically", "Forecasts that show their own error", "Results explained to non-technical people"],
    projects: ["football", "sports", "ensemble", "finlo", "forex", "churn", "technotrend"],
    skills: ["Python · pandas", "XGBoost · scikit-learn", "LSTM · Transformers", "FinBERT · NLP", "Poisson · statistics", "Backtesting", "SQL", "Streamlit"],
    resume: "Abdulakeem_Adebayo_Data_Scientist_Resume.pdf"
  },
  "data-analyst": {
    nav: "Data analyst",
    title: "Data Analyst",
    lead: "I turn messy data into decisions people act on: funnels, A/B tests, dashboards and clear write-ups.",
    pitch: ["+15% retention from behaviour analysis", "−30% reporting time with BI dashboards", "Google & Azubi certified"],
    projects: ["technotrend", "churn", "sports", "football", "finlo"],
    skills: ["SQL", "Power BI", "Tableau", "Excel · VBA", "Python · pandas", "A/B testing", "Funnel & cohort analysis", "Data storytelling"],
    resume: "Abdulakeem_Adebayo_Data_Analyst_Resume.pdf"
  },
  "data-engineer": {
    nav: "Data engineer",
    title: "Data Engineer",
    lead: "Pipelines that collect, clean, store and serve data reliably: resumable, cached, scheduled and kind to their sources.",
    pitch: ["Resumable backfills (~9,000 matches)", "Scheduled jobs (GitHub Actions, pg_cron)", "Ingestion with dedupe and review queues"],
    projects: ["football", "sports", "finlo", "shiftpilot", "salesbot", "technotrend"],
    skills: ["Python ETL", "SQL", "PostgreSQL · SQLite", "GitHub Actions", "pg_cron", "Caching · backoff", "JSON APIs", "Docker"],
    resume: "Abdulakeem_Adebayo_Data_Engineer_Resume.pdf"
  },
  "ai-automation": {
    nav: "AI automation",
    title: "AI Automation Engineer",
    lead: "I connect LLMs, APIs, bots and browsers into workflows that run on their own, with a human check wherever it matters.",
    pitch: ["Email → AI extraction → review queue", "Tool-using chatbots on real data", "Multi-agent pipelines and browser robots"],
    projects: ["shiftpilot", "salesbot", "prowl", "finlo", "browser", "hoodwatch", "sports", "oikos"],
    skills: ["Claude API", "Gemini function calling", "Agents & tools", "Telegram bots", "Playwright", "Webhooks · cron", "Python · Node.js", "Supabase"],
    resume: "Abdulakeem_Adebayo_AI_Automation_Engineer_Resume.pdf"
  },
  "ai-engineer": {
    nav: "AI engineer",
    title: "AI Engineer / AI Specialist",
    lead: "Machine learning foundations plus hands-on LLM product work: extraction, tool use, agents, evaluation and safe fallbacks.",
    pitch: ["LLM features in shipped products", "ML models with real validation", "Frontier model evaluation experience"],
    projects: ["shiftpilot", "finlo", "salesbot", "prowl", "deliver", "llm-eval", "football", "ensemble"],
    skills: ["LLM apps", "Prompt engineering", "Tool use / function calling", "Evaluation", "XGBoost · LSTM", "FinBERT", "Python", "TypeScript"],
    resume: "Abdulakeem_Adebayo_AI_Engineer_Resume.pdf"
  },
  "ai-trainer": {
    nav: "AI trainer",
    title: "AI Trainer / LLM Evaluator",
    lead: "An engineer and data scientist who writes the hard questions: adversarial tasks, careful annotation and rubric-true reviews.",
    pitch: ["Adversarial benchmark task design", "Coding, data and finance expertise", "Clear written explanations"],
    projects: ["llm-eval", "finlo", "shiftpilot", "football", "forex", "versusx"],
    skills: ["Prompt engineering", "Rubric grading", "Python", "JavaScript / TypeScript", "SQL", "Statistics", "Finance & trading", "Technical writing"],
    resume: "Abdulakeem_Adebayo_AI_Trainer_LLM_Evaluator_Resume.pdf"
  },
  video: {
    nav: "Video",
    title: "Video Editor & Motion Graphics",
    lead: "Short-form promos, explainers and tutorials, cut for every platform and built to be re-rendered in minutes when the message changes.",
    pitch: ["5-video launch pack, 15 social images", "16:9 and 1:1 cuts, captions included", "Content manager background (+12% traffic)"],
    projects: ["prowl-video", "ai-birthday-video", "prowl", "giovanni", "codedial", "finlo"],
    skills: ["Short-form editing", "Motion graphics", "CapCut", "Canva", "Clipchamp", "FFmpeg", "Screen recording (OBS)", "AI video (Google Flow, Grok, InVideo, Higgsfield)", "Captions & copy", "Platform cuts"],
    resume: "Abdulakeem_Adebayo_Video_Editor_Resume.pdf"
  },
  "virtual-assistant": {
    nav: "Virtual assistant",
    title: "Virtual Assistant",
    lead: "Organised, discreet and tech-savvy: I keep projects moving, prepare the documents and reports, run e-commerce back-office work, and automate the repetitive bits.",
    pitch: ["Stakeholder coordination and follow-ups", "Reports in Excel and Power BI", "E-commerce catalogue and listings"],
    projects: ["salesbot", "technotrend", "prowl-video", "oikos", "churn"],
    skills: ["Email & calendar", "Scheduling", "Excel · Google Sheets", "Word · PDF · PowerPoint", "Product listings", "Research", "AI tools", "Customer enquiries"],
    resume: "Abdulakeem_Adebayo_Virtual_Assistant_Resume.pdf"
  },
  "qa-automation": {
    nav: "QA automation",
    title: "QA Automation Engineer",
    lead: "I build robot testers that click through real applications, catch what humans miss and hand developers the evidence: a screenshot and a report for every failure.",
    pitch: ["103-scenario Playwright suite (SIT and UAT)", "347 automated tests on a cross-platform app", "Fraud and double opt-in validation background"],
    projects: ["oikos", "finlo", "versusx", "deliver", "shiftpilot", "caresync"],
    skills: ["Playwright", "Python", "JavaScript / TypeScript", "Vitest · Jest", "Hardhat contract tests", "SIT & UAT planning", "Excel / JSON reporting", "GitHub Actions"],
    resume: "Abdulakeem_Adebayo_QA_Automation_Engineer_Resume.pdf"
  },
  "qa-tester": {
    nav: "QA tester",
    title: "QA Tester",
    lead: "Detail-focused testing: I plan the scenarios, run them, log every defect with steps and a screenshot, and re-test until it is right. I can also automate the repeat checks.",
    pitch: ["103 SIT and UAT scenarios executed and documented", "Bug reports developers can act on", "Quality-control background (-10% defect rate)"],
    projects: ["oikos", "finlo", "caresync", "shiftpilot", "technotrend"],
    skills: ["Test cases & test plans", "Manual & UAT testing", "Regression checks", "Bug reporting", "Excel / Google Sheets", "SQL data checks", "Playwright basics", "Clear written reports"],
    resume: "Abdulakeem_Adebayo_QA_Tester_Resume.pdf"
  },
  "executive-assistant": {
    nav: "Executive assistant",
    title: "Executive Assistant",
    lead: "Organised, discreet and tech-savvy: I keep stakeholders aligned, prepare the documents and reports, and use automation to take the repetitive work off your plate.",
    pitch: ["Client and provider coordination, follow-ups", "Reports and board-ready documents", "AI tools and automation for admin work"],
    projects: ["technotrend", "salesbot", "oikos", "prowl-video"],
    skills: ["Calendar & inbox", "Stakeholder coordination", "Reports · Excel · Power BI", "Word · PDF · PowerPoint", "Research & summaries", "Confidentiality", "AI productivity tools", "Customer enquiries"],
    resume: "Abdulakeem_Adebayo_Executive_Assistant_Resume.pdf"
  },
  "it-support": {
    nav: "IT support",
    title: "IT Support Specialist",
    lead: "I diagnose calmly, fix or escalate with the right details, and write the guide that stops the problem coming back. Telecom platforms, cloud hosting and everyday tools.",
    pitch: ["Technical support background (+15% uptime)", "Telecom VAS platforms: IVR, USSD, SMS", "AWS Cloud Practitioner certified"],
    projects: ["codedial", "technotrend", "salesbot", "caresync"],
    skills: ["Troubleshooting", "Step-by-step user guides", "Service monitoring", "VPS · Vercel · Docker", "Google Workspace · Office", "Telecom (USSD · SMS · IVR)", "SQL", "Clear communication"],
    resume: "Abdulakeem_Adebayo_IT_Support_Specialist_Resume.pdf"
  },
  "senior-it-support": {
    nav: "Senior IT support",
    title: "Senior IT Support Engineer",
    lead: "I own problems end to end: find the root cause, fix it safely, automate the repeat work and document it for the next person. Cloud, VPS hosting and telecom platforms.",
    pitch: ["Incident to root cause to runbook", "Live apps deployed and maintained on Vercel and VPS", "Python and SQL for automation and analysis"],
    projects: ["caresync", "deliver", "technotrend", "codedial", "shiftpilot"],
    skills: ["Incident resolution", "Root-cause analysis", "Python & SQL automation", "Docker · GitHub Actions", "VPS · Vercel · cloud", "Telecom platforms", "Runbooks & documentation", "Vendor coordination"],
    resume: "Abdulakeem_Adebayo_Senior_IT_Support_Engineer_Resume.pdf"
  }
};
