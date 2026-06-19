# Spatial Distribution Explanation
## AI Food Redistribution Platform -- Geospatial Hunger Heatmap

---

## Overview

| Property | Value |
|----------|-------|
| Total Points | 100,000 |
| Latitude Range | 8.0999 N -- 31.7351 N |
| Longitude Range | 68.0000 E -- 97.5000 E |
| Coverage | Continental India |
| Avg Food Insecurity Score | 0.4115 |
| Crisis Points (FIS >= 0.70) | 11,226 (11.2%) |

---

## Cluster Type Distribution

| Cluster Type | Points | Avg FIS | Avg Poverty | Avg Density | Avg Demand Index | Avg NGOs |
|-------------|--------|---------|-------------|-------------|-----------------|----------|
| Urban | 28,420 | 0.264 | 0.195 | 14,872 | 2.663 | 0.2 |
| Semi-Urban | 23,677 | 0.271 | 0.262 | 3,841 | 2.835 | 0.1 |
| Rural | 23,691 | 0.410 | 0.476 | 431 | 4.059 | 0.6 |
| Slum | 11,392 | 0.628 | 0.602 | 35,793 | 5.462 | 0.2 |
| Hotspot | 12,820 | 0.808 | 0.667 | 20,541 | 7.458 | 0.5 |

---

## Spatial Generation Method

### Urban Clusters (30,000 points)
- **Centers**: 29 major Indian cities (Mumbai, Delhi, Bengaluru, Chennai, Kolkata, etc.)
- **Spread**: Gaussian distribution, radius 10--30 km from city center
- **Population Density**: 5,000--25,000 per km2 (log-normal)
- **Poverty Index**: 0.07--0.44 (Beta distribution, state-specific means)
- **NGO Coverage**: Highest (5--32 per zone)
- **Food Insecurity**: Moderate -- urban safety nets partially mitigate demand

### Semi-Urban Clusters (25,000 points)
- **Centers**: 20 tier-2/3 Indian cities
- **Spread**: Gaussian, radius 6--10 km
- **Population Density**: 2,000--6,000 per km2
- **Poverty Index**: 0.14--0.55 (higher than urban)
- **Food Insecurity**: Moderate-to-high -- weaker infrastructure than cities

### Rural Clusters (25,000 points)
- **Centers**: 20 district-level locations, including tribal/remote areas
- **Spread**: Uniform disk, radius 12--35 km (wide dispersal)
- **Population Density**: 40--800 per km2 (very low)
- **Poverty Index**: 0.28--0.70 (highest among all types)
- **NGO Coverage**: Minimal (0--2 per zone)
- **Food Insecurity**: High -- geographic isolation, minimal supply chain

### Slum Clusters (12,000 points)
- **Centers**: 17 slum pockets within/adjacent to major cities
- **Spread**: Bimodal (two overlapping Gaussians -- typical slum structure)
- **Population Density**: 22,000--50,000 per km2 (highest density)
- **Poverty Index**: 0.48--0.75
- **Food Insecurity**: Very high -- overcrowding, poor sanitation, income insecurity

### Hotspot Zones (8,000 points)
- **Centers**: 8 food crisis epicenters + 12 disaster zone injections
- **Spread**: Tight Gaussian, radius 1.8--15 km
- **Population Density**: Varies (200--50,000)
- **Poverty Index**: 0.60--0.90
- **Food Insecurity**: Critical (FIS 0.80--0.99)
- **Demand Coverage**: 15--40% only (severe supply collapse)

---

## Top 10 Crisis Points (Highest Food Insecurity)

| Area Name | State | Type | FIS | Demand Index |
|-----------|-------|------|-----|-------------|
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 8.742 |
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 8.638 |
| Kolkata_Crisis_Zone | West Bengal | Hotspot | 1.0000 | 8.256 |
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 8.578 |
| Kolkata_Crisis_Zone | West Bengal | Hotspot | 1.0000 | 8.552 |
| Lucknow_Slum_Hotspot | Uttar Pradesh | Hotspot | 1.0000 | 8.998 |
| Lucknow_Slum_Hotspot | Uttar Pradesh | Hotspot | 1.0000 | 7.938 |
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 8.850 |
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 9.399 |
| Mumbai_Dharavi_Extended | Maharashtra | Hotspot | 1.0000 | 8.314 |

---

## States by Average Food Insecurity

| State | Points | Avg FIS |
|-------|--------|---------|
| Odisha | 2,699 | 0.561 |
| Bihar | 9,644 | 0.552 |
| West Bengal | 8,412 | 0.517 |
| Uttar Pradesh | 6,939 | 0.497 |
| Chhattisgarh | 915 | 0.481 |
| Maharashtra | 16,786 | 0.461 |
| Assam | 2,955 | 0.450 |
| Delhi | 7,358 | 0.434 |
| Madhya Pradesh | 3,003 | 0.433 |
| Manipur | 1,334 | 0.412 |
| Sindh_Border | 629 | 0.343 |
| Karnataka | 4,644 | 0.342 |
| Rajasthan | 7,709 | 0.328 |
| Uttarakhand | 2,061 | 0.326 |
| Andhra Pradesh | 2,323 | 0.318 |

---

## Augmentation Effects

| Stage | Effect | Points Affected |
|-------|--------|----------------|
| GPS Drift | ~50m random displacement | All 100,000 |
| Spatial Noise | Up to 2km displacement | ~2,000 |
| Hotspot Amplification | FIS+0.25, supply collapse | ~5,000 |
| Cluster Balancing | Oversample underrepresented types | As needed |
| Seasonal Shifts | Up to 5km migration shift | ~8,000 |
| Disaster Zones | 12 injected crisis zones | ~4,850 |

---

## Leaflet.js Integration

Use the files in this directory:

```
hunger_heatmap.geojson  --> Full 100K-point dataset
hotspots.geojson        --> Crisis points only (FIS >= 0.70)
leaflet_config.json     --> Ready-to-use Leaflet configuration
```

See `leaflet_config.json` for the complete HTML snippet to embed the heatmap.

Key fields for Leaflet heatmap:
- **Intensity**: `Food_Insecurity_Score` (0--1)
- **Weight for sizing**: `Demand_Index` (0--10)
- **Popup**: `popup_label` (pre-formatted HTML)
- **Coordinates**: `[Longitude, Latitude]` (GeoJSON standard)

---

## Correlation Summary

| Feature Pair | Expected Relationship |
|-------------|----------------------|
| Poverty_Index -> FIS | Strong positive (+0.45 weight) |
| NGO_Count -> FIS | Negative (more NGOs = lower insecurity) |
| Population_Density -> FIS | Moderate positive (slums + hotspots) |
| Meals_Gap -> Demand_Index | Strong positive (drives demand) |
| Cluster_Type -> Availability | Hotspot lowest (35%), Urban highest (80%) |
