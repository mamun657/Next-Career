# NextCareer – AI-Powered Career Companion (SDG-8)

A hackathon-ready fullstack web app aligned with **UN SDG 8: Decent Work & Youth Employment**. Helps youth and job seekers with skill-based job matching, skill gap analysis, career roadmaps, and a CareerBot assistant.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT
- **AI:** Rule-based logic (Phase 1), LLM-ready for Phase 2

## Project Structure

```
nextcareer/
├── backend/
│   ├── server.js
│   ├── config/ (db.js, env.js)
│   ├── models/ (User, Job, Resource, Roadmap)
│   ├── routes/ (auth, user, job, resource, ai)
│   ├── controllers/
│   ├── middleware/ (auth)
│   ├── utils/ (matching, skillExtractor, roadmapGenerator, careerBot)
│   └── seed/ (jobs.seed.js, resources.seed.js, run-seed.js)
├── frontend/
│   └── src/
│       ├── pages/ (Login, Register, Dashboard, Jobs, Resources, Profile, RoadmapView)
│       ├── components/ (Layout, CareerBot, RoadmapCard)
│       ├── services/api.js
│       └── context/AuthContext.jsx
└── README.md
```

## Setup

### 1. Backend

```bash
cd nextcareer/backend
# Copy env.example.txt to .env and set MONGODB_URI, JWT_SECRET
npm install
npm run seed   # Seed jobs and resources
npm run dev    # Start on http://localhost:5000
```

### 2. Frontend

```bash
cd nextcareer/frontend
npm install
npm run dev    # Start on http://localhost:5173
```

### 3. Environment

Create `backend/.env`:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
PORT=5000
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` should be host-only. The frontend app automatically appends `/api`.

## Render Deployment Checklist

### Backend (Render Web Service)

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Required env vars:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=<your-atlas-uri>
JWT_SECRET=<strong-random-secret>
GROQ_API_KEY=<optional-for-careerbot>
CORS_ORIGINS=https://<your-frontend>.onrender.com
```

Notes:

- `CORS_ORIGINS` supports comma-separated values and wildcard patterns (example: `https://*.example.com`).
- You can also use `FRONTEND_URL` or `FRONTEND_URLS` if preferred.

### Frontend (Render Static Site)

Build command:

```bash
npm install && npm run build
```

Publish directory:

```bash
dist
```

Required env var:

```
VITE_API_URL=https://<your-backend>.onrender.com
```

If `VITE_API_URL` is not set, the app falls back to same-origin `/api`.
This only works if your frontend host reverse-proxies `/api` to backend.

### Production API Validation

1. Open `https://<backend>.onrender.com/api/health` and ensure `{ "status": "ok" }` is returned.
2. Confirm register/login works from frontend production domain.
3. Confirm protected calls like `/api/user/profile` work with JWT token.
4. Confirm no CORS errors in browser network console.

## Features

- **Auth:** Register, Login, JWT
- **Profile:** Name, education, experience level, preferred track, skills (manual + CV extract), interests
- **Jobs:** 20 seeded jobs, filters, rule-based match %, missing skills, apply links
- **Resources:** 20 seeded learning resources, filters by skill/cost
- **Matching:** Transparent scoring (skills 50%, experience 25%, track 25%)
- **Skill extraction:** Keyword-based from CV text; editable before merge
- **Career roadmap:** Target role + 3/6 months; step-by-step plan, copyable
- **CareerBot:** Career Q&A (role fit, learn next, internship prep)

## SDG-8 Impact

- Targets youth and entry-level job seekers
- Skill gap visibility and learning recommendations
- Structured roadmaps for career progression
- Transparent, explainable logic (no black-box AI)
