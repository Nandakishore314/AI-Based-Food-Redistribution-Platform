# Food Demand Prediction Dataset — Schema Documentation

## Dataset Overview
- **Records**: 100,000
- **Features**: 13 + 1 target variable
- **Purpose**: Train regression models to predict meals required in a region
- **Date Range**: 2019-01-01 to 2024-12-31
- **Regions**: 200 synthetic areas across 14 Indian states

---

## Feature Dictionary

| # | Feature | Data Type | Range / Values | Description |
|---|---------|-----------|---------------|-------------|
| 1 | `Date` | String | 2019-01-01 – 2024-12-31 | Date of observation (YYYY-MM-DD) |
| 2 | `Area_ID` | Categorical | AREA_001 – AREA_200 | Unique regional identifier |
| 3 | `Population` | Integer | 2,244 – 1,106,579 | Area population (with annual growth) |
| 4 | `Population_Density` | Float | 140 – 29836 | Persons per km² |
| 5 | `Poverty_Index` | Float | 0.01 – 1.01 | Multidimensional Poverty Index (0–1) |
| 6 | `Unemployment_Rate` | Float | 0.01 – 0.41 | Regional unemployment rate (0–0.5) |
| 7 | `Rainfall` | Float | 0.0 – 950.7 | Monthly rainfall in mm |
| 8 | `Temperature` | Float | 5.0 – 50.6 | Temperature in °C |
| 9 | `Festival_Flag` | Binary | 0, 1 | 1 if date is during a festival period |
| 10 | `Disaster_Flag` | Binary | 0, 1 | 1 if a natural disaster is occurring |
| 11 | `Historical_Demand` | Integer | 8 – 122,230 | Previous demand for same area |
| 12 | `Food_Availability` | Float | 0.15 – 1.00 | Food supply index (0–1) |
| 13 | `Nearby_NGO_Count` | Integer | 0 – 25 | Number of NGOs operating nearby |
| **T** | **`Meals_Required`** | **Integer** | **8 – 692,689** | **Target: Number of meals needed** |

---

## Data Sources (Basis for Distributions)

| Source | Used For |
|--------|----------|
| Census India 2011/2021 | Population, Population_Density, Urban-Rural demographics |
| NFHS-5 (National Family Health Survey) | Poverty_Index state-level baselines |
| PLFS (Periodic Labour Force Survey) | Unemployment_Rate ranges |
| World Food Programme (WFP) | Food_Availability indices, hunger metrics |
| India Meteorological Department (IMD) | Temperature/Rainfall monthly normals |
| NDMA (National Disaster Management Authority) | Disaster probabilities by region/season |
| Public Hunger Reports (PMGKAY, MDM) | Demand formula calibration |

---

## Zone Type Distribution

| Zone | Population Density (per km²) | NGO Count Range | Demand Factor |
|------|------------------------------|-----------------|---------------|
| Urban | 5,000 – 25,000 | 5 – 15 | Lower per-capita (better infra) |
| Semi-Urban | 1,000 – 5,000 | 2 – 8 | Moderate |
| Rural | 100 – 1,000 | 0 – 3 | Higher per-capita (less infra) |

---

## Missing Values
~3% NaN introduced in: `Rainfall`, `Temperature`, `Food_Availability`, `Nearby_NGO_Count`, `Historical_Demand`

---

## Augmentation Applied
- 5% demand surges (2–5× crisis spikes)
- Seasonal sinusoidal modulation (region-specific)
- 2% extreme outliers (1% high, 1% low)
- Gaussian noise on all continuous features
- Synthetic regional balancing (urban/semi-urban/rural)
- ~3% missing values per affected column
