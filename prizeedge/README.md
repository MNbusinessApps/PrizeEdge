# PrizeEdge - Professional Sports Analytics Platform

A comprehensive sports analytics platform with real-time data insights, cross-platform mobile and web interfaces, and advanced prediction modeling for educational purposes.

## 🏆 What Makes PrizeEdge Special

- **Real-time Analytics**: Live sports prop analysis with data-driven insights
- **Cross-Platform**: React Native mobile app + React web dashboard
- **Sport-Specific Analysis**: Custom algorithms for NBA, NFL, College Basketball, NHL
- **Professional Vegas Aesthetic**: Luxury man cave theme with gold accents
- **Educational Focus**: Analysis and reasoning for learning purposes

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for backend development)

### Start Everything with Docker
```bash
# Clone the repository
git clone https://github.com/your-org/prizeedge.git
cd prizeedge

# Make script executable and start
chmod +x scripts/dev.sh
./scripts/dev.sh

# Access the apps:
# Mobile: http://localhost:19000
# Web: http://localhost:3000
# API: http://localhost:8000
```

## 📱 Features

### Mobile App (React Native)
- **Hamburger Navigation**: Clean drawer menu with sports categories
- **Live Central Time Clock**: Real-time clock synced to Central Time
- **Today's Analytics**: Live analysis of sports props with reasoning
- **Sports Lines**: Sport-specific prop types (Points, Yards, etc.)
- **Watchlist**: Track favorite analysis picks
- **Settings**: Customize notifications, updates, and preferences

### Web Dashboard (React)
- **Professional Interface**: Vegas luxury theme with gold accents
- **Real-time Updates**: WebSocket-powered live data streaming
- **Advanced Filtering**: Filter by sport, analysis score, market edge
- **Prediction Cards**: Detailed analysis with reasoning and confidence scores
- **Analytics Dashboard**: Performance tracking and insights
- **Live Clock**: Central Time display with real-time updates

### Backend (FastAPI)
- **RESTful API**: Comprehensive endpoints for all data
- **WebSocket Support**: Real-time data streaming
- **Database**: PostgreSQL with optimized schema
- **Caching**: Redis for performance and real-time updates
- **Background Workers**: Celery for data processing tasks

## 🏈 Supported Sports & Lines

### NBA Basketball 🏀
- Points, Rebounds, Assists, Steals, Blocks
- 3-Pointers Made, Field Goals Made
- Combined stats (Rebounds + Assists)

### NFL Football 🏈
- Passing Yards, Passing TDs, Rushing Yards
- Rushing TDs, Receiving Yards, Receptions
- Carries, Targets, Field Goals Made

### College Basketball 🏀
- Points, Rebounds, Assists, Steals, Blocks
- 3-Pointers Made, Field Goals Made
- Conference-specific analysis

### NHL Hockey 🏒
- Goals, Assists, Points, Shots
- Power Play Points, Faceoffs Won
- Time on Ice tracking

## 🎯 Analysis Features

- **Data-Driven Insights**: Mathematical analysis based on historical data
- **Reasoning Engine**: Detailed explanations for each analysis
- **Market Edge Calculation**: Identifies potential value opportunities
- **Realistic Scoring**: Honest assessment (not guaranteed outcomes)
- **Real-time Updates**: Live data streaming and line movement tracking

## ⚖️ Legal & Ethical Considerations

### Important Disclaimers
- **For Entertainment**: This app is for educational and entertainment purposes
- **No Betting**: Does not place actual bets or handle money
- **Analysis Only**: Provides data-driven insights and reasoning
- **Risk Awareness**: Sports involve inherent unpredictability
- **Responsible Use**: Encourages informed, responsible decision-making

## 📄 License

MIT License - For educational and entertainment purposes only.

---

**Disclaimer**: PrizeEdge is an educational and entertainment platform. Sports analytics involve uncertainty and risk. This application provides analysis and insights but does not guarantee outcomes. Please use responsibly.