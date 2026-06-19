# NGO Matching Dataset Generator

## Overview

Generates a **production-grade 50,000-record synthetic dataset** for training a
Decision Tree model that predicts the most suitable NGO for a food donation in
an AI Food Redistribution Platform.

All data uses **realistic statistical distributions** derived from:
- Food Waste Atlas (UNEP)
- FAO Food Waste Index Report
- Indian Census 2011
- OpenStreetMap NGO locations
- Public NGO capacity reports (Akshaya Patra, Feeding India, Robin Hood Army)
- Real restaurant donation patterns (Zomato Feeding India)

## Quick Start

```bash
cd data_generation

# Create virtual environment (recommended)
python -m venv .venv
.venv\Scripts\activate    # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Generate dataset
python generate_dataset.py
```

## Output Files

All outputs are saved to `output/`:

| File | Description |
|------|-------------|
| `ngo_matching_dataset.csv` | Full 50,000-record dataset |
| `train.csv` | 80% stratified training split |
| `test.csv` | 20% stratified test split |
| `sample_records.csv` | First 20 records for inspection |
| `class_distribution.png` | Bar chart of Matched_NGO distribution |
| `correlation_matrix.png` | Heatmap of feature correlations |
| `schema.md` | Feature dictionary & data types |
| `generation_report.md` | Full documentation of generation logic |

## Features (16 + Target)

| Feature | Type | Distribution |
|---------|------|-------------|
| Donation_ID | ID | Sequential |
| Food_Type | Categorical (30) | Weighted from FAO data |
| Food_Category | Categorical (6) | Derived from Food_Type |
| Quantity_Kg | Float | Log-normal, donor-correlated |
| Expiry_Hours | Float | Gamma, food-type-correlated |
| Food_Priority_Score | Float [0-100] | Composite score |
| Donor_Type | Categorical (8) | Census-weighted |
| Latitude | Float | Gaussian mixture (8 metros) |
| Longitude | Float | Gaussian mixture (8 metros) |
| Distance_To_NGO | Float | Haversine-computed |
| NGO_ID | Categorical (20) | Scoring-based assignment |
| NGO_Capacity | Integer | Tier-based ranges |
| Current_NGO_Load | Float | Beta(2,5) × Capacity |
| NGO_Acceptance_Category | String | Fixed per NGO |
| Urgency_Level | Categorical (4) | Threshold-derived |
| Volunteer_Availability | Integer | Poisson(λ) |
| **Matched_NGO** | **Categorical (20)** | **Target variable** |

## Augmentation Applied

- **SMOTE** — Class balancing for under-represented NGOs
- **Gaussian Noise** — Quantity, Distance, Load
- **Capacity Fluctuations** — 15% of records
- **NGO Overload** — 8% with >85% load
- **Emergency Requests** — 3% critical donations
- **Festival Spikes** — 10% (Diwali, Eid, Christmas, Onam, Pongal, Navratri)
- **Weather Disruptions** — 5% monsoon/flood scenarios
- **Missing Values** — ~3% NaN in Volunteer, Distance, Load
- **Rare Events** — Large donations, zero-distance, expired food

## Correlations

The dataset includes **explicit, programmed correlations** between features:
- Food Type → Food Category (deterministic)
- Food Type → Expiry Hours (food-specific Gamma parameters)
- Donor Type → Quantity (donor-specific log-normal)
- Expiry Hours → Urgency Level (threshold-based)
- Distance + Capacity + Category → Matched NGO (scoring function)
