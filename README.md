# VoyageVerse 🌍✈️

A full-stack travel booking and discovery web application built with **Node.js**, **Express**, **MongoDB**, and vanilla **HTML/CSS/JavaScript** — featuring live weather, trip wishlist management, user reviews, and secure JWT-based authentication.

---

## Features

- 🔐 **User Authentication** — Register, Sign In, and Logout with JWT stored in HTTP-only cookies for secure, stateless sessions
- 📋 **Full Booking Management** — Create, view, edit, and cancel trip bookings with a clean dashboard UI
- ❤️ **Wishlist System** — Save and manage favourite destinations to a personal wishlist
- ⭐ **Reviews & Ratings** — Leave and browse reviews for destinations
- 🌦️ **Live Weather Widget** — Real-time weather data for top destinations powered by OpenWeatherMap API
- 📱 **Responsive Design** — Fully mobile-friendly layout that adapts across all screen sizes
- 🔒 **Password Strength Indicator** — Real-time feedback on registration page
- 🛡️ **Protected API Routes** — All booking, wishlist, and review routes require authentication

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| External API | OpenWeatherMap REST API |
| Styling | Poppins font, CSS Custom Properties |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) — local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd voyageverse-project-2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/voyageverse
JWT_SECRET=<your-strong-random-secret>
OPENWEATHER_API_KEY=<your-openweathermap-api-key>
```

> **IMPORTANT:** Make sure your `MONGO_URI` ends with a database name (e.g. `/voyageverse`). Without it, Mongoose may fail to connect properly.

- **MONGO_URI** — Get this from MongoDB Atlas → Connect → Drivers, or use `mongodb://localhost:27017/voyageverse` for a local instance.
- **JWT_SECRET** — Generate one via: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- **OPENWEATHER_API_KEY** — Get a free key from [openweathermap.org](https://openweathermap.org/api)

### 4. Run the development server
```bash
npm run dev
```

The app will be available at **http://localhost:5000**

> **Note:** If you're running your frontend separately (e.g. with VS Code Live Server on port 5500), make sure your `fetch()` calls use the full URL: `http://localhost:5000/api/...` — not relative paths.

---

## Project Structure

```
voyageverse-project-2/
├── config/
│   └── db.js                # MongoDB connection setup
├── middleware/
│   └── auth.js              # JWT protect middleware
├── models/
│   ├── User.js              # User schema (name, email, hashed password)
│   ├── Booking.js           # Booking schema
│   ├── Review.js            # Review/rating schema
│   └── Wishlist.js          # Wishlist schema
├── routes/
│   ├── auth.js              # /api/auth — register, login, logout, me
│   ├── bookings.js          # /api/bookings — CRUD
│   ├── reviews.js           # /api/reviews — CRUD
│   ├── wishlist.js          # /api/wishlist — add/remove/view
│   └── weather.js           # /api/weather — live weather proxy
├── assets/                  # Images and icons
├── index.html               # Main landing page
├── signin.html              # Sign In page
├── register.html            # Register page
├── styles.css               # Main stylesheet
├── script.js                # Main frontend logic (auth + bookings)
├── signin.js                # Sign-in form handler
├── register.js              # Register form handler
├── server.js                # Express app entry point
├── .env                     # Environment variables (not committed)
└── package.json
```

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
| DELETE | `/api/bookings/:id` | Cancel/delete a booking |

### Wishlist 🔒 (`/api/wishlist`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/wishlist` | Get current user's wishlist |
| POST | `/api/wishlist` | Add a destination to wishlist |
| DELETE | `/api/wishlist/:id` | Remove item from wishlist |

### Reviews 🔒 (`/api/reviews`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews` | Post a new review |
| DELETE | `/api/reviews/:id` | Delete a review |

### Weather (`/api/weather`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/weather` | Fetch live weather for a destination |

---

## Common Issues

**"Failed to fetch" on Sign Up / Sign In**
- Make sure the server is running (`npm run dev`) and you see `Server running on port 5000` in the terminal.
- Ensure your `MONGO_URI` includes the database name at the end: `.../voyageverse`.
- If using Live Server (port 5500), update your `fetch()` calls to use `http://localhost:5000/api/...` instead of relative paths.

---

## Author

**Harshitha** — VoyageVerse Travel App
