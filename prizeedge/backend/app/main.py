from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from datetime import datetime, timezone
from typing import List, Dict, Any
import asyncio
import json
import redis.asyncio as redis
import os
from pydantic import BaseModel
import uvicorn
from contextlib import asynccontextmanager

# Models
class PropRequest(BaseModel):
    sport: str
    date: str = datetime.now(timezone.utc).strftime('%Y-%m-%d')

class PredictionResponse(BaseModel):
    prop_id: str
    player_name: str
    sport: str
    stat_type: str
    line_value: float
    prediction: str
    confidence: float
    reasoning: str
    market_value: float
    edge_percentage: float
    posted_at: str

class TimeResponse(BaseModel):
    server_utc: str
    server_zone: str
    skew_ms: int

# Global redis connection
redis_client = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global redis_client
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    redis_client = redis.from_url(redis_url)
    await redis_client.ping()
    
    yield
    
    # Shutdown
    await redis_client.close()

app = FastAPI(
    title="PrizeEdge API",
    description="Professional Sports Analytics Platform",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data for demonstration
SAMPLE_PREDICTIONS = {
    "nba": [
        {
            "prop_id": "pp-001",
            "player_name": "LeBron James",
            "team": "LAL",
            "sport": "nba",
            "stat_type": "Points",
            "line_value": 24.5,
            "prediction": "OVER",
            "confidence": 0.89,
            "reasoning": "James averages 25.2 PPG at home vs Lakers. Lakers offense runs through James in home games, +2.3% usage rate vs road. Line seems low for current season trends.",
            "market_value": -110,
            "edge_percentage": 0.23,
            "posted_at": "2025-10-30T13:20:00Z"
        },
        {
            "prop_id": "pp-002",
            "player_name": "Jusuf Nurkic",
            "team": "PHX",
            "sport": "nba",
            "stat_type": "Rebounds + Assists",
            "line_value": 8.5,
            "prediction": "OVER",
            "confidence": 0.91,
            "reasoning": "Nurkic has hit this line in 8 of last 10 games vs weak interior defenses. Suns lack secondary rebounding options, forcing Nurkic into more opportunities.",
            "market_value": -105,
            "edge_percentage": 0.27,
            "posted_at": "2025-10-30T13:20:00Z"
        }
    ],
    "nfl": [
        {
            "prop_id": "pp-003",
            "player_name": "Josh Allen",
            "team": "BUF",
            "sport": "nfl",
            "stat_type": "Passing Yards",
            "line_value": 285.5,
            "prediction": "OVER",
            "confidence": 0.87,
            "reasoning": "Allen averages 298 pass yards at home vs teams ranked 25+ in pass defense. Jets defense allows 7.8 yards per attempt, 32nd in league.",
            "market_value": -110,
            "edge_percentage": 0.18,
            "posted_at": "2025-10-30T13:20:00Z"
        },
        {
            "prop_id": "pp-004",
            "player_name": "Derrick Henry",
            "team": "BAL",
            "sport": "nfl",
            "stat_type": "Rushing Yards",
            "line_value": 92.5,
            "prediction": "OVER",
            "confidence": 0.85,
            "reasoning": "Henry rushed for 102+ yards in 3 of last 4 vs Browns. Browns defense gives up 4.7 YPC to RBs, Henry +15% more carries vs Browns historically.",
            "market_value": -115,
            "edge_percentage": 0.19,
            "posted_at": "2025-10-30T13:20:00Z"
        }
    ],
    "cbb": [
        {
            "prop_id": "pp-005",
            "player_name": "Cooper Flagg",
            "team": "Duke",
            "sport": "cbb",
            "stat_type": "Points",
            "line_value": 18.5,
            "prediction": "OVER",
            "confidence": 0.92,
            "reasoning": "Flagg scoring 21.3 PPG in ACC play vs mid-tier defenses. Syracuse allows 22.1 PPG to opposing forwards, Flagg +14% field goal rate vs zone defense.",
            "market_value": -110,
            "edge_percentage": 0.25,
            "posted_at": "2025-10-30T13:20:00Z"
        }
    ],
    "nhl": [
        {
            "prop_id": "pp-006",
            "player_name": "Connor McDavid",
            "team": "EDM",
            "sport": "nhl",
            "stat_type": "Points",
            "line_value": 1.5,
            "prediction": "OVER",
            "confidence": 0.88,
            "reasoning": "McDavid has 2+ points in 6 of last 8 vs Sharks. Sharks allow 2.1 power play goals per game, McDavid 85% PPTOI + Sharks penalty situation.",
            "market_value": -125,
            "edge_percentage": 0.21,
            "posted_at": "2025-10-30T13:20:00Z"
        }
    ]
}

@app.get("/")
async def root():
    return {"message": "PrizeEdge API - Professional Sports Analytics Platform"}

@app.get("/v1/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.get("/v1/time", response_model=TimeResponse)
async def get_time():
    """Get server time with skew calculation"""
    now = datetime.now(timezone.utc)
    return TimeResponse(
        server_utc=now.isoformat(),
        server_zone="UTC",
        skew_ms=0
    )

@app.get("/v1/predictions/today", response_model=List[PredictionResponse])
async def get_today_predictions(sport: str = None):
    """Get today's predictions for specified sport or all sports"""
    if sport:
        if sport.lower() in SAMPLE_PREDICTIONS:
            return SAMPLE_PREDICTIONS[sport.lower()]
        else:
            raise HTTPException(status_code=404, detail=f"Sport '{sport}' not supported")
    else:
        # Return all predictions
        all_predictions = []
        for sport_predictions in SAMPLE_PREDICTIONS.values():
            all_predictions.extend(sport_predictions)
        return all_predictions

@app.get("/v1/predictions/{prop_id}", response_model=PredictionResponse)
async def get_prediction_detail(prop_id: str):
    """Get detailed prediction for specific prop"""
    all_predictions = []
    for sport_predictions in SAMPLE_PREDICTIONS.values():
        all_predictions.extend(sport_predictions)
    
    for pred in all_predictions:
        if pred["prop_id"] == prop_id:
            return pred
    
    raise HTTPException(status_code=404, detail="Prediction not found")

@app.get("/v1/sports")
async def get_sports():
    """Get available sports"""
    return {
        "sports": [
            {"name": "NBA", "display": "Basketball", "lines": ["Points", "Rebounds", "Assists", "Rebounds + Assists", "Steals", "Blocks", "3-Pointers Made"]},
            {"name": "NFL", "display": "Football", "lines": ["Passing Yards", "Passing TDs", "Rushing Yards", "Rushing TDs", "Receiving Yards", "Receptions"]},
            {"name": "CBB", "display": "College Basketball", "lines": ["Points", "Rebounds", "Assists", "Rebounds + Assists", "3-Pointers Made"]},
            {"name": "NHL", "display": "Hockey", "lines": ["Goals", "Assists", "Points", "Shots", "Power Play Points"]}
        ]
    }

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast_prediction_update(self, message: str):
        """Broadcast prediction updates to all connected clients"""
        if self.active_connections:
            # In production, this would publish to Redis
            disconnected = []
            for connection in self.active_connections:
                try:
                    await connection.send_text(message)
                except Exception:
                    disconnected.append(connection)
            
            # Remove disconnected connections
            for conn in disconnected:
                self.disconnect(conn)

manager = ConnectionManager()

@app.websocket("/ws/predictions")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Send initial connection message
        await websocket.send_text(json.dumps({
            "type": "connection",
            "message": "Connected to PrizeEdge live updates",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }))
        
        # Listen for client messages
        while True:
            data = await websocket.receive_text()
            # Echo back for testing
            await websocket.send_text(f"Message received: {data}")
            
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)