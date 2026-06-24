
# VoyageVerse 🌍✈️

A full-stack travel booking and discovery web application built with the **MERN stack** — featuring live weather forecasts, trip booking, wishlist management, user reviews, and secure JWT-based authentication.

---

## Features

- 🔐 **User Authentication** — Register, Sign In, and Logout with JWT stored in HTTP-only cookies for secure, stateless sessions
- 📋 **Full Booking Management** — Create, view, edit, and cancel trip bookings with a clean dashboard UI
- ❤️ **Wishlist System** — Save and manage favourite destinations to a personal wishlist
- ⭐ **Reviews & Ratings** — Leave and browse reviews for destinations
- 🌦️ **Live Weather Widget** — Real-time weather data for top destinations powered by OpenWeatherMap API
- 📱 **Responsive Design** — Fully mobile-friendly layout that adapts across all screen sizes
- 🛡️ **Protected API Routes** — All booking, wishlist, and review routes require authentication

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router DOM, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| External API | OpenWeatherMap REST API |
| Styling | CSS Custom Properties, Inter font |

---

## Project Structure

```
voyageverse-project-2/
├── client/                        # React frontend (Vite)
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global auth state
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── WeatherWidget.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Bookings, Wishlist, Reviews
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── api.js                 # Centralized API fetch helper
│   │   ├── App.jsx                # Routes setup
│   │   ├── main.jsx               # React entry point
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js             # Vite + proxy config
│   └── package.json
│
├── config/
│   └── db.js                      # MongoDB connection
├── middleware/
│   └── auth.js                    # JWT protect middleware
├── models/
│   ├── User.js
│   ├── Booking.js
│   ├── Review.js
│   └── Wishlist.js
├── routes/
│   ├── auth.js                    # /api/auth
│   ├── bookings.js                # /api/bookings
│   ├── reviews.js                 # /api/reviews
│   ├── wishlist.js                # /api/wishlist
│   └── weather.js                 # /api/weather
├── server.js                      # Express entry point
├── .env                           # Environment variables (not committed)
└── package.json
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd voyageverse-project-2
```

### 2. Set up environment variables

Create a `.env` file in the **root** directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
JWT_SECRET=<your-strong-random-secret>
OPENWEATHER_API_KEY=<your-openweathermap-api-key>
```
 
> On MongoDB Atlas → Network Access → set IP to `0.0.0.0/0` to allow access from anywhere.

### 3. Install dependencies for both backend and frontend

```bash
# In root folder (backend)
npm install

# In client folder (frontend)
cd client
npm install
cd ..
```

### 4. Run the app — two terminals at the same time

**Terminal 1 — Backend** (from root folder):
```bash
npm run dev
```
You should see:
```
Server running on port 5000 in development mode
MongoDB Connected...
```

**Terminal 2 — Frontend** (from client folder):
```bash
cd client
npm run dev
```
You should see:
```
VITE ready on http://localhost:5173
```

### 5. Open the app

Visit **http://localhost:5173** in your browser.

> `localhost:5000` → backend API only  
> `localhost:5173` → your React frontend ✅

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Logout (clears cookie) |
| GET | `/api/auth/me` | Get the currently logged-in user |

### Bookings 🔒 (`/api/bookings`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/bookings` | Get all bookings for current user |
| POST | `/api/bookings` | Create a new booking |
| PUT | `/api/bookings/:id` | Update a booking |
| DELETE | `/api/bookings/:id` | Cancel a booking |

### Wishlist 🔒 (`/api/wishlist`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/wishlist` | Get current user's wishlist |
| POST | `/api/wishlist` | Add a destination |
| DELETE | `/api/wishlist/:id` | Remove a destination |

### Reviews 🔒 (`/api/reviews`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews` | Post a new review |
| DELETE | `/api/reviews/:id` | Delete a review |

### Weather (`/api/weather`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/weather` | Fetch live weather for a city |

---

## Common Issues

**MongoDB connection error**
- Go to Atlas → Network Access → set IP to `0.0.0.0/0`
- Make sure `MONGO_URI` in `.env` ends with `/voyageverse`

**Signup / Login not working**
- Make sure both terminals are running simultaneously
- Open the app at `http://localhost:5173`, not `localhost:5000`

---

## Author

**Harshitha** — VoyageVerse Travel App
