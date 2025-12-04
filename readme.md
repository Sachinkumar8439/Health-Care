
# 📌 1. Business Use Case

## **Objective**
Develop a healthcare portal that:
- Supports **wellness tracking** and **preventive care reminders**.
- Helps patients achieve health goals and monitor progress.
- Allows healthcare providers to view patient compliance.
- Ensures security, privacy, and HIPAA‑aligned design.
- Works seamlessly on web with responsive design.

## **Problem Focus**
- Rising need for **preventive care awareness**.
- Empowering users to take control of wellness habits.
- Providing doctors a quick overview of patient compliance.

## **Users**
- **Patients**  
- **Healthcare Providers**  
- **General Public (view-only health info)**  

---

# 🎯 2. MVP Scope 

The MVP must contain:

### **Core Deliverables**
- Functional authentication (patients & providers)
- Patient dashboard → steps, sleep,calories, reminders,active time, health tip
- Provider dashboard → patient list + compliance overview
- Profile management for patients
- Public health information page
- Basic goal tracker for patients
- Minimal CI/CD setup
- Basic security (JWT, hashing, env vars)

---

# 🧩 3. Key Features to Implement

## **1. Authentication**
- Login/Registration for patients + providers  
- Session management using JWT  
- Password hashing  
- Role-based routing  

## **2. Patient Dashboard**
- Show steps taken  
- Sleep hours  
- Activity time  
- Upcoming preventive reminders  
- Health Tip of the Day  

## **3. Provider View**
- List of assigned patients  
- See compliance %  
- Identify missed reminders  

## **4. Profile Management**
- Age, allergies, medications, general info  
- Edit profile  
- Update daily goals  

## **5. Goal Tracker**
- Log daily steps  
- Log sleep  
- Daily compliance score  

## **6. Public Health Page**
- Flu info  
- COVID guidelines  
- Seasonal alerts  
- Mental health awareness  

## **7. Security Measures**
- Consent checkbox on registration  
- Logging sensitive user actions  
- Basic HIPAA-aligned design  

---

# 🏗️ 4. System Architecture (Design Section)

```
   ┌─────────────────┐          ┌──────────────────────┐
   │     Frontend    │  REST    │        Backend        │
   │   (Next.js)     │ ───────► │ (Node.js + Express)   │
   └─────────────────┘          └───────────┬──────────┘
                                            │
                                            ▼
                              ┌──────────────────────────┐
                              │      MongoDB Atlas       │
                              └──────────────────────────┘
```

### **Design Highlights**
- **Separation of layers:** frontend, backend, DB  
- **Stateless API** with JSON  
- **Cloud-native** deployment  
- **Environment-var driven configuration**  
- **CI/CD** for automated build & deploy  

---

# 🧱 5. Technical Requirements

## **Frontend**
- React.js / Next.js  
- CSS Modules or SASS  

## **Backend**
- Node.js + Express  
- REST API  
- JSON-based communication  

## **Database**
- NoSQL → MongoDB Atlas  
- Collections: users, goals, compliance, health tips  

## **API**
- RESTful  
- Secured with JWT  

## **Cloud Deployment**
- Frontend → Vercel  
- Backend → Render / Railway / EC2  
- DB → MongoDB Atlas  

## **CI/CD**
- GitHub Actions  
- Auto deploy on push  

---

# 🧩 6. Detailed API Design

## **Auth APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new patient/provider |
| POST | `/auth/login` | JWT login |

## **Patient**
| GET | `/patient/dashboard` | Fetch dashboard |
| POST | `/patient/log` | Log steps/sleep/activity |
| PUT | `/patient/profile` | Update profile |

## **Provider**
| GET | `/provider/patients` | List patients |
| GET | `/provider/patient/:id` | Compliance details |

## **Public**
| GET | `/public/health-info` | General health articles |
| GET | `/public/tip` | Daily tip |

---

# 🗄️ 7. Database Schema (Design Document)

