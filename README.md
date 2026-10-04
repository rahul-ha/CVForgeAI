# CVForgeAI 🤖📄

## AI-Powered Resume Analysis & Optimization Platform

CVForgeAI is an AI-powered web application designed to help job seekers analyze and improve their resumes based on specific job descriptions.

The application combines resume parsing, ATS-focused evaluation, keyword and skill analysis, and AI-generated suggestions to help users create more job-relevant resumes.

## 🚀 Live Demo

👉 **CVForgeAI:** https://cv-forge-ai-frontend.vercel.app/dashboard

---

## 📌 Application Overview

CVForgeAI allows users to:

- Upload their resume
- Parse and extract important resume information
- Enter a target Job Description
- Analyze resume content against job requirements
- Identify relevant skills and keywords
- Perform ATS-focused resume evaluation
- Get AI-powered improvement suggestions
- View analysis results through an interactive dashboard

The goal is to provide a practical platform that helps users understand how well their resume matches a particular job opportunity.

---

## ✨ Features

### 📄 Resume Upload & Parsing
- Upload resume documents
- Extract important information from the resume
- Process resume content for further analysis

### 📊 Resume Analysis
- Analyze resume content based on the provided job description
- Identify relevant skills and keywords
- Highlight areas that can be improved

### 🤖 AI-Powered Analysis
- Uses Google Gemini API for AI-based resume analysis
- Generates personalized suggestions
- Helps improve resume relevance and content

### 🎯 ATS-Focused Evaluation
- Evaluates resume content with ATS-oriented criteria
- Checks important keywords and skills
- Helps improve job-specific resume alignment

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected backend routes

### 🌐 Responsive Web Application
- React-based frontend
- Interactive dashboard
- Backend REST API communication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)

### AI Integration
- Google Gemini API

### Deployment
- Vercel for frontend deployment

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │     Dashboard       │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Backend        │
                    └──────┬────────┬─────┘
                           │        │
                 ┌─────────┘        └──────────┐
                 ▼                              ▼
        ┌─────────────────┐            ┌─────────────────┐
        │    MongoDB      │            │  Gemini API     │
        │   Database      │            │   AI Analysis   │
        └─────────────────┘            └─────────────────┘



```

---

## 🔄 Application Flow

```text
User Registration / Login
          ↓
     JWT Authentication
          ↓
     Upload Resume
          ↓
    Resume Processing
          ↓
   Extract Resume Data
          ↓
 Enter Target Job Description
          ↓
 Backend Processes Resume + JD
          ↓
 Skill & Keyword Analysis
          ↓
    Gemini AI Analysis
          ↓
 ATS-Focused Evaluation
          ↓
 AI-Generated Suggestions
          ↓
 Display Results on Dashboard
```
        
