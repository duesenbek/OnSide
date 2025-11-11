# ⚽ ONSIDE Football

A modern, dynamic football news and statistics website with real-time data integration, built for Web Technologies course.

## 🌐 Live Site
**https://duesenbek.github.io/OnSide/**

## ✨ Key Features

### 📰 News System
- **Real football news** from multiple sources (ESPN, Goal, 90min, OneFootball)
- **Modal view** for reading full articles
- **Real images** from TheSportsDB fanart API
- Source filtering and pagination
- Smooth animations and hover effects

### 👥 Teams & Leagues
- **5 Major European Leagues**: Premier League, La Liga, Bundesliga, Serie A, Ligue 1
- **Compact team cards** with official logos (6 per row)
- **Accordion layout** for easy league navigation
- **National teams section** with major football nations
- Team logos fetched from TheSportsDB API

### 📊 Live Standings (2024-25 Season)
- **Real-time league tables** with accurate data
- **Premier League** (11 matches): Arsenal 26pts, Man City 22pts, Chelsea 20pts
- **La Liga** (13 matches): Barcelona 33pts, Real Madrid 27pts, Atletico 26pts
- **Bundesliga** (10 matches): Bayern 26pts, Leipzig 21pts, Frankfurt 20pts
- **Serie A** (12 matches): Napoli 26pts, Atalanta 25pts, Fiorentina 25pts
- **Ligue 1** (11 matches): PSG 29pts, Monaco 23pts, Marseille 20pts
- Full statistics: Played, Wins, Draws, Losses, Goal Difference, Points

### 🎨 Animations & UX
- **15+ custom animations**: fadeIn, slideIn, scaleIn, bounceIn, pulse, glow, float
- **Staggered animations** for cards and lists
- **Smooth transitions** on all interactive elements
- **Hover effects** throughout the site
- **Responsive design** for all devices

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **JavaScript (ES6+)** - Async/await, Fetch API, DOM manipulation
- **Bootstrap 5.3.2** - Responsive components

### APIs & Data Sources
- **TheSportsDB API** - Team data, logos, league information
- **Football News API** - Real-time news from multiple sources
- **Custom data integration** - 2024-25 season standings

### Design
- **Google Fonts** - Open Sans, Fjalla One, Roboto Mono
- **Custom color scheme** - Green (#16A34A), Yellow (#FACC15), Modern UI
- **Material Design principles**

## 📁 Project Structure

```
OnSide/
├── index.html              # Home page with featured news
├── news.html               # News page with modal view
├── teams.html              # Teams page with accordion layout
├── standings.html          # League standings with real data
├── css/
│   ├── style.css          # Main styles
│   ├── news-styles.css    # News-specific styles
│   └── animations.css     # Animation system (NEW)
├── js/
│   ├── newsAPI.js         # News API integration
│   ├── newsDisplay.js     # News rendering + modal
│   ├── thesportsdb-api.js # Sports data API
│   └── teams-display.js   # Teams & standings logic
└── images/                # Assets and logos
```

## 🎯 Recent Updates (v2.0)

### Teams Page
- ✅ Redesigned team cards as compact cubes
- ✅ Added accordion for league organization
- ✅ Integrated real team logos from API
- ✅ Added National Teams section
- ✅ Implemented hover animations

### News Page
- ✅ Added modal view for full articles
- ✅ Integrated real images from API
- ✅ Updated to November 2025 dates
- ✅ Fixed CSS compatibility issues
- ✅ Enhanced card hover effects

### Standings Page
- ✅ Replaced all data with real 2024-25 season stats
- ✅ Synchronized team logos with Teams page
- ✅ Added complete statistics for all teams
- ✅ Implemented loading states and error handling

### Animations System
- ✅ Created comprehensive animation library
- ✅ Applied animations across all pages
- ✅ Staggered delays for better UX
- ✅ Smooth scroll and transitions

## 👨‍💻 Development Team
- **Bekzat Duisenbek** - Team Lead & Full Stack Developer
- **Kuanysh Asaubaev** - UI/UX Designer & Frontend Developer  
- **Nur-Adilet Mustafa** - Backend & API Integration Developer

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/duesenbek/OnSide.git
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use Live Server for development

3. **No build required**
   - Pure HTML/CSS/JS - no dependencies to install
   - APIs are public and require no authentication

## 📱 Responsive Design
- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid (4 teams per row)
- **Mobile**: Single column layout with touch-friendly UI

## 🎨 Color Palette
- **Primary Green**: `#16A34A`
- **Light Green**: `#22C55E`
- **Accent Yellow**: `#FACC15`
- **Dark**: `#111111`
- **Light Gray**: `#F3F4F6`

## 📄 Pages Overview
- 🏠 **Home** - Featured news, top stories, hero section
- 📰 **News** - Latest articles with modal view and filtering
- 👥 **Teams** - League teams with logos and accordion layout
- 📊 **Standings** - Real-time league tables for 5 major leagues

## 🔄 Data Updates
- News: Real-time from Football News API
- Team logos: Cached from TheSportsDB API
- Standings: Updated with 2024-25 season data (November 2025)

## 📝 License
Educational project for Astana IT University

---

**SE-2438 Web Technologies 1 | Astana IT University | 2024-2025**

*Built with ❤️ and ⚽ by Team OnSide*
