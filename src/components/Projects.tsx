"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkle,
  RotateCcw,
  Gamepad2,
  Maximize2,
  Folder,
  FolderOpen,
  Grid,
  Layers,
  Play,
  Pause,
} from "lucide-react";
import manifest from "@/data/manifest.json";

/* ============================================================
   STELLARIUM CONSTELLATION DATA (VERIFIED GITHUB, ITCH.IO & CREATIVE GALLERIES)
   ============================================================ */

export interface StellarProject {
  id: string;
  name: string;
  repoName?: string;
  constellation: "ai" | "math" | "games" | "data" | "art" | "photography";
  constellationLabel: string;
  x: number; // Celestial X coordinate (-7 to +7)
  y: number; // Celestial Y coordinate (-4.5 to +4.5)
  r: number; // Star radius / luminosity
  role: string;
  period: string;
  impact: string;
  summary: string;
  architecture?: string[];
  techStack?: string[];
  linkUrl?: string;
  linkLabel?: string;
  isGallery?: boolean;
  galleryType?: "art" | "photography";
}

const CONSTELLATIONS = [
  { id: "all", label: "All Constellations", color: "#ff6b4a" },
  { id: "ai", label: "AI & Generative Models", color: "#9B8FFF" },
  { id: "math", label: "Applied Mathematics & SMT", color: "#FFB800" },
  { id: "games", label: "Game Systems & Cryptography", color: "#00D2B4" },
  { id: "data", label: "Data Platforms & Automation", color: "#38BDF8" },
  { id: "art", label: "Art & Illustration (32)", color: "#FF7EB6" },
  { id: "photography", label: "Photography & Editing (62)", color: "#FFAA5A" },
] as const;

