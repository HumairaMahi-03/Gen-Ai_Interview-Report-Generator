# 🤖 AI Interview Report Generator

An AI-powered web application that analyzes a candidate's **Resume**, **Self Description**, and **Job Description** to generate a personalized interview preparation report.

The application uses Generative AI to evaluate the candidate's profile and provide:

- 🎯 Job Match Score
- 💻 Technical Interview Questions
- 🗣️ Behavioral Interview Questions
- 📉 Skill Gap Analysis
- 📅 Personalized Preparation Plan

---

## 🚀 Features

### 📄 Resume Upload

Users can upload their resume in PDF format. The application extracts the text from the PDF and uses it for candidate analysis.

### 🤖 AI-Powered Interview Analysis

The AI analyzes:

- Candidate Resume
- Self Description
- Job Description

Based on this information, it generates a structured interview report.

### 🎯 Match Score

The application calculates a score between `0-100` indicating how well the candidate matches the job requirements.

### 💻 Technical Questions

Generates personalized technical interview questions based on:

- Candidate skills
- Previous projects
- Job requirements
- Technologies mentioned in the resume

Each question includes:

- Question
- Interviewer's intention
- Suggested approach for answering

### 🗣️ Behavioral Questions

Generates behavioral interview questions to evaluate:

- Problem-solving
- Teamwork
- Communication
- Real-world experience

### 📉 Skill Gap Analysis

Identifies skills that the candidate may need to improve.

Each skill gap includes a severity level:

- Low
- Medium
- High

### 📅 Preparation Plan

Generates a day-wise interview preparation plan containing:

- Day number
- Focus area
- Tasks to complete

### 🔐 Authentication

Users can generate and access only their own interview reports through authentication and authorization.

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Axios
- SCSS
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT Authentication
- pdf-parse

## AI

- Google Generative AI
- Gemini API
- Zod

---

# 📂 Project Structure

```text
GENAI-Project
│
├── Backend
│   ├── src
│   │   ├── config
│   │   │   └── database.js
│   │   │
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   │
│   │   ├── models
│   │   │   ├── blacklist.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   │
│   │   ├── services
│   │   │   ├── ai.service.js
│   │   │   └── temp.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── Frontend
    ├── node_modules
    ├── public
    └── src
        ├── features
        │   ├── auth
        │   │   ├── components
        │   │   │   └── (auth-related components)
        │   │   ├── hooks
        │   │   │   └── useAuth.js
        │   │   ├── pages
        │   │   │   ├── Login.jsx
        │   │   │   └── Register.jsx
        │   │   ├── services
        │   │   │   └── auth.api.js
        │   │   ├── auth.context.jsx
        │   │   └── auth.form.scss
        │   │
        │   └── interview
        │       ├── hooks
        │       │   └── useInterview.js
        │       ├── pages
        │       │   ├── Home.jsx
        │       │   └── Interview.jsx
        │       ├── services
        │       │   └── interview.api.js
        │       ├── interview.context.jsx
        │       └── interview.scss
        │
        ├── style
        │   └── home.scss
        │
        ├── App.jsx
        ├── app.route.jsx
        ├── Protected.jsx
        └── main.jsx
