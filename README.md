# SAEConnect

### Sinhgad Academy Experience Hub

> **Real Experiences. Shared Knowledge. Better Preparation.**

SAEConnect is an institution-specific placement experience and knowledge-sharing platform developed exclusively for students, alumni, and the academic community of **Sinhgad Academy of Engineering, Kondhwa, Pune**.

The platform helps users share and explore real placement experiences, interview questions, preparation strategies, challenges, mistakes, placement outcomes, and useful advice. It aims to preserve placement knowledge across academic batches and make it easily accessible to students preparing for future placement drives.

---

## 📌 Project Overview

Placement preparation often depends on information shared informally through seniors, alumni, classmates, WhatsApp groups, Telegram, social media, and personal conversations. Such information may be scattered, difficult to search, and unavailable to future batches.

SAEConnect provides a centralized platform where placement-related experiences can be stored, searched, discussed, and analyzed.

Users can explore experiences based on:

* Company
* Job role
* Branch/department
* Academic year
* Interview round
* Technical topic
* Difficulty level
* Placement outcome

The platform supports both successful and unsuccessful placement journeys, including selected, rejected, waitlisted, interview-completed, and result-awaited experiences.

---

## 🎯 Objectives

* To develop a placement experience platform specifically for Sinhgad Academy of Engineering.
* To allow students and alumni to share real placement experiences.
* To preserve placement knowledge for future academic batches.
* To help students search experiences by company, role, year, round, and topic.
* To support peer-to-peer knowledge sharing.
* To provide a platform for questions, answers, comments, bookmarks, and helpful votes.
* To provide company-wise and placement-related insights.
* To explore optional AI/NLP-based experience analysis and recommendations.
* To reduce the information gap between students, seniors, and alumni.

---

## ✨ Key Features

### 👤 User Authentication

* Student registration and login
* Alumni registration and login
* Role-based access
* Secure authentication
* Profile management
* Password reset functionality

### 🎓 Student Features

* Browse placement experiences
* Search and filter experiences
* Submit placement experiences
* Share selected, rejected, waitlisted, and result-awaited experiences
* Ask placement-related questions
* Comment on experiences
* Bookmark useful experiences
* Upvote helpful content
* View company details
* Explore placement insights

### 🧑‍🎓 Alumni Features

* Share placement experiences
* Provide preparation advice
* Answer student questions
* Share interview questions and strategies
* Contribute knowledge for future batches
* Build a verified alumni profile

### 🛠️ Platform Admin Features

The platform Admin will be managed by the **project team or authorized platform administrators**.

Admin responsibilities include:

* Manage users
* Approve or reject submitted experiences
* Moderate reported content
* Manage companies
* Manage categories and topics
* Verify alumni profiles
* Handle user reports
* Monitor platform activity
* View platform analytics

### 🔍 Experience Repository

Each placement experience may include:

* Company name
* Job role
* Placement year
* On-campus/off-campus details
* Eligible branch
* Number of interview rounds
* Aptitude round
* Coding round
* Technical interview
* Managerial interview
* HR interview
* Questions asked
* Preparation strategy
* Resources used
* Difficulties faced
* Mistakes made
* Advice for future candidates
* Placement outcome

### 💬 Community Interaction

* Ask & Share section
* Questions and answers
* Comments and replies
* Helpful votes/upvotes
* Bookmarks
* User reports
* Notifications
* Peer-to-peer interaction

### 📊 Insights and Analytics

The platform may provide insights such as:

* Popular companies
* Frequently discussed interview topics
* Common interview rounds
* Branch-wise experience distribution
* Year-wise experience trends
* Difficulty patterns
* Selection and rejection distributions
* Commonly asked technical topics
* Company-wise experience summaries
* Contribution statistics

> Analytics will represent patterns in submitted or approved data and should not be treated as universal placement statistics.

### 🤖 Optional AI/NLP Features

Advanced AI/NLP features may include:

* Keyword extraction
* Topic identification
* Interview-round classification
* Difficulty detection
* Experience summarization
* Automatic tagging
* Similar experience recommendations
* Preparation insights

AI/NLP functionality may be implemented as an advanced module depending on project scope and available data.

---

## 🏗️ System Architecture

