# SkillGap AI 🎯

An AI-powered career tool that analyzes your resume against a job description to identify skill gaps, suggest improvements, and generate personalized learning roadmaps.

## 🚀 Features

- **Skill Gap Analysis** — Upload your resume & paste a JD to get an instant match score
- **AI Resume Suggestions** — Smart bullet-point improvements powered by NLP
- **Learning Roadmap** — Personalized 30/60/90-day plans for missing skills
- **Job Matches** — Find roles that fit your current profile
- **Resume Compare** — Side-by-side comparison with competitor profiles
- **AI Chatbot** — Career assistant that answers questions based on your analysis
- **PDF Export** — Download your full analysis as a polished PDF
- **Dark / Light Theme** — Full theme support with persistent preference

---

## 🗂️ Project Structure

```
SkillGap-AI/
├── SkillGapAI-Frontend/        # Main frontend (HTML/CSS/JS)
│   ├── index.html              # Main app (skill gap analyzer)
│   ├── jobs.html               # Job matches page
│   ├── compare.html            # Resume compare tool
│   ├── roadmap.html            # Learning roadmap
│   ├── dashboard.html          # User dashboard
│   ├── history.html            # Analysis history
│   ├── settings.html           # User settings
│   ├── about.html              # About page
│   ├── auth.html               # Login / Register
│   ├── landing.html            # Landing page
│   ├── css/
│   │   ├── styles.css          # Main stylesheet
│   │   ├── features.css        # Feature-specific styles
│   │   ├── chatbot.css         # Chatbot widget styles
│   │   └── landing.css         # Landing page styles
│   └── js/
│       ├── app.js              # Core app logic (skill analysis engine)
│       ├── auth.js             # Authentication logic
│       ├── chatbot.js          # AI chatbot widget
│       ├── compare.js          # Resume comparison logic
│       ├── pdf-export.js       # PDF export functionality
│       ├── resume-suggestions.js # AI resume improvement engine
│       ├── settings.js         # Settings page logic
│       ├── theme-loader.js     # Theme initialization
│       ├── theme-toggle.js     # Theme toggle handler
│       └── user-dashboard.js   # Dashboard logic
│
├── skillgap-ai/
│   └── backend/                # Python Flask backend (NLP engine)
│       ├── app.py              # Flask API server
│       ├── resume_skill_extractor.py   # NLP skill extraction
│       ├── verify_skills.py    # Skill verification utilities
│       └── requirements.txt    # Python dependencies
│
├── server.js                   # Node.js/Express backend (chatbot API)
├── package.json                # Node.js dependencies
├── start_skillgap_backend.bat  # Windows quick-start for Python backend
└── .env.example                # Environment variable template
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **Python** 3.9+ → [python.org](https://python.org)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/skillgap-ai.git
cd skillgap-ai
```

---

### 2️⃣ Set Up the Python Backend (NLP Engine)

```bash
# Create and activate a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r skillgap-ai/backend/requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm

# Start the Flask server (runs on port 5000)
python skillgap-ai/backend/app.py
```

> **Windows shortcut:** Double-click `start_skillgap_backend.bat`

---

### 3️⃣ Set Up the Node.js Backend (Chatbot API)

```bash
# Install dependencies
npm install

# Start the Node.js server (runs on port 3000)
npm start
```

---

### 4️⃣ Open the Frontend

Open `SkillGapAI-Frontend/index.html` directly in your browser, **or** serve it with a local server:

```bash
# Using Python's built-in server (from the project root)
python -m http.server 8080
# Then visit: http://localhost:8080/SkillGapAI-Frontend/index.html

# Or using VS Code Live Server extension
```

---

## 🔌 API Endpoints

### Python Flask Backend (`http://localhost:5000`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/extract` | Upload resume + JD text → returns skill analysis JSON |

### Node.js Backend (`http://localhost:3000`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chatbot` | Send message + analysis context → returns AI reply |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Chatbot Backend | Node.js, Express |
| NLP Backend | Python, Flask, spaCy, sentence-transformers |
| PDF Export | jsPDF, html2canvas |
| Charts | Chart.js |

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
