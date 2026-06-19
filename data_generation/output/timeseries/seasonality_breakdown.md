# Seasonality Breakdown -- AI Food Redistribution Platform

## 1. Weekly Seasonality

**Design**: Monday = distribution day (highest demand); Sunday = rest day (lowest).
**Amplitude**: ±8%

| Day | Avg Meals Requested | vs. Weekly Mean |
|-----|--------------------|----|
| Monday | 3,300 | -3.5% |
| Tuesday | 3,119 | -8.8% |
| Wednesday | 3,269 | -4.4% |
| Thursday | 3,533 | +3.3% |
| Friday | 3,670 | +7.3% |
| Saturday | 3,623 | +5.9% |
| Sunday | 3,429 | +0.3% |

**Key Insight**: Monday demand is ~-3.5% above weekly mean.
Sunday demand is ~0.3% below weekly mean.

---

## 2. Monthly Seasonality (Day-of-Month)

**Design**: Salary-day spike on days 1-3 (monthly salary credited -> food purchases surge).
**Amplitude**: ±5%

- Days 1-3: +8% above monthly mean (salary effect)
- Days 15-20: ~±0% (stable mid-month)
- Days 28-31: slight dip (pre-salary depletion)

---

## 3. Yearly Seasonality (Calendar Month)

**Design**: Lean season peaks in May-July (pre-monsoon heat + crop gap).
Harvest abundance in October-December (post-monsoon surplus).
**Amplitude**: ±15%

| Month | Avg Meals Requested | vs. Annual Mean |
|-------|--------------------|----|
| January | 2,812 | -17.7% ← Winter Cold |
| February | 2,757 | -19.3% ← Winter Cold |
| March | 2,901 | -15.1% |
| April | 2,982 | -12.7% |
| May | 3,765 | +10.2% ← Lean Season Peak |
| June | 3,626 | +6.2% ← Lean Season Peak |
| July | 4,364 | +27.8% ← Lean Season Peak |
| August | 4,198 | +22.9% |
| September | 4,218 | +23.5% |
| October | 3,966 | +16.1% ← Harvest Surplus |
| November | 2,786 | -18.4% ← Harvest Surplus |
| December | 2,611 | -23.6% ← Harvest Surplus |

---

## 4. Festival Impact

**Indian Calendar Events**: 17 festivals modelled with demand boosts.
**Average festival demand lift**: +42.1% vs. normal days

| Festival Type | Typical Boost | Mechanism |
|--------------|--------------|-----------|
| Diwali | +55% | Mass community food distribution |
| Eid ul-Fitr / ul-Adha | +50% | Charity (Zakat/Sadaqah) food sharing |
| Ganesh Chaturthi | +45% | Community feasts, prasad distribution |
| Holi | +40% | Community meals, colour festivals |
| Makar Sankranti / Pongal | +30-35% | Harvest gratitude food sharing |
| Republic / Independence Day | +20% | Government food programs spike |

---

## 5. Disaster Impact

**Average disaster demand lift**: +195.5% vs. non-disaster days

| Event Type | Duration | Peak Demand Multiplier | Recovery Period |
|-----------|----------|----------------------|-----------------|
| Cyclone | 3-10 days | 2.8x | 20 days |
| Flood | 10-25 days | 2.2x | 15 days |
| Heatwave | 5-15 days | 1.6x | 5 days |
| Drought | 30-90 days | 1.8x | 30 days |

**Disaster signature shapes**:
- **Cyclone**: Sharp spike (day 1-3), rapid onset, 14-day decay
- **Flood**: Gradual 3-day rise -> 7-10 day plateau -> 14-day decline
- **Drought**: Slow sustained elevation over 30-90 days, minimal daily variation

---

## 6. Long-Term Demand Growth

**Annual growth rate**: 2.0% (compounding)

| Year | Avg Meals Requested | YoY Growth |
|------|--------------------|----|
| 2021 | 3,278 | nan% |
| 2022 | 3,379 | +3.1% |
| 2023 | 3,445 | +1.9% |
| 2024 | 3,539 | +2.7% |
| 2025 | 3,461 | -2.2% |

**Growth drivers**:
1. Population growth (1.2% per year)
2. Increasing program awareness and registration
3. Climate stress compounding over years
4. NGO expansion partially dampening unmet demand

---

## 7. NGO Expansion Effect

**Annual NGO growth rate**: 15% (sigmoid expansion)
**Per-NGO demand dampening**: 4%

The growing NGO presence partially offsets demand growth -- the gap between
`Meals_Requested` and `Meals_Distributed` narrows year-over-year.

---

## 8. Interaction Effects

| Interaction | Effect | Example |
|------------|--------|---------|
| Festival x Disaster | Demand 2.5-4x normal | Festival during cyclone relief |
| Heatwave x Lean Season | Demand 1.8-2.2x | May heatwave in arid region |
| Winter x Rural | Demand +25% | Cold wave in Bihar rural |
| Monsoon x Coastal | Demand +30% | Flood in Kerala coastal area |