const STELLAR_NODES: StellarProject[] = [
  // ==================== CLUSTER 1: AI & GENERATIVE MODELS ====================
  {
    id: "indonesian-llm",
    name: "Indonesian Legal LLM Fine-Tuning & RAG",
    repoName: "indonesian-domain-llm-finetuning-grpo-rag",
    constellation: "ai",
    constellationLabel: "AI & Generative Models",
    x: -4.5,
    y: 2.5,
    r: 1.5,
    role: "AI & LLM Engineer",
    period: "2025 – 2026",
    impact: "Supervised fine-tuning of Qwen2.5 with QLoRA & GRPO policy alignment for legal statutory reasoning.",
    summary:
      "Engineered an Indonesian legal reasoning system integrating QLoRA fine-tuning, Group Relative Policy Optimization (GRPO), FAISS dense retrieval, lexical BM25 hybrid search, and cross-encoder reranking.",
    architecture: [
      "Fine-tuned quantized Qwen2.5 with QLoRA, PEFT, and Unsloth on statutory corpora.",
      "Trained reward-guided policies via Group Relative Policy Optimization (GRPO).",
      "Built hybrid retrieval pipeline blending dense FAISS vector embeddings with lexical BM25 indices.",
      "Integrated cross-encoder reranking layer and published artifacts to Hugging Face Hub.",
    ],
    techStack: ["PyTorch", "Hugging Face", "QLoRA", "GRPO", "FAISS", "BM25", "Python", "Jupyter"],
    linkUrl: "https://github.com/Alltristans/indonesian-domain-llm-finetuning-grpo-rag",
    linkLabel: "View Repository",
  },
  {
    id: "sentinai-guard",
    name: "SentinAI Phishing Detection API",
    repoName: "sentinai-phishing-guard",
    constellation: "ai",
    constellationLabel: "AI & Generative Models",
    x: -2.6,
    y: 3.4,
    r: 1.25,
    role: "ML & Backend Engineer",
    period: "2025",
    impact: "Serverless phishing detection API on Azure Functions with explainable linguistic threat breakdown.",
    summary:
      "Production-ready serverless NLP classification API combining word/character-level TF-IDF feature engineering with logistic regression and a rule-based explainability heuristic layer.",
    architecture: [
      "Extracted word and character n-gram TF-IDF matrices coupled with urgency linguistics.",
      "Designed rule-based explainability layer pinpointing impersonation and suspicious URL structures.",
      "Deployed lightweight serverless endpoints on Azure Functions with strict schema validation.",
    ],
    techStack: ["scikit-learn", "TF-IDF", "Azure Functions", "NLP", "Python", "REST API"],
    linkUrl: "https://github.com/Alltristans/sentinai-phishing-guard",
    linkLabel: "View Repository",
  },
  {
    id: "stable-diffusion-pipe",
    name: "Stable Diffusion Pipeline & Schedulers",
    repoName: "Stable-Diffusion-Pipeline-text-to-image-generator",
    constellation: "ai",
    constellationLabel: "AI & Generative Models",
    x: -5.6,
    y: 1.3,
    r: 1.35,
    role: "Generative AI Developer",
    period: "2024 – 2025",
    impact: "Full latent diffusion pipeline implementation with custom DDIM/Euler schedulers and prompt guidance.",
    summary:
      "Built custom latent diffusion pipeline integrating variational autoencoders (VAE), cross-attention UNet denoising architectures, and text conditioning mechanisms via CLIP encoders.",
    architecture: [
      "Implemented modular latent denoising loops with configurable DDIM & Euler discrete schedulers.",
      "Engineered classifier-free guidance scaling (CFG) for prompt fidelity enhancement.",
      "Optimized memory footprint with FP16 half-precision and sliced cross-attention computation.",
    ],
    techStack: ["PyTorch", "Diffusers", "CLIP", "UNet", "VAE", "Python", "CUDA"],
    linkUrl: "https://github.com/Alltristans/Stable-Diffusion-Pipeline-text-to-image-generator",
    linkLabel: "View Repository",
  },
  {
    id: "cifar10-vision",
    name: "CIFAR-10 Residual Vision Classifier",
    repoName: "CIFAR-10-Image-Classification",
    constellation: "ai",
    constellationLabel: "AI & Generative Models",
    x: -3.8,
    y: 0.6,
    r: 1.15,
    role: "Computer Vision Researcher",
    period: "2024",
    impact: "Deep residual convolutional neural networks achieving robust accuracy on CIFAR-10 vision benchmark.",
    summary:
      "Comparative architectural benchmark evaluating ResNet, VGG, and custom CNN topologies with automated augmentation pipelines and learning rate warmup schedules.",
    architecture: [
      "Trained residual convolutional backbones with skip-connection gradient highways.",
      "Applied RandAugment, MixUp, and CutMix data regularizations to combat overfitting.",
      "Visualized feature map activations and Grad-CAM saliency distributions.",
    ],
    techStack: ["PyTorch", "Torchvision", "ResNet", "Grad-CAM", "Python", "Matplotlib"],
    linkUrl: "https://github.com/Alltristans/CIFAR-10-Image-Classification",
    linkLabel: "View Repository",
  },

  // ==================== CLUSTER 2: APPLIED MATHEMATICS & SMT ====================
  {
    id: "robot-smt",
    name: "Robot Path SMT Solver & Optimizer",
    repoName: "robot-path-smt-solver",
    constellation: "math",
    constellationLabel: "Applied Mathematics & SMT",
    x: 1.8,
    y: 2.8,
    r: 1.45,
    role: "Mathematical Optimizer",
    period: "2025",
    impact: "Automated kinematic trajectory synthesis using Satisfiability Modulo Theories (Z3 Solver).",
    summary:
      "Formulated continuous 2D/3D robot obstacle avoidance as formal logic constraints, solved via Z3 SMT solver to guarantee mathematical correctness and collision-free bounds.",
    architecture: [
      "Encoded polygonal spatial obstacles and step bounds into first-order logic formulas.",
      "Formulated shortest-path kinematic optimization under non-linear bounds in Z3.",
      "Compared SMT constraint satisfiability against classical Dijkstra and A* search baselines.",
    ],
    techStack: ["Z3 SMT Solver", "Formal Methods", "Optimization", "Python", "Discrete Math"],
    linkUrl: "https://github.com/Alltristans/robot-path-smt-solver",
    linkLabel: "View Repository",
  },
  {
    id: "mental-health-ode",
    name: "Social Media Mental Health Dynamical Model",
    repoName: "social-media-mental-health-model",
    constellation: "math",
    constellationLabel: "Applied Mathematics & SMT",
    x: 3.6,
    y: 3.5,
    r: 1.25,
    role: "Mathematical Modeler",
    period: "2025",
    impact: "Nonlinear ordinary differential equation (ODE) system modeling user psychological equilibrium.",
    summary:
      "Derived coupled dynamical ODE systems capturing user attention decay, algorithmic reward reinforcement, and mental fatigue bifurcation points under varying social media engagement intensities.",
    architecture: [
      "Constructed non-linear coupled ODE equilibrium systems with Jacobian stability analysis.",
      "Simulated state phase portraits and bifurcation thresholds using Runge-Kutta numerical methods.",
      "Fitted empirical survey parameters via non-linear least-squares optimization.",
    ],
    techStack: ["SciPy", "Dynamical Systems", "ODE Solver", "Phase Portraits", "Python"],
    linkUrl: "https://github.com/Alltristans/social-media-mental-health-model",
    linkLabel: "View Repository",
  },
  {
    id: "china-real-estate",
    name: "China Real Estate Demand Econometric Model",
    repoName: "china_real_estate_demand_prediction",
    constellation: "math",
    constellationLabel: "Applied Mathematics & SMT",
    x: 4.9,
    y: 2.2,
    r: 1.3,
    role: "Econometric Modeler",
    period: "2025",
    impact: "Multivariate econometric forecasting models analyzing macroeconomic liquidity and housing demand.",
    summary:
      "Built time-series econometric regression architectures modeling provincial housing demand across China utilizing autoregressive integrated moving averages (ARIMA) and gradient boosted trees.",
    architecture: [
      "Engineered econometric stationarity tests (ADF, KPSS) and cointegration transforms.",
      "Constructed multi-factor lag models integrating GDP, urban growth, and lending policy rates.",
      "Evaluated predictive performance using Walk-Forward cross validation and RMSE metrics.",
    ],
    techStack: ["statsmodels", "LightGBM", "Econometrics", "Time-Series", "Python"],
    linkUrl: "https://github.com/Alltristans/china_real_estate_demand_prediction",
    linkLabel: "View Repository",
  },
  {
    id: "financial-ml",
    name: "Quantitative Financial Machine Learning",
    repoName: "Financial-Data-Machine-Learning-Project",
    constellation: "math",
    constellationLabel: "Applied Mathematics & SMT",
    x: 3.3,
    y: 1.3,
    r: 1.2,
    role: "Quantitative Analyst",
    period: "2025",
    impact: "Algorithmic market volatility modeling and portfolio risk optimization using probabilistic ML.",
    summary:
      "Engineered quantitative algorithmic trading and volatility estimation pipeline utilizing stochastic calculus indicators, Markowitz mean-variance optimization, and Random Forest ensemble classifiers.",
    architecture: [
      "Calculated rolling Sharpe ratio, Maximum Drawdown, and Value-at-Risk (VaR) frontiers.",
      "Implemented fractional differentiation to preserve memory in financial time-series data.",
      "Constructed automated backtesting engine evaluating transaction slip and market impact.",
    ],
    techStack: ["Pandas", "Scikit-Learn", "Quantitative Finance", "Stochastic Calculus", "Python"],
    linkUrl: "https://github.com/Alltristans/Financial-Data-Machine-Learning-Project",
    linkLabel: "View Repository",
  },
  {
    id: "project-finale",
    name: "Applied Mathematical Modeling & Numerical Solver",
    repoName: "Project-Finale",
    constellation: "math",
    constellationLabel: "Applied Mathematics & SMT",
    x: 5.5,
    y: 0.6,
    r: 1.15,
    role: "Applied Mathematician",
    period: "2026",
    impact: "Numerical simulation and optimization algorithms for high-dimensional computational systems.",
    summary:
      "Capstone mathematical modeling investigation solving complex numerical boundary problems and gradient optimization routines for physical and logistical constraint systems.",
    architecture: [
      "Implemented custom Newton-Raphson and conjugate gradient numerical solver routines.",
      "Simulated multi-variable objective surfaces with interactive 3D mesh contour plots.",
      "Validated mathematical convergence proofs against empirical iteration benchmarks.",
    ],
    techStack: ["NumPy", "SciPy", "Numerical Analysis", "Mathematical Optimization", "Python"],
    linkUrl: "https://github.com/Alltristans/Project-Finale",
    linkLabel: "View Repository",
  },

  // ==================== CLUSTER 3: GAME SYSTEMS & CRYPTOGRAPHY ====================
  {
    id: "kliwon",
    name: "Kliwon: The Curse of Friday Night",
    repoName: "kliwon-the-curse-of-friday-night",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 2.3,
    y: -0.7,
    r: 1.45,
    role: "Lead Gameplay Programmer",
    period: "2024",
    impact: "Indonesian folklore psychological horror game published on itch.io with atmospheric audio pacing.",
    summary:
      "Developed a complete 3D atmospheric psychological horror experience rooted in Javanese mythology. Engineered dynamic AI patrol behaviors, sanity mechanics, and localized sound propagation.",
    architecture: [
      "Programmed finite state machine (FSM) enemy AI with stealth line-of-sight raycasting.",
      "Designed dynamic audio occlusion system triggering procedural tension strings.",
      "Published fully playable web and standalone builds on itch.io.",
    ],
    techStack: ["Unity", "C#", "FSM AI", "3D Spatial Audio", "Post-Processing", "itch.io"],
    linkUrl: "https://alltristans.itch.io/kliwon-the-curse-of-friday-night",
    linkLabel: "Play on itch.io",
  },
  {
    id: "rps-rift",
    name: "Rock Paper Scissors: Rift",
    repoName: "rock-paper-scissors-rift",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 4.4,
    y: -1.1,
    r: 1.35,
    role: "Game Systems Designer",
    period: "2024",
    impact: "Strategic elemental tactical combat re-imagination of RPS with simultaneous action resolution.",
    summary:
      "A competitive tactical battle game expanding classical Rock-Paper-Scissors into a deep elemental combat arena with custom cooldown systems, status modifiers, and predictive turn resolution.",
    architecture: [
      "Architected event-driven combat bus decoupling input state from animation queues.",
      "Designed deterministic damage calculation formulas factoring elemental affinity matrix.",
      "Shipped responsive UI layout optimized for immediate browser game sessions.",
    ],
    techStack: ["Godot Engine", "GDScript", "State Machines", "Game Design", "itch.io"],
    linkUrl: "https://alltristans.itch.io/rock-paper-scissors-rift",
    linkLabel: "Play on itch.io",
  },
  {
    id: "ggj26-game",
    name: "GGJ26 Global Game Jam Engine",
    repoName: "GGJ26",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 1.2,
    y: -1.9,
    r: 1.3,
    role: "Core Engine Developer",
    period: "2026",
    impact: "Rapid-prototyped 48-hour Global Game Jam entry with custom physics mechanics.",
    summary:
      "Created under strict 48-hour hackathon constraints for Global Game Jam 2026. Engineered lightweight custom 2D physics controllers, dynamic particle emitters, and adaptive camera framing.",
    architecture: [
      "Constructed velocity-verlet physics resolution routines for responsive platforming.",
      "Implemented modular particle pooling systems reducing runtime memory allocations.",
      "Integrated audio cue sequencer synchronized to player momentum milestones.",
    ],
    techStack: ["GDScript", "Godot 4", "Physics Engine", "Rapid Prototyping", "GitHub"],
    linkUrl: "https://github.com/Alltristans/GGJ26",
    linkLabel: "View Repository",
  },
  {
    id: "escape-tw2",
    name: "Escape TW2 3D Spatial Room",
    repoName: "Escape_TW2",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 3.3,
    y: -2.4,
    r: 1.2,
    role: "Unity Developer",
    period: "2024",
    impact: "3D first-person spatial puzzle room with physics interaction and inventory logic.",
    summary:
      "Interactive 3D escape room game in Unity featuring physics-based object inspection, lock mechanisms, inventory crafting, and environmental riddle triggers.",
    architecture: [
      "Programmed object inspection rig with 6-DOF physics rotation and snap points.",
      "Constructed modular inventory slot architecture with item combination event dispatchers.",
      "Built lightmap baking profiles optimized for mobile and desktop rendering.",
    ],
    techStack: ["Unity", "C#", "3D Modeling", "Physics Triggers", "GitHub"],
    linkUrl: "https://github.com/Alltristans/Escape_TW2",
    linkLabel: "View Repository",
  },
  {
    id: "spaceship-arcade",
    name: "Galactic Spaceship 2D Vector Arcade",
    repoName: "spaceship",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 5.2,
    y: -2.7,
    r: 1.15,
    role: "Java Engine Programmer",
    period: "2024",
    impact: "Object-oriented 2D vector arcade game engine built from scratch with double buffering.",
    summary:
      "Engineered a retro vector space shooter in Java implementing pure object-oriented game loop architecture, spatial collision detection, and custom vector rendering routines.",
    architecture: [
      "Implemented fixed timestep 60 FPS game loop with delta time normalization.",
      "Engineered Axis-Aligned Bounding Box (AABB) spatial partition collision system.",
      "Designed vector particle explosion synthesis using double-buffered graphics context.",
    ],
    techStack: ["Java", "OOP", "Swing/AWT", "2D Collision", "Game Loop"],
    linkUrl: "https://github.com/Alltristans/spaceship",
    linkLabel: "View Repository",
  },
  {
    id: "stealth-cryptography",
    name: "Stealth Cryptography & Steganography",
    repoName: "Stealth_Cryptography",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 0.6,
    y: -3.3,
    r: 1.25,
    role: "Security & Crypto Engineer",
    period: "2025",
    impact: "Multi-layered cryptographic payload concealment inside image bitplane structures.",
    summary:
      "Interactive cryptographic application combining AES-256 cipher streams with Least Significant Bit (LSB) spatial steganography for covert message payload embedding inside PNG images.",
    architecture: [
      "Engineered AES-GCM authenticated encryption routines with PBKDF2 key derivation.",
      "Constructed LSB bit manipulation algorithms distributing ciphertext across RGB channels.",
      "Added integrity verification checksums and anti-tamper extraction routines.",
    ],
    techStack: ["JavaScript", "Cryptography", "AES-256", "Steganography", "Canvas API"],
    linkUrl: "https://github.com/Alltristans/Stealth_Cryptography",
    linkLabel: "View Repository",
  },
  {
    id: "sherlock-cipher",
    name: "Sherlock Cipher & Cryptanalysis Suite",
    repoName: "SherlockCipherGame",
    constellation: "games",
    constellationLabel: "Game Systems & Cryptography",
    x: 2.2,
    y: -3.6,
    r: 1.2,
    role: "Cryptanalysis Developer",
    period: "2025",
    impact: "Educational cryptanalysis puzzle terminal simulating historical substitution and matrix ciphers.",
    summary:
      "Gamified cipher investigation terminal challenging users to crack substitution, transposition, Vigenere, and Hill ciphers using letter frequency histograms and index of coincidence metrics.",
    architecture: [
      "Programmed mathematical cipher transformations (Hill matrix multiplication modulo 26).",
      "Engineered automated frequency analysis heuristic scoring deciphering candidate keys.",
      "Constructed interactive CLI investigation narrative with progressive difficulty states.",
    ],
    techStack: ["Python", "Cryptanalysis", "Matrix Math", "Linear Algebra", "CLI"],
    linkUrl: "https://github.com/Alltristans/SherlockCipherGame",
    linkLabel: "View Repository",
  },

  // ==================== CLUSTER 4: DATA PLATFORMS & AUTOMATION ====================
  {
    id: "sync-talent",
    name: "SyncTalent Platform & Analytics",
    repoName: "SyncTalent",
    constellation: "data",
    constellationLabel: "Data Platforms & Automation",
    x: -1.2,
    y: -0.8,
    r: 1.35,
    role: "Fullstack & Analytics Developer",
    period: "2026",
    impact: "Talent matchmaking and candidate evaluation platform with algorithmic skill scoring.",
    summary:
      "Production-ready talent platform matching technical candidates with projects based on algorithmic vector embeddings, verified portfolio credentials, and automated assessment scoring.",
    architecture: [
      "Architected clean TypeScript full-stack layer with strict schema validations.",
      "Engineered automated candidate indexing and matching algorithms.",
      "Implemented analytics dashboards visualizing skill distributions and conversion funnels.",
    ],
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Data Analytics", "REST API"],
    linkUrl: "https://github.com/Alltristans/SyncTalent",
    linkLabel: "View Repository",
  },
  {
    id: "analisis-gamifikasi",
    name: "SEVIMA Gamification Analytics Engine",
    repoName: "AnalisisGamifikasi",
    constellation: "data",
    constellationLabel: "Data Platforms & Automation",
    x: -3.0,
    y: -0.9,
    r: 1.3,
    role: "Data Analyst",
    period: "2025",
    impact: "User behavioral analytics evaluating EdTech gamification features across active student cohorts.",
    summary:
      "Conducted in-depth behavioral and engagement analytics on SEVIMA's EdTech ecosystem, modeling user retention curves, badge reward efficacy, and daily active user drop-off triggers.",
    architecture: [
      "Cleaned and aggregated event log data across 10,000+ student interaction sessions.",
      "Computed statistical cohort retention matrices and churn likelihood models.",
      "Delivered executive insights and data visualizations driving gamification feature roadmap.",
    ],
    techStack: ["Python", "Pandas", "Statistical Analysis", "Cohort Modeling", "Tableau"],
    linkUrl: "https://github.com/Alltristans/AnalisisGamifikasi",
    linkLabel: "View Repository",
  },
  {
    id: "bike-sharing-analytics",
    name: "Urban Bike Sharing Temporal Analytics",
    repoName: "AnalisisDataBikeSharing",
    constellation: "data",
    constellationLabel: "Data Platforms & Automation",
    x: -4.7,
    y: -1.7,
    r: 1.25,
    role: "Data Analyst",
    period: "2024",
    impact: "Exploratory data analysis uncovering weather impact and diurnal usage patterns in bike sharing.",
    summary:
      "End-to-end data analysis project processing urban bike rental transactions. Uncovered key correlations between humidity, temperature, seasonal indicators, and commuter surge hours.",
    architecture: [
      "Conducted extensive data wrangling, outlier detection, and feature normalization.",
      "Built interactive Streamlit analytical dashboards for dynamic time-series inspection.",
      "Documented actionable fleet balancing recommendations for urban operations.",
    ],
    techStack: ["Streamlit", "Pandas", "Seaborn", "Time-Series", "Python"],
    linkUrl: "https://github.com/Alltristans/AnalisisDataBikeSharing",
    linkLabel: "View Repository",
  },
  {
    id: "ibox-automation",
    name: "iBox Workflow Automation Pipeline",
    repoName: "iBox-Automation",
    constellation: "data",
    constellationLabel: "Data Platforms & Automation",
    x: -1.9,
    y: -2.1,
    r: 1.2,
    role: "Automation Engineer",
    period: "2026",
    impact: "Headless RPA browser script automating product stock checks and inventory alerts.",
    summary:
      "Engineered automated web scraping and monitoring pipeline querying real-time retail inventory availability with automated webhook notifications and scheduled cron execution.",
    architecture: [
      "Built resilient headless browser routines with intelligent retry strategies and proxy rotation.",
      "Integrated instant Telegram and Discord webhook notifications upon stock changes.",
      "Containerized script execution for lightweight scheduled serverless runs.",
    ],
    techStack: ["Python", "Selenium", "Web Scraping", "Automation", "Discord Webhooks"],
    linkUrl: "https://github.com/Alltristans/iBox-Automation",
    linkLabel: "View Repository",
  },
  {
    id: "magenta-automation",
    name: "Magenta Cloud Task & Pipeline Automator",
    repoName: "magenta-automation",
    constellation: "data",
    constellationLabel: "Data Platforms & Automation",
    x: -3.8,
    y: -3.0,
    r: 1.2,
    role: "DevOps & Automation Engineer",
    period: "2026",
    impact: "Automated workflow scripts streamlining repetitive operational pipelines and data syncing.",
    summary:
      "Suite of automated CLI tools and Python utilities optimizing data ingestion, reporting, file organization, and API health checks across distributed development environments.",
    architecture: [
      "Engineered modular task runners with JSON logging and error telemetry.",
      "Built automated data backup and cloud synchronization pipelines.",
      "Integrated CLI flags for flexible batch execution parameters.",
    ],
    techStack: ["Python", "Automation", "CLI Tools", "Shell Scripting", "Cron"],
    linkUrl: "https://github.com/Alltristans/magenta-automation",
    linkLabel: "View Repository",
  },

  // ==================== CLUSTER 5: ART & ILLUSTRATION ====================
  {
    id: "art-illustration",
    name: "Art & Illustration Collection",
    constellation: "art",
    constellationLabel: "Art & Digital Illustration",
    x: 0.0,
    y: 0.9,
    r: 1.35,
    role: "Digital Artist & Concept Illustrator",
    period: "2017 – Present",
    impact: "Curated archive of 32 original character sketches, digital paintings, concept art, and visual studies.",
    summary:
      "Comprehensive visual arts portfolio spanning traditional hand-drawn pencil sketches, character concept design, raster illustrations, and digital painting created across 2017–2026.",
    isGallery: true,
    galleryType: "art",
    linkLabel: "Open Folder Archive",
  },

  // ==================== CLUSTER 6: PHOTOGRAPHY & VISUAL EDITING ====================
  {
    id: "photography-editing",
    name: "Photography & Digital Editing Collection",
    constellation: "photography",
    constellationLabel: "Photography & Visual Editing",
    x: 0.0,
    y: -1.4,
    r: 1.35,
    role: "Photographer & Visual Editor",
    period: "2016 – Present",
    impact: "Comprehensive archive of 62 architectural, landscape, street, portrait, and digital photo edits.",
    summary:
      "Visual photography journey capturing urban geometry, golden hour landscapes, macro perspectives, and high-dynamic-range color grading across East & Central Java.",
    isGallery: true,
    galleryType: "photography",
    linkLabel: "Open Folder Archive",
  },
];