```text
Users
│
├── Student
├── Alumni
├── Faculty (Optional)
└── Platform Admin
        │
        ▼
Frontend Web Application
React.js + TypeScript + Tailwind CSS
        │
        ▼
Supabase
├── Authentication
├── PostgreSQL Database
├── Storage
└── Row Level Security
        │
        ▼
Placement Experience Repository
        │
        ├── Search and Filters
        ├── Community Interaction
        ├── Bookmarks and Upvotes
        ├── Notifications
        └── Insights and Analytics
                │
                ▼
       Optional AI/NLP Module
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Router
* Lucide React

### Backend and Database

* Supabase
* PostgreSQL
* Supabase Authentication
* Supabase Storage
* Supabase Row Level Security
* Supabase JavaScript Client

### Forms and Validation

* React Hook Form
* Zod

### Data Visualization

* Recharts

### Optional AI/NLP

* Python
* FastAPI
* spaCy
* scikit-learn
* Transformers

### Development and Deployment

* Git
* GitHub
* Visual Studio Code
* Vercel

---

## 📂 Proposed Project Structure

```text
SAEConnect/
│
├── public/
│   ├── images/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🗃️ Proposed Database Tables

The following tables may be used in Supabase:

* `profiles`
* `companies`
* `experiences`
* `interview_rounds`
* `questions`
* `experience_questions`
* `comments`
* `bookmarks`
* `votes`
* `reports`
* `notifications`
* `topics`
* `experience_tags`
* `follows`
* `analytics`

### Example Profile Roles

```text
student
alumni
faculty
admin
```

### Example Verification Status

```text
pending
verified
rejected
```

Alumni may register without a PRN or old student ID. Their verification status can initially remain **Pending** until verified by the platform Admin.

---

## 🔄 Working Flow

```text
1. User registers or logs in
        ↓
2. User selects a role
        ↓
3. User creates or completes a profile
        ↓
4. User submits or explores experiences
        ↓
5. Submitted content is reviewed by Admin
        ↓
6. Approved experiences are stored in the repository
        ↓
7. Users search and filter experiences
        ↓
8. Users ask questions, comment, bookmark, and upvote
        ↓
9. Analytics and optional AI/NLP generate insights
        ↓
10. Placement knowledge is preserved for future batches
```

---

## 🔐 Privacy and Data Protection

SAEConnect will aim to protect user information and maintain a safe knowledge-sharing environment.

The platform should avoid publicly displaying sensitive personal information such as:

* PRN
* Phone number
* Personal documents
* Personal email address
* Private placement records
* Confidential company information

Official college placement data may be included only with appropriate permission from the Training and Placement Cell. Such data should preferably be aggregated or anonymized.

---

## 🏫 Official College Placement Data

With permission from the Training and Placement Cell, the platform may include verified and aggregated information such as:

* Company names
* Recruitment year
* Job roles
* Eligible branches
* Number of students placed
* Placement statistics
* Package information
* On-campus/off-campus details
* Recruitment process information

The platform will not require personal student placement data for its basic functioning.

---

## 👥 Project Team

| Student ID | Team Member            |
| ---------- | ---------------------- |
| COBB33     | Shraddha Keshao Bonde  |
| COBB32     | Saniya Kiran Gaikwad   |
| COBB35     | Vaishnavi Vijay Chavan |
| COBB36     | Monika Laxman Yedave   |

### Project Guide

**Prof. T. B. Faruki**

### Department

**Department of Computer Engineering**
**STES’s Sinhgad Academy of Engineering, Kondhwa, Pune**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/saeconnect.git
```

### 2. Navigate to the Project Folder

```bash
cd saeconnect
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit secret keys or private credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

### 6. Build the Project

```bash
npm run build
```

### 7. Preview the Production Build

```bash
npm run preview
```

---

## 🧪 Future Enhancements

* Advanced semantic search
* AI-generated experience summaries
* Similar experience recommendations
* Automated topic and difficulty tagging
* Preparation roadmaps
* Company-following functionality
* Email notifications
* Mobile application
* College-approved placement statistics
* Alumni verification through official college records
* Integration with approved college placement systems

---

## 📌 Project Scope

SAEConnect is designed as a **college-specific placement experience and knowledge-sharing platform**.

It is not a job portal and does not directly provide jobs or recruitment services. Its main purpose is to help users:

* Share placement experiences
* Learn from real interview journeys
* Ask and answer questions
* Preserve knowledge across batches
* Explore company and interview insights
* Prepare more effectively

---

## 📄 License

This project is developed for academic and educational purposes by the project team of the Department of Computer Engineering, STES’s Sinhgad Academy of Engineering, Kondhwa, Pune.
