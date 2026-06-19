# Generation Report -- Time Series Forecasting Dataset

## Dataset Overview

| Property | Value |
|----------|-------|
| Total Records | 95,350 |
| Main Records (2021-2025) | 90,877 |
| Training Records (2021-2024) | 72,721 |
| Test Records (2025) | 18,156 |
| Future Scenario Records | 4,473 |
| Regions | 50 |
| Daily Granularity | Yes |
| Missing Timestamps | ~0.5% per region |

---

## Schema / Data Dictionary

| Column | Type | Range | Description |
|--------|------|-------|-------------|
| `Date` | String | 2021-01-01 - 2026-03-31 | YYYY-MM-DD |
| `Region_ID` | String | R01 - R50 | Unique region identifier |
| `Meals_Distributed` | Integer | >= 5 | Actual meals delivered (capacity-constrained) |
| `Meals_Requested` | Integer | >= 10 | **Target**: demand for meals |
| `Temperature` | Float | -5 - 52 °C | Daily temperature |
| `Rainfall` | Float | 0 - 300 mm | Daily rainfall |
| `Festival_Flag` | Integer | 0 / 1 | 1 on Indian festival days |
| `Disaster_Flag` | Integer | 0 / 1 | 1 during active disaster events |
| `Population` | Integer | varies | Annual growth at 1.2% |
| `Food_Availability_Index` | Float | 0.05 - 1.0 | Food supply index (0=scarce, 1=abundant) |

---

## 50 Regions

| Region ID | Name | State | Zone | Climate | Disaster Types |
|-----------|------|-------|------|---------|---------------|
| R01 | Mumbai_Urban | Maharashtra | Urban | Coastal | Flood, Cyclone |
| R02 | Pune_SemiUrban | Maharashtra | Semi-Urban | Semi-Arid | Drought, Heatwave |
| R03 | Nashik_Rural | Maharashtra | Rural | Semi-Arid | Drought |
| R04 | Lucknow_Urban | Uttar Pradesh | Urban | Temperate | Flood, Heatwave |
| R05 | Varanasi_SemiUrban | Uttar Pradesh | Semi-Urban | Temperate | Flood, Heatwave |
| R06 | Gorakhpur_Rural | Uttar Pradesh | Rural | Temperate | Flood |
| R07 | Agra_SemiUrban | Uttar Pradesh | Semi-Urban | Temperate | Heatwave |
| R08 | Chennai_Urban | Tamil Nadu | Urban | Coastal | Cyclone, Flood |
| R09 | Coimbatore_SemiUrban | Tamil Nadu | Semi-Urban | Semi-Arid | Drought |
| R10 | Madurai_Rural | Tamil Nadu | Rural | Semi-Arid | Drought, Heatwave |
| R11 | Bengaluru_Urban | Karnataka | Urban | Temperate | Flood |
| R12 | Mysuru_SemiUrban | Karnataka | Semi-Urban | Semi-Arid | Drought |
| R13 | Kolkata_Urban | West Bengal | Urban | Tropical | Flood, Cyclone |
| R14 | Howrah_SemiUrban | West Bengal | Semi-Urban | Tropical | Flood, Cyclone |
| R15 | Malda_Rural | West Bengal | Rural | Tropical | Flood |
| R16 | Jaipur_Urban | Rajasthan | Urban | Arid | Heatwave, Drought |
| R17 | Jodhpur_SemiUrban | Rajasthan | Semi-Urban | Arid | Heatwave, Drought |
| R18 | Barmer_Rural | Rajasthan | Rural | Arid | Drought, Heatwave |
| R19 | Ahmedabad_Urban | Gujarat | Urban | Semi-Arid | Heatwave, Flood |
| R20 | Surat_Urban | Gujarat | Urban | Coastal | Cyclone, Flood |
| R21 | Bhopal_Urban | Madhya Pradesh | Urban | Temperate | Flood, Heatwave |
| R22 | Jabalpur_SemiUrban | Madhya Pradesh | Semi-Urban | Temperate | Flood, Drought |
| R23 | Sheopur_Rural | Madhya Pradesh | Rural | Temperate | Drought |
| R24 | Patna_Urban | Bihar | Urban | Tropical | Flood |
| R25 | Gaya_SemiUrban | Bihar | Semi-Urban | Tropical | Flood, Drought |
| R26 | Araria_Rural | Bihar | Rural | Tropical | Flood |
| R27 | Bhubaneswar_Urban | Odisha | Urban | Coastal | Cyclone, Flood |
| R28 | Cuttack_SemiUrban | Odisha | Semi-Urban | Coastal | Cyclone, Flood |
| R29 | Koraput_Rural | Odisha | Rural | Tropical | Flood, Drought |
| R30 | Ranchi_Urban | Jharkhand | Urban | Temperate | Flood, Drought |
| R31 | Dhanbad_SemiUrban | Jharkhand | Semi-Urban | Temperate | Flood |
| R32 | Thiruvananthapuram_Urban | Kerala | Urban | Coastal | Flood, Cyclone |
| R33 | Kozhikode_SemiUrban | Kerala | Semi-Urban | Coastal | Flood |
| R34 | Hyderabad_Urban | Telangana | Urban | Semi-Arid | Flood, Heatwave |
| R35 | Warangal_SemiUrban | Telangana | Semi-Urban | Semi-Arid | Drought, Heatwave |
| R36 | Guwahati_Urban | Assam | Urban | Tropical | Flood |
| R37 | Silchar_SemiUrban | Assam | Semi-Urban | Tropical | Flood |
| R38 | Barpeta_Rural | Assam | Rural | Tropical | Flood |
| R39 | Delhi_North_Urban | Delhi | Urban | Temperate | Heatwave, Flood |
| R40 | Delhi_South_Urban | Delhi | Urban | Temperate | Heatwave |
| R41 | Vishakhapatnam_Urban | Andhra Pradesh | Urban | Coastal | Cyclone, Flood |
| R42 | Kurnool_SemiUrban | Andhra Pradesh | Semi-Urban | Semi-Arid | Drought, Heatwave |
| R43 | Anantapur_Rural | Andhra Pradesh | Rural | Arid | Drought |
| R44 | Amritsar_Urban | Punjab | Urban | Temperate | Flood |
| R45 | Ludhiana_SemiUrban | Punjab | Semi-Urban | Temperate | Flood |
| R46 | Indore_Urban | Madhya Pradesh | Urban | Semi-Arid | Flood, Heatwave |
| R47 | Nagpur_Urban | Maharashtra | Urban | Semi-Arid | Heatwave, Flood |
| R48 | Aurangabad_SemiUrban | Maharashtra | Semi-Urban | Semi-Arid | Drought |
| R49 | Kochi_Urban | Kerala | Urban | Coastal | Flood, Cyclone |
| R50 | Shimla_SemiUrban | Himachal Pradesh | Semi-Urban | Temperate | Flood |