// Constellation Line Links (Cosmic Network Connections)
const CONSTELLATION_LINKS: [string, string][] = [
  // AI Constellation Lines
  ["indonesian-llm", "sentinai-guard"],
  ["indonesian-llm", "stable-diffusion-pipe"],
  ["sentinai-guard", "cifar10-vision"],
  ["stable-diffusion-pipe", "cifar10-vision"],

  // Math & SMT Constellation Lines
  ["robot-smt", "mental-health-ode"],
  ["mental-health-ode", "china-real-estate"],
  ["china-real-estate", "financial-ml"],
  ["financial-ml", "project-finale"],
  ["robot-smt", "financial-ml"],

  // Games & Crypto Constellation Lines
  ["kliwon", "rps-rift"],
  ["kliwon", "ggj26-game"],
  ["rps-rift", "escape-tw2"],
  ["escape-tw2", "spaceship-arcade"],
  ["ggj26-game", "stealth-cryptography"],
  ["stealth-cryptography", "sherlock-cipher"],
  ["escape-tw2", "sherlock-cipher"],

  // Data & Automation Constellation Lines
  ["sync-talent", "analisis-gamifikasi"],
  ["analisis-gamifikasi", "bike-sharing-analytics"],
  ["sync-talent", "ibox-automation"],
  ["ibox-automation", "magenta-automation"],
  ["bike-sharing-analytics", "magenta-automation"],

  // Inter-Constellation Nexus Lines
  ["indonesian-llm", "robot-smt"],
  ["stable-diffusion-pipe", "art-illustration"],
  ["cifar10-vision", "photography-editing"],
  ["art-illustration", "photography-editing"],
  ["art-illustration", "ggj26-game"],
  ["photography-editing", "kliwon"],
  ["sync-talent", "photography-editing"],
  ["project-finale", "kliwon"],
];