## Users Collection
```json
{
  "_id": "",
  "role": "patient or provider",
  "name": "",
  "email": "",
  "passwordHash": "",
  "age": 0,
  "allergies": "",
  "medications": "",
  "createdAt": ""
}
```

## Goals Collection
```json
{
  "userId": "",
  "dailyStepsTarget": 8000,
  "dailySleepTarget": 8,
  "waterIntakeTarget": 2000
}
```

## Compliance Collection
```json
{
  "userId": "",
  "date": "",
  "stepsTaken": 0,
  "sleepHours": 0,
  "waterIntake": 0,
  "complianceScore": 0
}
```

## Tips Collection
```json
{
  "content": "",
  "type": "",
  "createdAt": ""
}
```

---

# 🧭 8. User Flow (Design)

## **Patient User Flow**
```
Register → Login → Dashboard → Log Activity → Track Goals → View Reminders → Update Profile
```

## **Provider User Flow**
```
Login → Provider Dashboard → View Patient List → Open Patient → Check Compliance
```

## **Public User Flow**
```
Homepage → Health Articles / Info Pages
```

---

# 🧪 9. DevOps & Deployment Design

## **CI/CD**
- GitHub Actions pipeline  
- Auto deploy on push  
- Unit tests triggered  

## **Infrastructure**
- Vercel → frontend hosting  
- Render → backend hosting  
- MongoDB Atlas → database  

## **Configuration**
- `.env` file containing:
```
MONGO_URI=
JWT_SECRET=
NEXT_PUBLIC_API_URL=
```

---

# 🔐 10. Security (HIPAA-aligned design)

- All passwords hashed → bcrypt  
- Sensitive info never stored in plain text  
- HTTPS enforced  
- Token expiration for sessions  
- Role-based access control  
- Limited health data stored (MVP-safe)  
- Consent checkbox for data usage  

---

# 🧱 11. UI/UX Design (Mock Designs Explanation)

Based on the provided mockups:

### **Login Page**
- Simple login form  
- Email + Password  
- Link to register  

### **Home / Public Page**
- Navigation: Home, Health Topics, Services, Contact  
- Cards for seasonal health content  
- COVID info, flu prevention, mental health  

### **Patient Dashboard**
- Header with greeting (“Welcome, David”)  
- Components:
  - **Steps** progress bar  
  - **Sleep** tracker  
  - **Active time**  
  - **Preventive reminders** (e.g., blood test due)  
  - **Health Tip of the Day**

### **Provider Dashboard**
- List of patients  
- Compliance indicator  
- Alerts  

---

# 📦 12. Folder Structure

```
healthcare-portal/
│
├── README.md
├── .gitignore
├── .env.example
│
├── backend/
│   ├── package.json
│   ├── .env           (not committed)
│   ├── src/
│   │   ├── server.js
│   │   ├── config.js
│   │   ├── utils/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Goal.js
│   │   │   ├── ActivityLog.js
│   │   │   ├── Reminder.js
│   │   │   └── Tip.js (optional)
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── patientController.js
│   │   │   ├── providerController.js
│   │   │   └── publicController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── patient.js
│   │   │   ├── provider.js
│   │   │   └── public.js
│   │   └── utils/
│   │       └── computeCompliance.js (optional helper)
│   │
│   └── tests/ (optional)
│
├── frontend/
│   ├── package.json
│   ├── .env.local  (not committed)
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.js               
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   │   ├── dashboard.js
│   │   │   └── provider/
│   │   │       └── index.js
│   │   ├── components/
│   │   │   ├── Layout.js
│   │   │   ├── Header.js
│   │   │   └── DashboardWidgets/
│   │   │       ├── StepsCard.js
│   │   │       ├── SleepCard.js
│   │   │       ├── ActivityCard.js
│   │   │       └── ReminderCard.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── dashboard.css
│   │   └── utils/
│   │       └── api.js
│   │
│   └── tests/ (optional)
│
└── .github/
    └── workflows/
        └── ci.yml   (optional: GitHub Actions)

```