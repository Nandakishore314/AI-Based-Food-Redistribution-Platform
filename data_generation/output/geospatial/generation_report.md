# Generation Report -- Geospatial Hunger Heatmap Dataset

## Dataset Summary

| Property | Value |
|----------|-------|
| Total Points | 100,000 |
| Geographic Coverage | Continental India |
| Cluster Types | 5 (Urban, Semi-Urban, Rural, Slum, Hotspot) |
| Coordinate System | WGS84 (EPSG:4326) |
| Output Formats | CSV, GeoJSON, Leaflet-config |

---

## Schema

| Column | Type | Range | Description |
|--------|------|-------|-------------|
| `Latitude` | Float | 8.0999 -- 31.7351 | WGS84 latitude |
| `Longitude` | Float | 68.0000 -- 97.5000 | WGS84 longitude |
| `Area_Name` | String | -- | Locality/cluster name |
| `State` | String | 20+ states | Indian state |
| `Cluster_Type` | String | 5 types | Urban/Semi-Urban/Rural/Slum/Hotspot |
| `Population_Density` | Integer | 50 -- 60,000 | Persons per km2 |
| `Poverty_Index` | Float | 0.020 -- 0.950 | Fraction below poverty line |
| `Food_Insecurity_Score` | Float | 0.045 -- 1.000 | 0=secure, 1=crisis |
| `Meals_Requested` | Integer | 57 -- 500,000 | Daily demand |
| `Meals_Available` | Integer | 21 -- 433,372 | Daily supply |
| `NGO_Count` | Integer | 0 -- 7 | Active NGOs in area |
| `Volunteer_Count` | Integer | 0 -- 59 | Active volunteers |
| `Demand_Index` | Float | 1.014 -- 10.000 | Composite demand score (0-10) |

---

## Statistics by Cluster Type

| Cluster Type | Count | Avg FIS | Avg Poverty | Avg Density | Avg Meals Gap |
|-------------|-------|---------|-------------|-------------|--------------|
| Urban | 28,420 | 0.264 | 0.195 | 14,872 | 5,725 |
| Semi-Urban | 23,677 | 0.271 | 0.262 | 3,841 | 6,249 |
| Rural | 23,691 | 0.410 | 0.476 | 431 | 4,241 |
| Slum | 11,392 | 0.628 | 0.602 | 35,793 | 207,424 |
| Hotspot | 12,820 | 0.808 | 0.667 | 20,541 | 225,742 |

---

## Data Sources

| Source | Used For |
|--------|----------|
| Census India 2011/2021 | Population density by city/district |
| NFHS-5 | State-level poverty baselines |
| OpenStreetMap | City coordinates, geographic context |
| WFP Hunger Index | Food insecurity scoring formula |
| NSSO 69th Round | Slum location and density profiles |
| Global Data Lab | Subnational poverty maps |
| NDMA Historical Records | Disaster zone locations |
| IMD | Climate zone assignments |

---

## Leaflet.js Usage

```html
<!-- Use hunger_heatmap.geojson for full heatmap -->
<!-- Use hotspots.geojson for crisis marker clusters -->
<!-- See leaflet_config.json for complete integration code -->
```

Crisis threshold: FIS >= 0.70
Extreme crisis: FIS >= 0.85
Total crisis points: 11,226 (11.2%)