---

## Demand Formula

```
Base_Demand = Population x Poverty_Rate x Regional_Factor

Meals_Requested = Base_Demand
    x Weekly_Seasonality(day_of_week)      # ±8%
    x Monthly_Seasonality(day_of_month)    # ±5% (salary-day)
    x Yearly_Seasonality(day_of_year)      # ±15% (lean/harvest)
    x (1 + Festival_Boost)                 # +20-55% on festival days
    x Disaster_Impact_Multiplier           # x1.6-2.8 during disasters
    x Trend_Growth(years_elapsed)          # x(1.02)^years
    x NGO_Dampening                        # 1/(1 + 0.04 x NGO_Count)
    x Weather_Multiplier                   # +12-18% for extremes
    x Scarcity_Multiplier                  # x(1 + 0.2 x (1 - FAI))
    + Gaussian_Noise(σ = 5%)

Meals_Distributed = Meals_Requested
    x Fulfillment_Rate(0.55-0.97)         # Lower during disasters
```

---

## Augmentation Summary

| Augmentation | Coverage | Description |
|-------------|----------|-------------|
| Demand Shocks | 2% of region-days | Contiguous 1-7 day pulses (2-5x) |
| Noise Injection | 100% | Gaussian ε on temp, rainfall, food index |
| Trend Amplification | 100% | Growth rate 1.5% -> 2.5% over 2021-2025 |
| Seasonal Amplification | ~50% rural/semi-urban | ±20% on lean/harvest months |
| Extreme Events | ~2 per region per year | Cyclone/flood/heatwave signature shapes |
| Missing Timestamps | ~0.5% per region | Simulates reporting/sensor gaps |

---

## Data Sources & Inspiration

| Source | Features Informed |
|--------|-----------------|
| WFP Food Demand Statistics | Base demand formula, poverty-demand link |
| PMGKAY / Mid-Day Meal Reports | Regional factor calibration |
| NDMA Historical Disaster Records | Disaster probabilities, durations, intensity |
| Indian Festival Calendar | Festival flags, seasonal demand spikes |
| IMD Climate Normals | Temperature/rainfall by climate zone & month |
| Census India 2011/2021 | Population bases, growth rates |
| NFHS-5 | State-level poverty rates |

---

## Model Guidance

- **ARIMA/SARIMA**: Train per-region; use weekly seasonal order (s=7); add Festival/Disaster as exogenous
- **Prophet**: Use multiplicative mode; add Indian holidays; treat Disaster as additional regressor
- **LSTM**: Lookback window 60 days recommended; normalize per-region; embed Region_ID

See `forecasting_notes.md` for complete code examples.
