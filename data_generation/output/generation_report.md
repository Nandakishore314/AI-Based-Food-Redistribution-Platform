# Food Demand Prediction Dataset — Generation Report

## Summary
- **Total Records**: 100,000
- **Features**: 13 features + 1 target
- **Target Variable**: `Meals_Required` (continuous, regression)
- **Date Range**: 2019-01-01 to 2024-12-31
- **Areas**: 200 synthetic regions across 14 states
- **Generated**: Using correlated statistical distributions, NOT uniform random

---

## Data Sources (Basis for Distributions)
| Source | Used For |
|--------|----------|
| Census India 2011/2021 | Population, density, urban-rural demographics |
| NFHS-5 | State-level poverty baselines |
| PLFS 2022-23 | Unemployment rate ranges |
| World Food Programme (WFP) | Hunger indices, food availability |
| IMD Climate Normals | Temperature/rainfall seasonal profiles |
| NDMA Records | Disaster probabilities by region/season |
| Public Hunger Reports | Demand formula calibration |

---

## Target Variable: Demand Formula

```
Base_Demand = Population × Poverty_Index × Regional_Factor

Meals_Required = Base_Demand
    × (1 + 0.30 × Festival_Flag)          # Festival boost
    × (1 + 1.50 × Disaster_Flag)          # Disaster spike
    × (1 + 0.15 × sin(seasonal_phase))    # Seasonal variation
    × (1 + 0.20 × (1 - Food_Availability))# Food scarcity amplifier
    × (1 + 0.10 × Unemployment × 10)      # Economic pressure
    × 1/(1 + 0.05 × NGO_Count)            # NGO coverage dampener
    × COVID_multiplier                     # COVID period effect
    × Weather_multiplier                   # Extreme weather effect
    + ε (10% Gaussian noise)
```

---

## Correlation Design (Explicitly Programmed)

| Feature | Correlation with Meals_Required | Design Mechanism |
|---------|--------------------------------|-----------------|
| Historical_Demand | +0.418 | Lagged target with noise |
| Poverty_Index | +0.296 | Direct multiplier in demand formula |
| Disaster_Flag | +0.259 | 2.5× demand spike on disaster days |
| Population | +0.237 | Base demand scales with population |
| Unemployment_Rate | +0.173 | Economic stress increases need |
| Population_Density | +0.138 | Urban/rural demand patterns differ |
| Temperature | +0.095 | Extreme heat/cold increases vulnerability |
| Nearby_NGO_Count | +0.044 | Better NGO coverage reduces unmet demand |
| Rainfall | +0.039 | Monsoon/drought affects food access |
| Festival_Flag | +0.025 | 1.3× boost during festival periods |
| Food_Availability | -0.236 | Scarcity drives demand up (inverse) |

---

## Feature Importance Suggestions

Based on the generation formula weights (for model validation):

| Rank | Feature | Expected Importance | Rationale |
|------|---------|-------------------|-----------|
| 1 | Poverty_Index | Very High | Primary driver in demand formula |
| 2 | Population | High | Base demand scaling factor |
| 3 | Disaster_Flag | High | Causes 2.5× demand spikes |
| 4 | Historical_Demand | High | Strong temporal autocorrelation |
| 5 | Festival_Flag | Medium | 1.3× boost during festivals |
| 6 | Food_Availability | Medium | Scarcity amplifies demand |
| 7 | Unemployment_Rate | Medium | Economic pressure effect |
| 8 | Temperature | Low-Medium | Extreme weather effect |
| 9 | Rainfall | Low-Medium | Monsoon/drought effect |
| 10 | Population_Density | Low | Indirect via urban/rural trends |
| 11 | Nearby_NGO_Count | Low | Slight dampening effect |
| 12 | Area_ID | Low | Regional fixed effects |
| 13 | Date | Low | Time trends and seasonality |

---

## Target Statistics

| Statistic | Value |
|-----------|-------|
| Mean | 1,986 |
| Median | 895 |
| Std Dev | 5,615 |
| Min | 8 |
| Max | 692,689 |
| Skewness | 40.83 |
| Kurtosis | 3574.97 |

---

## Zone Distribution

| Zone Type | Count | Percentage |
|-----------|-------|-----------|
| Urban | 63,025 | 63.0% |
| Semi-Urban | 27,438 | 27.4% |
| Rural | 9,537 | 9.5% |

---

## State Distribution

| State | Count | Percentage |
|-------|-------|-----------|
| Uttar Pradesh | 16,348 | 16.3% |
| Maharashtra | 12,605 | 12.6% |
| Tamil Nadu | 9,462 | 9.5% |
| Karnataka | 9,212 | 9.2% |
| Bihar | 7,983 | 8.0% |
| Madhya Pradesh | 7,851 | 7.9% |
| Rajasthan | 7,677 | 7.7% |
| West Bengal | 6,508 | 6.5% |
| Jharkhand | 5,073 | 5.1% |
| Telangana | 4,992 | 5.0% |
| Gujarat | 4,377 | 4.4% |
| Kerala | 3,409 | 3.4% |
| Odisha | 2,987 | 3.0% |
| Assam | 1,516 | 1.5% |

---

## Event Statistics
- **Festival records**: 20.9% of dataset
- **Disaster records**: 13.6% of dataset

---

## Missing Values

| Column | Missing Count | Missing % |
|--------|--------------|----------|
| Rainfall | 3,000 | 3.0% |
| Temperature | 2,992 | 3.0% |
| Historical_Demand | 3,003 | 3.0% |
| Food_Availability | 3,051 | 3.1% |
| Nearby_NGO_Count | 2,996 | 3.0% |

---

## Augmentation Summary

| Augmentation | Target % | Description |
|-------------|----------|-------------|
| Demand Surges | 5% | Meals_Required × U(2, 5) for crisis simulation |
| Seasonal Modulation | 100% | Region-specific sinusoidal demand patterns |
| High Outliers | 1% | 5–20× demand for mega-events |
| Low Outliers | 1% | 5–20% demand for well-supplied areas |
| Gaussian Noise | 100% | Small ε on all continuous features |
| Regional Balancing | Auto | Oversample underrepresented zones |
| Missing Values | 3% per col | NaN in Rainfall, Temperature, Food_Availability, NGO_Count, Historical_Demand |

---

## Train/Test Split
- **Training**: 80% (80,000 records), random split
- **Testing**: 20% (19,999 records), random split
