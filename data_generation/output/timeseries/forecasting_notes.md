# Forecasting Notes -- AI Food Redistribution Platform

## Dataset Summary

| Property | Value |
|----------|-------|
| Records (train + test) | 90,877 |
| Regions | 50 |
| Date Range | 2021-01-01 -> 2025-12-31 |
| Granularity | Daily |
| Target Variable | `Meals_Requested` |
| Avg Meals Requested | 3,421 |
| Std Dev | 4,593 |
| Festival Days | 21.9% of records |
| Disaster Days | 20.4% of records |

---

## Train / Test Split (Temporal)

> [!IMPORTANT]
> **Always use temporal splitting** for time series models. Random splits cause data leakage.

| Split | Date Range | Purpose |
|-------|-----------|---------|
| Train | 2021-01-01 -> 2024-12-31 | Model training |
| Test  | 2025-01-01 -> 2025-12-31 | Out-of-sample evaluation |
| Future | 2026-01-01 -> 2026-03-31 | Synthetic holdout for real deployment |

---

## ARIMA / SARIMA

### Recommended Setup
```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
import pandas as pd

# Load single-region series
df = pd.read_csv("train_timeseries.csv")
region = df[df["Region_ID"] == "R01"].set_index("Date")["Meals_Requested"]
region.index = pd.to_datetime(region.index)
region = region.asfreq("D")  # Enforce daily frequency (fill gaps with ffill)
region = region.fillna(method="ffill")

# SARIMA with weekly seasonality (s=7) + yearly (365 proxy via differencing)
model = SARIMAX(
    region,
    order=(2, 1, 2),          # (p, d, q) -- adjust via AIC/BIC grid search
    seasonal_order=(1, 1, 1, 7),  # weekly pattern
    exog=None,                # optionally add Festival_Flag, Disaster_Flag
    enforce_stationarity=False,
    enforce_invertibility=False,
)
result = model.fit(disp=False)
forecast = result.forecast(steps=30)
```

### Tips
- Run ADF test first: `from statsmodels.tsa.stattools import adfuller`
- `d=1` (first differencing) is usually sufficient
- For yearly seasonality, use **Fourier terms** as exogenous regressors (see Prophet section)
- Exogenous variables that improve ARIMA: `Festival_Flag`, `Disaster_Flag`, `Temperature`

### Per-Region vs Aggregate
- Train one SARIMA model **per region** (50 models total)
- Use `Region_ID` as a panel key, not a feature

---

## Prophet (Facebook/Meta)

### Recommended Setup
```python
from prophet import Prophet
import pandas as pd

df = pd.read_csv("train_timeseries.csv")
region = df[df["Region_ID"] == "R01"][["Date", "Meals_Requested"]].copy()
region.columns = ["ds", "y"]  # Prophet requires these names
region["ds"] = pd.to_datetime(region["ds"])

model = Prophet(
    seasonality_mode="multiplicative",  # Demand spikes are multiplicative
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,            # Not enough intra-day data
    changepoint_prior_scale=0.05,       # Lower = less flexible trend
)

# Add Indian festival regressors
model.add_regressor("Festival_Flag")
model.add_regressor("Disaster_Flag")
model.add_regressor("Temperature")

# Add country holidays (India)
model.add_country_holidays(country_name="IN")

model.fit(region.merge(
    df[df["Region_ID"] == "R01"][["Date", "Festival_Flag", "Disaster_Flag", "Temperature"]],
    left_on="ds", right_on="Date"
))

# Forecast
future = model.make_future_dataframe(periods=365)
# NOTE: Fill future regressor values with expected values
forecast = model.predict(future)
```

### Tips
- `seasonality_mode="multiplicative"` is critical -- disaster spikes are proportional, not additive
- Use `add_seasonality(name="monthly", period=30.5, fourier_order=3)` for salary-day effect
- Changepoints will naturally detect COVID-like structural breaks in demand

---

## LSTM (Long Short-Term Memory)

### Data Preparation
```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

df = pd.read_csv("train_timeseries.csv")
region = df[df["Region_ID"] == "R01"].sort_values("Date").reset_index(drop=True)

# Features for LSTM
feature_cols = [
    "Meals_Requested",     # target (also used as lag feature)
    "Temperature",
    "Rainfall",
    "Festival_Flag",
    "Disaster_Flag",
    "Food_Availability_Index",
]

# Handle missing timestamps (interpolate)
region["Date"] = pd.to_datetime(region["Date"])
region = region.set_index("Date").asfreq("D")
region[feature_cols] = region[feature_cols].interpolate(method="linear")

scaler = MinMaxScaler()
scaled = scaler.fit_transform(region[feature_cols])

# Create sliding window sequences
LOOKBACK = 60   # Use past 60 days to predict next day
HORIZON  = 7    # Forecast 7 days ahead

X, y = [], []
for i in range(LOOKBACK, len(scaled) - HORIZON):
    X.append(scaled[i - LOOKBACK:i])
    y.append(scaled[i:i + HORIZON, 0])  # target = Meals_Requested (col 0)

X, y = np.array(X), np.array(y)  # shapes: (N, 60, 6) and (N, 7)
```

### Recommended Architecture
```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.LSTM(128, return_sequences=True, input_shape=(LOOKBACK, len(feature_cols))),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.LSTM(64, return_sequences=False),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(HORIZON),  # Multi-step output
])
model.compile(optimizer="adam", loss="mse", metrics=["mae"])
```

### Tips
- `LOOKBACK=60` captures monthly + weekly cycles well
- Normalize per-region (not globally) -- demand scales differ by 10-100x
- For multi-region training: embed `Region_ID` as a learnable embedding layer
- Use **teacher forcing** during training for multi-step forecasts
- Evaluate with **SMAPE** (symmetric MAPE) -- robust to near-zero values

---

## Multi-Region Panel Approach (All 50 Regions)

For LSTM/Transformer models that learn across all regions simultaneously:

```python
# Add region embedding
region_ids = sorted(df["Region_ID"].unique())
region_to_idx = {r: i for i, r in enumerate(region_ids)}
df["region_idx"] = df["Region_ID"].map(region_to_idx)

# Input: [sequence_features, region_embedding]
# This allows the model to learn shared patterns + region-specific adjustments
```

---

## Evaluation Metrics

| Metric | Formula | Notes |
|--------|---------|-------|
| **RMSE** | √(mean((ŷ - y)²)) | Standard; penalises large errors |
| **MAE** | mean(|ŷ - y|) | Robust to outliers |
| **SMAPE** | mean(2|ŷ-y| / (|ŷ|+|y|)) | Scale-independent; good for food demand |
| **MASE** | MAE / MAE_naïve | Compares to naïve 1-day-lag baseline |

---

## Known Data Characteristics

1. **Missing timestamps**: ~0.5% per region (fill with `ffill` or interpolation)
2. **Outlier demand spikes**: Disaster + festival days can be 2-5x normal
3. **Non-stationarity**: Long-term upward trend at ~2% per year
4. **Heteroscedasticity**: Variance scales with demand level (use log-transform or multiplicative models)
5. **Seasonality stack**: Weekly + monthly + yearly patterns compound multiplicatively
