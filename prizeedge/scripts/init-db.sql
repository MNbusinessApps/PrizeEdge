-- PrizeEdge Database Initialization
-- This script creates the necessary database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    sport VARCHAR(50) NOT NULL,
    team VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    external_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport VARCHAR(50) NOT NULL,
    home_team VARCHAR(100) NOT NULL,
    away_team VARCHAR(100) NOT NULL,
    start_time_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    external_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create props table (the main predictions)
CREATE TABLE IF NOT EXISTS props (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    stat_type VARCHAR(100) NOT NULL,
    line_value DECIMAL(10,2) NOT NULL,
    side VARCHAR(10) CHECK (side IN ('OVER', 'UNDER')),
    market_provider VARCHAR(100) DEFAULT 'prizepicks',
    posted_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prop_history table for tracking line movements
CREATE TABLE IF NOT EXISTS prop_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prop_id UUID REFERENCES props(id) ON DELETE CASCADE,
    line_value DECIMAL(10,2) NOT NULL,
    posted_at_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(100) DEFAULT 'prizepicks',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create predictions table (AI/analytics results)
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prop_id UUID REFERENCES props(id) ON DELETE CASCADE,
    prediction VARCHAR(10) CHECK (prediction IN ('OVER', 'UNDER')),
    confidence DECIMAL(5,4) CHECK (confidence >= 0 AND confidence <= 1),
    reasoning TEXT,
    model_version VARCHAR(50),
    market_value DECIMAL(10,2),
    edge_percentage DECIMAL(5,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scrape_runs table for tracking data ingestion
CREATE TABLE IF NOT EXISTS scrape_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    started_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at_utc TIMESTAMP WITH TIME ZONE,
    success BOOLEAN DEFAULT FALSE,
    details TEXT,
    records_processed INTEGER DEFAULT 0,
    errors_count INTEGER DEFAULT 0
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_sport ON players(sport);
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team);
CREATE INDEX IF NOT EXISTS idx_events_sport ON events(sport);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time_utc);
CREATE INDEX IF NOT EXISTS idx_props_event_player ON props(event_id, player_id);
CREATE INDEX IF NOT EXISTS idx_props_posted_at ON props(posted_at_utc);
CREATE INDEX IF NOT EXISTS idx_prop_history_prop ON prop_history(prop_id);
CREATE INDEX IF NOT EXISTS idx_pred_prop ON predictions(prop_id);
CREATE INDEX IF NOT EXISTS idx_scrape_runs_started ON scrape_runs(started_at_utc);

-- Insert sample data for development
INSERT INTO players (name, sport, team, position) VALUES
('LeBron James', 'nba', 'LAL', 'SF'),
('Jusuf Nurkic', 'nba', 'PHX', 'C'),
('Josh Allen', 'nfl', 'BUF', 'QB'),
('Derrick Henry', 'nfl', 'BAL', 'RB'),
('Cooper Flagg', 'cbb', 'Duke', 'PF'),
('Connor McDavid', 'nhl', 'EDM', 'C')
ON CONFLICT DO NOTHING;

-- Create a sample event
INSERT INTO events (sport, home_team, away_team, start_time_utc) VALUES
('nba', 'LAL', 'PHX', '2025-10-30T20:00:00Z'),
('nfl', 'BUF', 'NYJ', '2025-10-30T17:00:00Z'),
('cbb', 'Duke', 'Syracuse', '2025-10-30T19:00:00Z'),
('nhl', 'EDM', 'SJ', '2025-10-30T22:00:00Z')
ON CONFLICT DO NOTHING;

-- Get player IDs for sample props
DO $$
DECLARE
    lebron_id UUID;
    nurkic_id UUID;
    allen_id UUID;
    henry_id UUID;
    flagg_id UUID;
    mcdavid_id UUID;
    event_ids UUID[];
BEGIN
    -- Get player IDs
    SELECT id INTO lebron_id FROM players WHERE name = 'LeBron James' AND sport = 'nba';
    SELECT id INTO nurkic_id FROM players WHERE name = 'Jusuf Nurkic' AND sport = 'nba';
    SELECT id INTO allen_id FROM players WHERE name = 'Josh Allen' AND sport = 'nfl';
    SELECT id INTO henry_id FROM players WHERE name = 'Derrick Henry' AND sport = 'nfl';
    SELECT id INTO flagg_id FROM players WHERE name = 'Cooper Flagg' AND sport = 'cbb';
    SELECT id INTO mcdavid_id FROM players WHERE name = 'Connor McDavid' AND sport = 'nhl';
    
    -- Get event IDs
    SELECT array_agg(id) INTO event_ids FROM events;
    
    -- Insert sample props
    IF event_ids[1] IS NOT NULL AND lebron_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[1], lebron_id, 'Points', 24.5, 'OVER');
    END IF;
    
    IF event_ids[1] IS NOT NULL AND nurkic_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[1], nurkic_id, 'Rebounds + Assists', 8.5, 'OVER');
    END IF;
    
    IF event_ids[2] IS NOT NULL AND allen_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[2], allen_id, 'Passing Yards', 285.5, 'OVER');
    END IF;
    
    IF event_ids[2] IS NOT NULL AND henry_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[2], henry_id, 'Rushing Yards', 92.5, 'OVER');
    END IF;
    
    IF event_ids[3] IS NOT NULL AND flagg_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[3], flagg_id, 'Points', 18.5, 'OVER');
    END IF;
    
    IF event_ids[4] IS NOT NULL AND mcdavid_id IS NOT NULL THEN
        INSERT INTO props (event_id, player_id, stat_type, line_value, side) 
        VALUES (event_ids[4], mcdavid_id, 'Points', 1.5, 'OVER');
    END IF;
END $$;

COMMIT;