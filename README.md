# 🌤️ API Dashboard — Multi-API Showcase

A sleek, glassmorphism-styled web dashboard that consumes multiple public RESTful APIs, with additional Node.js CLI scripts for weather data retrieval using `fetch` and `axios`.

## 🎯 About

- RESTful API consumption using JavaScript
- JSON data parsing and rendering
- HTTP requests via `fetch` and `axios`
- Responsive glassmorphism UI with an interactive card carousel

## 🛠️ Tech Stack

- **Node.js** — Server-side scripting
- **OpenWeatherMap API** — Live weather data
- **Open Library API** — Book search & covers
- **NASA APOD API** — Astronomy Picture of the Day
- **RandomUser API** — Random user profile generation

---

## 📁 Project Structure

```
├── index.html          # Web interface (4-card API carousel)
├── styles.css          # Glassmorphism styles
├── script.js           # Client-side logic (carousel, API fetches)
├── weather_fetch.js    # CLI script — weather via fetch + callback
├── weather_axios.js    # CLI script — weather via axios + callback
├── package.json        # Node dependencies (axios, dotenv)
├── .env                # API keys (not committed)
├── .gitignore          # Excludes .env from the repo
└── README.md
```

---

## 🚀 Live Demo

Hosted on **GitHub Pages**:

👉 **[View Demo](https://<username>.github.io/<repo>/)**

> Replace `<username>` and `<repo>` with your values.

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

### 2. Install dependencies (for Node scripts)

```bash
npm install
```

### 3. Configure API keys

Create a `.env` file at the root:

```env
API_KEY=your_openweathermap_key
NASA_API_KEY=your_nasa_key
```

- **OpenWeatherMap**: Sign up at [openweathermap.org/api](https://openweathermap.org/api)
- **NASA**: Sign up at [api.nasa.gov](https://api.nasa.gov/)
- **Open Library** and **RandomUser** require no key.

---

## 💻 CLI Scripts

### Weather via `fetch`

```bash
node weather_fetch.js
```

Fetches current weather for **Sousse** (description, temperature in °C, humidity) using the callback pattern.

### Weather via `axios`

```bash
node weather_axios.js
```

Same output, powered by the `axios` library.

---

## 🖥️ Web Interface

The dashboard presents a **carousel of 4 cards**, each consuming a different API:

| Slide | API | What it shows |
|-------|-----|---------------|
| 1 | **OpenWeatherMap** | Live weather in Sousse (temp, humidity, wind) |
| 2 | **Open Library** | Random book with cover, author & publication year |
| 3 | **NASA APOD** | Random astronomy photo (from 1995 to today) |
| 4 | **RandomUser** | Random profile (avatar, name, email, location, age) |

### How to use

1. Open `index.html` in a browser (or via GitHub Pages)
2. Enter your API keys in the top-left input fields:
   - Field 1: OpenWeatherMap key
   - Field 2: NASA key (optional — `DEMO_KEY` is used by default)
3. Click **Charger** or press **Enter** to load weather data
4. Navigate between cards using the **chevron arrows** (← →) that appear on hover
5. Each card has a button to fetch new data

> 💡 Keys are saved in `localStorage` — no need to re-enter them on each visit.

---

## 🔑 API Key Management

| Context | Method |
|---------|--------|
| Node scripts (`weather_fetch.js`, `weather_axios.js`) | Loaded from `.env` via `dotenv` |
| Web interface (`script.js`) | User input, persisted in `localStorage` |
| Git repository | `.env` excluded via `.gitignore` — no keys exposed |

---

## 📚 APIs Reference

| API | Documentation | Key Required |
|-----|---------------|--------------|
| OpenWeatherMap | [openweathermap.org/api](https://openweathermap.org/api) | ✅ Yes |
| Open Library | [openlibrary.org/developers/api](https://openlibrary.org/developers/api) | ❌ No |
| NASA APOD | [api.nasa.gov](https://api.nasa.gov/) | ✅ Yes (or `DEMO_KEY`) |
| RandomUser | [randomuser.me](https://randomuser.me/) | ❌ No |