/* ============================================================
   MAIN STELLARIUM UNIVERSE COMPONENT
   ============================================================ */

export default function Projects({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeConstellation, setActiveConstellation] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<StellarProject | null>(null);
  const [hoveredNode, setHoveredNode] = useState<StellarProject | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Folder Deck Interactive State
  const [folderIndex, setFolderIndex] = useState<number>(0);
  const [folderMode, setFolderMode] = useState<"deck" | "grid">("deck");

  // Reset folder position when switching nodes
  useEffect(() => {
    setFolderIndex(0);
    setFolderMode("deck");
  }, [selectedNode?.id]);

  // Camera Pan & Zoom State (Drag only, NO wheel hijack)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);

  // Celestial Rotation & Dynamic Simulation Refs
  const angleRef = useRef<number>(0);
  const speedRef = useRef<number>(0.00014);
  const currentAngleRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isOrbitingRef = useRef<boolean>(true);
  isOrbitingRef.current = isOrbiting;

  const meteorsRef = useRef<
    Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      len: number;
      speed: number;
      alpha: number;
      life: number;
      maxLife: number;
    }>
  >([]);

  const dragStartRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
    startTime: number;
    initialNode: StellarProject | null;
    hasMoved: boolean;
  }>({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
    startTime: 0,
    initialNode: null,
    hasMoved: false,
  });

  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);

  // Background random twinkle stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 340 }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 15,
      size: Math.random() * 1.6 + 0.4,
      brightness: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 2 + 0.8,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Filtered nodes based on active tab
  const filteredNodes = useMemo(() => {
    if (activeConstellation === "all") return STELLAR_NODES;
    return STELLAR_NODES.filter((n) => n.constellation === activeConstellation);
  }, [activeConstellation]);

  // Dynamic Live Node Position Calculator (Rigid celestial rotation + organic zero-gravity breathing)
  const getLiveNodeCoords = useCallback(
    (node: StellarProject, angle: number, t: number): [number, number] => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const rx = node.x * cos - node.y * sin;
      const ry = node.x * sin + node.y * cos;

      // Subtle organic stellar float
      const wobbleX = Math.sin(t * 0.9 + (node.x + 10) * 2.3) * 0.035;
      const wobbleY = Math.cos(t * 0.8 + (node.y + 10) * 1.9) * 0.035;

      return [rx + wobbleX, ry + wobbleY];
    },
    []
  );

  // Color lookup helper
  const getNodeColor = useCallback(
    (constellation: string) => {
      const found = CONSTELLATIONS.find((c) => c.id === constellation);
      return found?.color || "#ff6b4a";
    },
    []
  );

  // Gallery items for Art & Photography
  const artCategory = manifest.portfolioCategories.find((c) => c.id === "art-illustration");
  const photoCategory = manifest.portfolioCategories.find((c) => c.id === "photography-digital-editing");

  const selectedGalleryItems = useMemo(() => {
    if (selectedNode?.galleryType === "art") {
      return artCategory?.items || [];
    }
    if (selectedNode?.galleryType === "photography") {
      return photoCategory?.items || [];
    }
    return [];
  }, [selectedNode?.galleryType, artCategory?.items, photoCategory?.items]);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxCategory, setLightboxCategory] = useState<"art" | "photography">("art");

  const currentGalleryItems = lightboxCategory === "art" ? artCategory?.items || [] : photoCategory?.items || [];
  const currentLightboxItem = lightboxIndex !== null ? currentGalleryItems[lightboxIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % currentGalleryItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + currentGalleryItems.length) % currentGalleryItems.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, currentGalleryItems.length]);

  const openLightbox = (category: "art" | "photography", index: number) => {
    setLightboxCategory(category);
    setLightboxIndex(index);
  };

  // -------------------------------------------------------------
  // CANVAS RENDER LOOP (Continuous Cosmic Stellarium Animation)
  // -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();
    let lastFrameTime = performance.now();

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (time: number) => {
      const t = (time - startTime) * 0.001;
      const now = performance.now();
      const dt = Math.min(50, now - lastFrameTime);
      lastFrameTime = now;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      // Coordinate Transform
      const baseScale = Math.min(width, height) / 10.5;
      const scale = baseScale * zoom;
      const cx = width / 2 + pan.x;
      const cy = height / 2 + pan.y;

      const toScreen = (x: number, y: number): [number, number] => {
        return [cx + x * scale, cy - y * scale];
      };

      // Solar System Celestial Rotation Dynamics
      let targetSpeed = 0;
      if (isOrbitingRef.current && !isDragging && !hoveredNode && !selectedNode) {
        targetSpeed = 0.00014; // ~0.008 rad/s calm, elegant celestial drift
      } else if (isOrbitingRef.current && (hoveredNode || selectedNode)) {
        targetSpeed = 0.000015; // ultra-slow gentle crawl when inspecting
      } else {
        targetSpeed = 0;
      }

      speedRef.current += (targetSpeed - speedRef.current) * 0.06;
      angleRef.current += speedRef.current * dt;
      const angle = angleRef.current;
      currentAngleRef.current = angle;
      currentTimeRef.current = t;

      const [originX, originY] = toScreen(0, 0);

      // 1. Deep Cosmic Nebula Atmosphere
      const nebulae = [
        { x: -3.5, y: 2.0, color: "155, 143, 255", r: 4.6 }, // AI (Purple)
        { x: 3.5, y: 2.0, color: "255, 184, 0", r: 4.2 },   // Math (Gold)
        { x: 3.0, y: -2.0, color: "0, 210, 180", r: 4.5 },  // Games (Teal)
        { x: -3.0, y: -2.0, color: "56, 189, 248", r: 4.3 },// Data (Blue)
        { x: 0.0, y: 0.0, color: "255, 107, 74", r: 3.8 },   // Center (Coral)
      ];

      nebulae.forEach((neb) => {
        const cos = Math.cos(angle * 0.6);
        const sin = Math.sin(angle * 0.6);
        const nx = neb.x * cos - neb.y * sin;
        const ny = neb.x * sin + neb.y * cos;
        const [screenX, screenY] = toScreen(nx, ny);
        const screenR = neb.r * scale;

        ctx.save();
        const grad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, screenR);
        grad.addColorStop(0, isDark ? `rgba(${neb.color}, 0.065)` : `rgba(${neb.color}, 0.035)`);
        grad.addColorStop(0.6, isDark ? `rgba(${neb.color}, 0.02)` : `rgba(${neb.color}, 0.01)`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Concentric Orbit Rings & Astrolabe Markings
      const orbitRadii = [1.6, 3.2, 4.8, 6.4, 8.0];
      orbitRadii.forEach((r, idx) => {
        ctx.save();
        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${0.035 + (idx % 2) * 0.015})`
          : `rgba(0, 0, 0, ${0.035 + (idx % 2) * 0.015})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(idx % 2 === 0 ? [4, 6] : [2, 5]);
        ctx.lineDashOffset = -t * (idx % 2 === 0 ? 4 : -3);
        ctx.beginPath();
        ctx.arc(originX, originY, r * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Astrolabe degree ticks on orbit rings
        if (idx === 2 || idx === 3) {
          const tickCount = 8;
          for (let k = 0; k < tickCount; k++) {
            const tickAngle = angle + (k * Math.PI * 2) / tickCount;
            const tx1 = originX + Math.cos(tickAngle) * (r * scale - 4);
            const ty1 = originY + Math.sin(tickAngle) * (r * scale - 4);
            const tx2 = originX + Math.cos(tickAngle) * (r * scale + 4);
            const ty2 = originY + Math.sin(tickAngle) * (r * scale + 4);
            ctx.beginPath();
            ctx.moveTo(tx1, ty1);
            ctx.lineTo(tx2, ty2);
            ctx.stroke();

            if (idx === 3 && zoom >= 0.85) {
              ctx.font = "9px monospace";
              ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.28)" : "rgba(0, 0, 0, 0.28)";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              const deg = Math.round((k * 360) / tickCount);
              const labelX = originX + Math.cos(tickAngle) * (r * scale + 13);
              const labelY = originY + Math.sin(tickAngle) * (r * scale + 13);
              ctx.fillText(`${deg}°`, labelX, labelY);
            }
          }
        }
        ctx.restore();
      });

      // Rotating Celestial Axis Crosshairs
      ctx.save();
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      const axisLen = 9.0 * scale;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(originX - axisLen * cosA, originY - axisLen * sinA);
      ctx.lineTo(originX + axisLen * cosA, originY + axisLen * sinA);
      ctx.moveTo(originX + axisLen * sinA, originY - axisLen * cosA);
      ctx.lineTo(originX - axisLen * sinA, originY + axisLen * cosA);
      ctx.stroke();
      ctx.restore();

      // 3. Draw Twinkling Background Stars (with gentle parallax)
      backgroundStars.forEach((star) => {
        const cos = Math.cos(angle * 0.15);
        const sin = Math.sin(angle * 0.15);
        const sxRot = star.x * cos - star.y * sin;
        const syRot = star.x * sin + star.y * cos;
        const [sx, sy] = toScreen(sxRot, syRot);

        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) return;

        const twinkle = Math.sin(t * star.speed + star.phase);
        const alpha = Math.max(0.08, star.brightness + twinkle * 0.28);

        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha * 0.85})`
          : `rgba(40, 40, 60, ${alpha * 0.55})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Update & Draw Shooting Stars (Meteors)
      if (meteorsRef.current.length < 2 && Math.random() < 0.015) {
        const spawnAngle = -Math.PI * (0.6 + Math.random() * 0.25);
        const spd = 8 + Math.random() * 7;
        meteorsRef.current.push({
          x: (Math.random() - 0.5) * 16,
          y: 3.5 + Math.random() * 2,
          dx: Math.cos(spawnAngle) * spd,
          dy: Math.sin(spawnAngle) * spd,
          len: 1.5 + Math.random() * 1.8,
          speed: spd,
          alpha: 1,
          life: 0,
          maxLife: 0.7 + Math.random() * 0.6,
        });
      }

      meteorsRef.current.forEach((m) => {
        m.life += dt * 0.001;
        m.x += m.dx * (dt * 0.001);
        m.y += m.dy * (dt * 0.001);
        const progress = m.life / m.maxLife;
        m.alpha = Math.max(0, 1 - progress);

        const [hx, hy] = toScreen(m.x, m.y);
        const [tx, ty] = toScreen(m.x - (m.dx / m.speed) * m.len, m.y - (m.dy / m.speed) * m.len);

        if (hx > -50 && hx < width + 50 && hy > -50 && hy < height + 50) {
          ctx.save();
          const meteorGrad = ctx.createLinearGradient(tx, ty, hx, hy);
          meteorGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          meteorGrad.addColorStop(0.7, isDark ? `rgba(255, 180, 120, ${m.alpha * 0.5})` : `rgba(255, 107, 74, ${m.alpha * 0.4})`);
          meteorGrad.addColorStop(1, isDark ? `rgba(255, 255, 255, ${m.alpha * 0.95})` : `rgba(255, 107, 74, ${m.alpha * 0.9})`);

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      meteorsRef.current = meteorsRef.current.filter((m) => m.life < m.maxLife);

      // 6. Draw Constellation Interconnection Lines & Energy Bridges
      CONSTELLATION_LINKS.forEach(([fromId, toId]) => {
        const fromNode = STELLAR_NODES.find((n) => n.id === fromId);
        const toNode = STELLAR_NODES.find((n) => n.id === toId);
        if (!fromNode || !toNode) return;

        const isHighlighted =
          (hoveredNode && (hoveredNode.id === fromId || hoveredNode.id === toId)) ||
          (selectedNode && (selectedNode.id === fromId || selectedNode.id === toId));

        const isDimmed =
          activeConstellation !== "all" &&
          fromNode.constellation !== activeConstellation &&
          toNode.constellation !== activeConstellation;

        const [nx1, ny1] = getLiveNodeCoords(fromNode, angle, t);
        const [nx2, ny2] = getLiveNodeCoords(toNode, angle, t);
        const [x1, y1] = toScreen(nx1, ny1);
        const [x2, y2] = toScreen(nx2, ny2);

        ctx.save();
        if (isHighlighted) {
          ctx.strokeStyle = isDark ? "rgba(255, 107, 74, 0.9)" : "rgba(255, 107, 74, 0.95)";
          ctx.lineWidth = 2.2;
          ctx.shadowColor = "#ff6b4a";
          ctx.shadowBlur = 8;
          ctx.setLineDash([]);
        } else if (isDimmed) {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 5]);
        } else {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.12)";
          ctx.lineWidth = 1.1;
          ctx.setLineDash([2, 4]);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();

        // Constellation photon wave / energy pulse packet
        if (!isDimmed) {
          ctx.save();
          const pulseSpeed = isHighlighted ? 1.2 : 0.28;
          const pulseOffset = (t * pulseSpeed + Math.abs(fromNode.x) * 1.5) % 1;
          const px = x1 + (x2 - x1) * pulseOffset;
          const py = y1 + (y2 - y1) * pulseOffset;

          const pulseColor = isHighlighted
            ? "#ff6b4a"
            : getNodeColor(fromNode.constellation);

          ctx.fillStyle = pulseColor;
          ctx.shadowColor = pulseColor;
          ctx.shadowBlur = isHighlighted ? 8 : 3;

          ctx.beginPath();
          ctx.arc(px, py, isHighlighted ? 3.5 : 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // 7. Draw Project Star Nodes
      STELLAR_NODES.forEach((node) => {
        const [nx, ny] = getLiveNodeCoords(node, angle, t);
        const [sx, sy] = toScreen(nx, ny);
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const isMatchingFilter =
          activeConstellation === "all" || node.constellation === activeConstellation;

        const color = getNodeColor(node.constellation);
        const baseRadius = node.r * 5.5 * (zoom < 0.85 ? 0.9 : 1);
        const pulse = Math.sin(t * 2.8 + Math.abs(node.x) * 4) * 0.7;
        const radius = baseRadius + (isHovered || isSelected ? 4 : pulse);

        ctx.save();
        ctx.globalAlpha = isMatchingFilter ? 1 : 0.15;

        // 1. Multi-tier Corona / Halo
        const haloRadius = radius * (isHovered || isSelected ? 3.0 : 1.9);
        const haloGrad = ctx.createRadialGradient(sx, sy, radius * 0.4, sx, sy, haloRadius);
        haloGrad.addColorStop(0, color);
        haloGrad.addColorStop(0.4, isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)");
        haloGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Telescope Diffraction Spikes for prominent stars (r >= 1.2)
        if (node.r >= 1.2 && isMatchingFilter) {
          const spikeLen = radius + 8 + (isHovered || isSelected ? 6 : 0);
          ctx.save();
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(40, 40, 60, 0.3)";
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
          ctx.restore();
        }

        // 3. Orbiting Micro-Moons / Satellites for major node anchors (r >= 1.35)
        if (node.r >= 1.35 && isMatchingFilter) {
          const moonOrbitR = radius + 9;
          const moonAngle = t * 2.2 + node.x * 2;
          const mx = sx + Math.cos(moonAngle) * moonOrbitR;
          const my = sy + Math.sin(moonAngle) * (moonOrbitR * 0.55);

          ctx.save();
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(sx, sy, moonOrbitR, moonOrbitR * 0.55, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = isDark ? "#ffffff" : color;
          ctx.beginPath();
          ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // 4. Hovered / Selected Outer Active Pulse Ring
        if (isHovered || isSelected) {
          const glowPulse = Math.sin(t * 3.5 + node.x) * 4;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.3;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(sx, sy, radius + 8 + glowPulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 5. Inner Star Core
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHovered || isSelected ? 12 : 6;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // 6. Star Center Spark (White Core)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 0.38, 0, Math.PI * 2);
        ctx.fill();

        // 7. Star Label
        if (zoom >= 0.75 || isHovered || isSelected) {
          ctx.font = isHovered || isSelected ? "bold 11px monospace" : "11px monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = isDark
            ? isHovered || isSelected
              ? "#ffffff"
              : "rgba(255, 255, 255, 0.85)"
            : isHovered || isSelected
            ? "#000000"
            : "rgba(30, 30, 45, 0.85)";
          ctx.fillText(node.name, sx, sy + radius + 12);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [pan, zoom, isDark, backgroundStars, hoveredNode, selectedNode, activeConstellation, getNodeColor, getLiveNodeCoords, isDragging]);

  // Raycasting node hit tester with live coordinates & generous mobile touch radius
  const findNodeAt = useCallback(
    (clientX: number, clientY: number): StellarProject | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      const width = rect.width;
      const height = rect.height;
      const baseScale = Math.min(width, height) / 10.5;
      const scale = baseScale * zoom;
      const cx = width / 2 + pan.x;
      const cy = height / 2 + pan.y;

      const angle = currentAngleRef.current;
      const t = currentTimeRef.current;

      // 1. Search in active filtered constellation nodes first
      for (const node of filteredNodes) {
        const [nx, ny] = getLiveNodeCoords(node, angle, t);
        const sx = cx + nx * scale;
        const sy = cy - ny * scale;
        const dist = Math.hypot(mouseX - sx, mouseY - sy);
        // Generous touch hit radius for fingers on mobile & accuracy for pointer
        const hitRadius = Math.max(28, node.r * 7.5 * zoom + 18);

        if (dist <= hitRadius) {
          return node;
        }
      }

      // 2. Fallback: check all nodes if not matched in active filter
      for (const node of STELLAR_NODES) {
        const [nx, ny] = getLiveNodeCoords(node, angle, t);
        const sx = cx + nx * scale;
        const sy = cy - ny * scale;
        const dist = Math.hypot(mouseX - sx, mouseY - sy);
        const hitRadius = Math.max(28, node.r * 7.5 * zoom + 18);

        if (dist <= hitRadius) {
          return node;
        }
      }

      return null;
    },
    [filteredNodes, getLiveNodeCoords, pan.x, pan.y, zoom]
  );

  // -------------------------------------------------------------
  // POINTER INTERACTION (Pan Drag, Multi-touch Pinch & Tap Selection)
  // -------------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 1) {
      const nodeAtTouch = findNodeAt(e.clientX, e.clientY);
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: pan.x,
        panY: pan.y,
        startTime: performance.now(),
        initialNode: nodeAtTouch,
        hasMoved: false,
      };
    } else if (activePointersRef.current.size === 2) {
      // Two fingers: initialize pinch-to-zoom
      const points = Array.from(activePointersRef.current.values());
      pinchStartDistRef.current = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      pinchStartZoomRef.current = zoom;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // 1. Multi-touch Pinch to Zoom
    if (activePointersRef.current.size === 2 && pinchStartDistRef.current) {
      const points = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const ratio = dist / pinchStartDistRef.current;
      const newZoom = Math.min(2.5, Math.max(0.55, pinchStartZoomRef.current * ratio));
      setZoom(newZoom);
      return;
    }

    // 2. Camera Drag / Pan
    if (isDragging && activePointersRef.current.size === 1) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        dragStartRef.current.hasMoved = true;
        if (hoveredNode) {
          setHoveredNode(null);
          setTooltipPos(null);
        }
      }

      if (dragStartRef.current.hasMoved) {
        setPan({
          x: dragStartRef.current.panX + dx,
          y: dragStartRef.current.panY + dy,
        });
      }
      return;
    }

    // 3. Desktop Mouse Hover Raycasting
    if (e.pointerType === "mouse") {
      const found = findNodeAt(e.clientX, e.clientY);
      if (found) {
        setHoveredNode(found);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        canvas.style.cursor = "pointer";
      } else {
        setHoveredNode(null);
        setTooltipPos(null);
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = null;
    }

    if (activePointersRef.current.size === 0) {
      setIsDragging(false);

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const dist = Math.hypot(dx, dy);
      const elapsed = performance.now() - dragStartRef.current.startTime;

      // Tap / Click detection: small motion (< 15px) and fast tap (< 650ms)
      if (dist < 15 && elapsed < 650 && !dragStartRef.current.hasMoved) {
        const hitNode = findNodeAt(e.clientX, e.clientY) || dragStartRef.current.initialNode;
        if (hitNode) {
          setSelectedNode(hitNode);
          setHoveredNode(null);
          setTooltipPos(null);
        }
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size === 0) {
      setIsDragging(false);
    }
  };

  const resetView = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setActiveConstellation("all");
    setSelectedNode(null);
    angleRef.current = 0;
  };

  const nextProject = () => {
    if (!selectedNode) return;
    const currentIndex = STELLAR_NODES.findIndex((n) => n.id === selectedNode.id);
    const nextIndex = (currentIndex + 1) % STELLAR_NODES.length;
    setSelectedNode(STELLAR_NODES[nextIndex]);
  };

  const prevProject = () => {
    if (!selectedNode) return;
    const currentIndex = STELLAR_NODES.findIndex((n) => n.id === selectedNode.id);
    const prevIndex = (currentIndex - 1 + STELLAR_NODES.length) % STELLAR_NODES.length;
    setSelectedNode(STELLAR_NODES[prevIndex]);
  };

  return (
    <section
      id="projects"
      className={`relative pt-20 sm:pt-28 pb-0 border-b overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#0e0e12] border-[#22243a] text-[#e8e8f0]"
          : "bg-[#f5f5f8] border-[#e2e0d8] text-[#111118]"
      }`}
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Selected <span className="font-light text-[#8888a0]">Works</span>
              <span className="text-[#ff6b4a]">.</span>
            </h2>
          </div>

          <p
            className={`text-sm max-w-md ${
              isDark ? "text-[#9999b0]" : "text-gray-600"
            }`}
          >
            Unified Stellarium universe charting 21 Systems & Games, 32 Artworks, and 62 Photographs. Pan across space and select any celestial node to explore.
          </p>
        </div>

        {/* Constellation Filter Tabs (Pills) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            {CONSTELLATIONS.map((c) => {
              const isActive = activeConstellation === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveConstellation(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-[#ff6b4a] border-[#ff6b4a] text-white shadow-md shadow-[#ff6b4a]/20 font-semibold"
                      : isDark
                      ? "bg-[#141522]/80 border-[#222336] text-[#a0a0b8] hover:border-[#ff6b4a]/50 hover:text-white"
                      : "bg-white/80 border-[#dcd9ce] text-[#555566] hover:border-[#ff6b4a]/50 hover:text-black"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Origin Button */}
          <button
            onClick={resetView}
            className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
              isDark
                ? "border-[#222336] text-[#8888a0] hover:text-white hover:border-white/30"
                : "border-[#dcd9ce] text-gray-600 hover:text-black hover:border-black/30"
            }`}
            title="Reset Stellarium Origin"
          >
            <RotateCcw size={12} />
            <span>Reset Origin</span>
          </button>
        </div>
      </div>

      {/* ================= STELLARIUM UNIVERSE CANVAS VIEWPORT ================= */}
      <div
        ref={containerRef}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
        }}
        className="w-full relative h-[680px] sm:h-[760px] lg:h-[860px] select-none overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "none" }}
          className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
        />

        {/* Stellarium HUD Overlay (Top-Left) */}
        <div className="absolute top-6 left-6 sm:left-10 z-10 pointer-events-none flex flex-col gap-1.5 font-mono text-[11px]">
          <div
            className={`px-3 py-1.5 rounded-lg border backdrop-blur-md ${
              isDark
                ? "bg-[#0b0c16]/80 border-[#22243a] text-[#8888a6]"
                : "bg-white/80 border-[#d8d5ca] text-[#555566]"
            }`}
          >
            <span>SCALE: </span>
            <span className="text-[#ff6b4a] font-bold">{(zoom * 100).toFixed(0)}%</span>
            <span className="mx-1.5">|</span>
            <span>SYSTEMS: </span>
            <span className="text-[#00D2B4] font-bold">21</span>
            <span className="mx-1.5">|</span>
            <span>ARTS: </span>
            <span className="text-[#FF7EB6] font-bold">32</span>
            <span className="mx-1.5">|</span>
            <span>PHOTOS: </span>
            <span className="text-[#FFAA5A] font-bold">62</span>
          </div>
        </div>

        {/* Stellarium Controls (Bottom-Left) */}
        <div className="absolute bottom-6 left-6 sm:left-10 z-10 flex flex-wrap items-center gap-2 font-mono">
          <button
            onClick={() => setZoom((z) => Math.min(2.2, z * 1.15))}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? "bg-[#0b0c16]/85 border-[#22243a] text-white hover:border-[#ff6b4a]"
                : "bg-white/85 border-[#d8d5ca] text-black hover:border-[#ff6b4a]"
            }`}
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.65, z * 0.85))}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? "bg-[#0b0c16]/85 border-[#22243a] text-white hover:border-[#ff6b4a]"
                : "bg-white/85 border-[#d8d5ca] text-black hover:border-[#ff6b4a]"
            }`}
            title="Zoom Out"
          >
            −
          </button>
          <button
            onClick={() => setIsOrbiting((prev) => !prev)}
            className={`px-2.5 py-1.5 h-8 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer text-[11px] ${
              isOrbiting
                ? isDark
                  ? "bg-[#ff6b4a]/15 border-[#ff6b4a]/50 text-[#ff6b4a]"
                  : "bg-[#ff6b4a]/10 border-[#ff6b4a]/40 text-[#ff6b4a]"
                : isDark
                ? "bg-[#0b0c16]/85 border-[#22243a] text-[#8888a6] hover:text-white"
                : "bg-white/85 border-[#d8d5ca] text-gray-500 hover:text-black"
            }`}
            title={isOrbiting ? "Pause Solar Rotation" : "Resume Solar Rotation"}
          >
            {isOrbiting ? <Pause size={12} /> : <Play size={12} />}
            <span>{isOrbiting ? "Orbit Active" : "Orbit Paused"}</span>
          </button>
          <span
            className={`text-[11px] px-2.5 py-1.5 h-8 flex items-center rounded-lg border backdrop-blur-md ${
              isDark
                ? "bg-[#0b0c16]/85 border-[#22243a] text-[#77778c]"
                : "bg-white/85 border-[#d8d5ca] text-gray-500"
            }`}
          >
            DRAG TO PAN · TAP / CLICK STAR TO INSPECT
          </span>
        </div>

        {/* Hover Star Tooltip */}
        {hoveredNode && tooltipPos && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3"
            style={{ left: tooltipPos.x, top: tooltipPos.y - 12 }}
          >
            <div
              className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-xl shadow-2xl font-mono text-xs max-w-xs ${
                isDark
                  ? "bg-[#0c0d18]/95 border-[#2a2c44] text-white shadow-black/80"
                  : "bg-white/95 border-[#d0cdc2] text-black shadow-slate-400/40"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-bold text-[#ff6b4a]">
                <Sparkle size={11} />
                <span>{hoveredNode.constellationLabel}</span>
              </div>
              <p className="font-sora font-bold text-sm leading-tight mb-1">
                {hoveredNode.name}
              </p>
              <p className="text-[11px] text-[#8888a0] leading-snug line-clamp-2">
                {hoveredNode.impact}
              </p>
              <div className="mt-2 pt-1.5 border-t border-white/10 text-[10px] text-[#ff6b4a] font-semibold flex items-center justify-between">
                <span>{hoveredNode.isGallery ? "OPEN FOLDER DOSSIER" : hoveredNode.linkLabel || "INSPECT NODE"}</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STELLARIUM DOSSIER SLIDE DRAWER ================= */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className={`absolute top-0 right-0 bottom-0 w-full sm:w-[520px] lg:w-[580px] z-30 border-l backdrop-blur-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between ${
                isDark
                  ? "bg-[#070810]/95 border-[#1e2034] text-white shadow-2xl shadow-black"
                  : "bg-white/95 border-[#d8d5ca] text-[#111118] shadow-2xl shadow-slate-400"
              }`}
            >
              <div>
                {/* Drawer Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: getNodeColor(selectedNode.constellation) }}
                    />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8888a0]">
                      {selectedNode.constellationLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevProject}
                      className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#ff6b4a] transition-colors cursor-pointer"
                      title="Previous Star"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextProject}
                      className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#ff6b4a] transition-colors cursor-pointer"
                      title="Next Star"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-[#ff6b4a] hover:text-white transition-all ml-1 cursor-pointer"
                      title="Close Dossier"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8888a0] mb-2">
                    <span>ROLE: {selectedNode.role}</span>
                    <span>•</span>
                    <span>{selectedNode.period}</span>
                  </div>
                  <h3 className="font-sora font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight mb-2">
                    {selectedNode.name}
                  </h3>
                  <p className="text-sm font-medium text-[#ff6b4a] leading-relaxed">
                    {selectedNode.impact}
                  </p>
                </div>

                {/* Summary Description */}
                <div className="mb-5">
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? "text-[#b0b0c8]" : "text-[#444455]"
                    }`}
                  >
                    {selectedNode.summary}
                  </p>
                </div>

                {/* ================= CONDITION A: CREATIVE GALLERY (INTERACTIVE FOLDER EFFECT ANIMATION) ================= */}
                {selectedNode.isGallery && selectedGalleryItems.length > 0 ? (
                  <div className="my-6">
                    {/* Folder Header Toolbar */}
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#8888a0]">
                      <div className="flex items-center gap-2">
                        <FolderOpen size={15} className="text-[#ff6b4a]" />
                        <span className="uppercase tracking-wider font-semibold text-white">
                          Dossier Binder ({selectedGalleryItems.length} Files)
                        </span>
                      </div>

                      {/* Folder Mode Switcher */}
                      <div className="flex items-center gap-1 bg-black/40 dark:bg-[#141524] p-1 rounded-lg border border-white/10">
                        <button
                          onClick={() => setFolderMode("deck")}
                          className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                            folderMode === "deck"
                              ? "bg-[#ff6b4a] text-white font-semibold"
                              : "text-[#8888a0] hover:text-white"
                          }`}
                          title="Folder Stack Deck"
                        >
                          <Layers size={12} />
                          <span>Stack Deck</span>
                        </button>
                        <button
                          onClick={() => setFolderMode("grid")}
                          className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                            folderMode === "grid"
                              ? "bg-[#ff6b4a] text-white font-semibold"
                              : "text-[#8888a0] hover:text-white"
                          }`}
                          title="Folder Grid View"
                        >
                          <Grid size={12} />
                          <span>All Files</span>
                        </button>
                      </div>
                    </div>

                    {/* Mode 1: 3D Layered Folder Stack Deck */}
                    {folderMode === "deck" ? (
                      <div className="relative pt-2 pb-4">
                        {/* Folder File Scrubber Header */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#8888a0] mb-2 px-1">
                          <span className="text-[#ff6b4a] font-semibold">
                            FILE #{String(folderIndex + 1).padStart(2, "0")} / {selectedGalleryItems.length}
                          </span>
                          <span className="truncate max-w-[200px]">
                            {selectedGalleryItems[folderIndex]?.name}
                          </span>
                        </div>

                        {/* Interactive Folder Stack Deck Box */}
                        <div className="relative h-[340px] sm:h-[380px] w-full flex items-center justify-center">
                          {/* Folder Card Layer 2 (Deep Back) */}
                          {selectedGalleryItems.length > 2 && (
                            <div
                              className="absolute w-[86%] h-[300px] sm:h-[330px] rounded-2xl border border-white/5 bg-[#12131e] opacity-40 transform translate-y-7 scale-90 pointer-events-none shadow-lg"
                              style={{ zIndex: 5 }}
                            />
                          )}

                          {/* Folder Card Layer 1 (Middle Back) */}
                          {selectedGalleryItems.length > 1 && (
                            <div
                              className="absolute w-[92%] h-[310px] sm:h-[340px] rounded-2xl border border-white/10 bg-[#161726] opacity-70 transform translate-y-3.5 scale-95 pointer-events-none shadow-xl"
                              style={{ zIndex: 10 }}
                            />
                          )}

                          {/* Top Active Folder Card (Tactile Flip Animation) */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={folderIndex}
                              initial={{ y: 20, opacity: 0, scale: 0.96 }}
                              animate={{ y: 0, opacity: 1, scale: 1 }}
                              exit={{ y: -20, opacity: 0, scale: 0.96 }}
                              transition={{ type: "spring", stiffness: 350, damping: 26 }}
                              onClick={() => openLightbox(selectedNode.galleryType as "art" | "photography", folderIndex)}
                              className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#1a1b2c] shadow-2xl cursor-pointer group flex flex-col justify-between hover:border-[#ff6b4a] transition-colors"
                              style={{ zIndex: 20 }}
                            >
                              {/* Physical Manila / Carbon Folder Tab Header */}
                              <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 backdrop-blur-md border-b border-white/10">
                                <div className="flex items-center gap-2 text-xs font-mono text-[#ff6b4a]">
                                  <Folder size={14} />
                                  <span className="font-bold uppercase tracking-wider">
                                    DOC_{String(folderIndex + 1).padStart(2, "0")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-white/70">
                                  <span className="hidden sm:inline">CLICK TO ENLARGE</span>
                                  <Maximize2 size={12} className="text-[#ff6b4a]" />
                                </div>
                              </div>

                              {/* Blazing Fast Next.js Optimized Image */}
                              <div className="relative flex-1 w-full overflow-hidden bg-black/50">
                                <Image
                                  src={selectedGalleryItems[folderIndex]?.src || ""}
                                  alt={selectedGalleryItems[folderIndex]?.name || "Creative Artwork"}
                                  fill
                                  priority={folderIndex < 4}
                                  loading={folderIndex < 4 ? "eager" : "lazy"}
                                  sizes="(max-width: 640px) 100vw, 480px"
                                  quality={75}
                                  className="object-contain object-center group-hover:scale-[1.03] transition-transform duration-500"
                                />
                              </div>

                              {/* Folder Card Bottom Caption */}
                              <div className="px-4 py-2.5 bg-black/75 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/90">
                                <span className="truncate">{selectedGalleryItems[folderIndex]?.name}</span>
                                <span className="text-[10px] text-[#ff6b4a] flex items-center gap-1 font-semibold">
                                  <span>View High-Res</span>
                                  <span>↗</span>
                                </span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Folder Deck Navigation Controls */}
                        <div className="flex items-center justify-between mt-3 gap-2">
                          <button
                            onClick={() =>
                              setFolderIndex(
                                (prev) => (prev - 1 + selectedGalleryItems.length) % selectedGalleryItems.length
                              )
                            }
                            className="flex-1 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-[#ff6b4a] hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <ChevronLeft size={15} />
                            <span>Previous File</span>
                          </button>

                          <button
                            onClick={() =>
                              setFolderIndex((prev) => (prev + 1) % selectedGalleryItems.length)
                            }
                            className="flex-1 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-[#ff6b4a] hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Next File</span>
                            <ChevronRight size={15} />
                          </button>
                        </div>

                        {/* Interactive Scrubbing Slider */}
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max={selectedGalleryItems.length - 1}
                            value={folderIndex}
                            onChange={(e) => setFolderIndex(Number(e.target.value))}
                            className="w-full accent-[#ff6b4a] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Mode 2: Expanded Folder Grid (Fan-Out) */
                      <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                        {selectedGalleryItems.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => openLightbox(selectedNode.galleryType as "art" | "photography", idx)}
                            className="group/grid relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#161726] cursor-pointer hover:border-[#ff6b4a] transition-all hover:scale-[1.02] shadow-md flex flex-col justify-between"
                          >
                            {/* Mini Folder Tab */}
                            <div className="absolute top-0 inset-x-0 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-white/80">
                              <span className="text-[#ff6b4a] font-bold">#{idx + 1}</span>
                              <span className="truncate max-w-[80px]">{item.name}</span>
                            </div>

                            <Image
                              src={item.src}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 240px"
                              quality={70}
                              loading="lazy"
                              className="object-cover object-center group-hover/grid:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/grid:opacity-100 transition-opacity flex items-end p-2 z-10">
                              <span className="text-[10px] font-mono text-white line-clamp-1">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ================= CONDITION B: GITHUB / ITCH.IO TECHNICAL DOSSIER ================= */
                  <>
                    {/* Technical Architecture Breakdown */}
                    {selectedNode.architecture && (
                      <div className="mb-5">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#8888a0] font-semibold mb-2.5">
                          Technical Architecture
                        </p>
                        <ul className="space-y-2">
                          {selectedNode.architecture.map((item, idx) => (
                            <li
                              key={idx}
                              className={`text-xs sm:text-sm pl-4 relative leading-relaxed ${
                                isDark ? "text-[#9e9eb4]" : "text-[#555566]"
                              }`}
                            >
                              <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#ff6b4a]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Badges */}
                    {selectedNode.techStack && (
                      <div className="mb-6">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#8888a0] font-semibold mb-2.5">
                          Technologies & Frameworks
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                                isDark
                                  ? "bg-[#141524] border-[#22243a] text-[#e0e0f0]"
                                  : "bg-stone-100 border-stone-200 text-stone-800"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center gap-3">
                {selectedNode.isGallery ? (
                  <button
                    onClick={() => openLightbox(selectedNode.galleryType as "art" | "photography", folderIndex)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#ff6b4a] hover:bg-[#e5593a] text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Maximize2 size={14} />
                    <span>Launch Fullscreen Lightbox ({selectedGalleryItems.length} works)</span>
                  </button>
                ) : (
                  selectedNode.linkUrl && (
                    <a
                      href={selectedNode.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#ff6b4a] hover:bg-[#e5593a] text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      {selectedNode.linkUrl.includes("itch.io") ? (
                        <Gamepad2 size={16} />
                      ) : (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                      )}
                      <span>{selectedNode.linkLabel || "View Project"}</span>
                      <ExternalLink size={13} />
                    </a>
                  )
                )}

                <button
                  onClick={() => setSelectedNode(null)}
                  className={`py-3 px-5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                    isDark
                      ? "border-[#22243a] text-white hover:bg-white/5"
                      : "border-stone-300 text-black hover:bg-black/5"
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {currentLightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Lightbox Header */}
            <div
              className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b4a] font-bold">
                  {lightboxCategory === "art" ? "Art & Illustration" : "Photography & Editing"}
                </span>
                <span className="text-xs font-mono text-white/40">•</span>
                <span className="text-xs font-mono text-white/80">
                  {lightboxIndex + 1} of {currentGalleryItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#ff6b4a] text-white transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Centered High-Res Image Container */}
            <div
              className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] sm:h-[78vh]">
                <Image
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.name}
                  fill
                  quality={90}
                  priority
                  className="object-contain object-center"
                />
              </div>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev - 1 + currentGalleryItems.length) % currentGalleryItems.length : null));
                }}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#ff6b4a] text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 shadow-xl"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % currentGalleryItems.length : null));
                }}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#ff6b4a] text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 shadow-xl"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="flex items-center justify-between w-full max-w-7xl mx-auto z-10 text-xs font-mono text-white/70"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{currentLightboxItem.name}</span>
              <span className="hidden sm:inline text-white/40">
                Use Left / Right arrow keys to navigate · Esc to exit
              </span>
              <a
                href={currentLightboxItem.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b4a] hover:underline flex items-center gap-1"
              >
                <span>View Full Size</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
