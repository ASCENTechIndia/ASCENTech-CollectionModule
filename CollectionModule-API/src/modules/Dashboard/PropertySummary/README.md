# Property Summary Dashboard API

This module provides comprehensive collection data and summary statistics through a single consolidated endpoint.

## Endpoints

### Get Complete Dashboard Data
**GET** `/property-summary/dashboard`

Returns all dashboard data including 7-day trends, prabhag-wise summary, year-wise comparison, and count summaries in one response.

**Response:**
```json
{
  "last7DaysPaywise": [
    {
      "REC_DATE": "2026-05-20",
      "OFFLINE_AMT": 50000,
      "ONLINE_AMT": 30000
    }
  ],
  "last7DaysTrend": [
    {
      "REC_DATE": "2026-05-20",
      "TOTAL_AMT": 80000
    }
  ],
  "last7DaysReceiptCount": [
    {
      "REC_DATE": "2026-05-20",
      "REC_COUNT": 150
    }
  ],
  "prabhagwiseSummary": [
    {
      "PRABHAG": "Circle 1",
      "OUTSTANDING": 1000000,
      "DEMAND": 500000,
      "COLLECTION": 300000,
      "PERCENTAGE": 60.0
    }
  ],
  "yearwiseComparison": [
    {
      "PRBHAG": "Circle 1",
      "CURRENT_YEAR_AMT": 5000000,
      "AMT_25_26": 5000000,
      "AMT_24_25": 4500000,
      "AMT_23_24": 4000000,
      "AMT_22_23": 3500000
    }
  ],
  "counts": {
    "todaysTotal": 80000,
    "offlineAmount": 50000,
    "onlineAmount": 30000,
    "totalAmount": 2000000,
    "totalReceipt": 5000
  }
}
```

---

## Data Sections

### Last 7 Days Payment-wise Data
- **REC_DATE**: Receipt date
- **OFFLINE_AMT**: Collection via offline methods
- **ONLINE_AMT**: Collection via online methods

### Last 7 Days Trend
- **REC_DATE**: Receipt date
- **TOTAL_AMT**: Total collection amount for the day

### Last 7 Days Receipt Count
- **REC_DATE**: Receipt date
- **REC_COUNT**: Number of receipts for the day

### Prabhag-wise Summary
- **PRABHAG**: Zone/Circle name
- **OUTSTANDING**: Outstanding collection amount
- **DEMAND**: Demand amount
- **COLLECTION**: Collected amount
- **PERCENTAGE**: Collection percentage

### Year-wise Comparison
- **PRBHAG**: Zone/Circle name
- **CURRENT_YEAR_AMT**: Current year collection
- **AMT_25_26**: 2025-26 collection amount
- **AMT_24_25**: 2024-25 collection amount
- **AMT_23_24**: 2023-24 collection amount
- **AMT_22_23**: 2022-23 collection amount

### Collection Counts
- **todaysTotal**: Today's collection amount
- **offlineAmount**: Total offline collection (Payment types: 0, 1, 3)
- **onlineAmount**: Total online collection (Payment types: 6, 5, 2, 9)
- **totalAmount**: Grand total of all collections
- **totalReceipt**: Total number of receipts

---

## Database Views Used

1. **vw_totalcolln_paywise_last7dys** - Collection data by payment method for last 7 days
2. **vw_totalcolln_trend_last7dys** - Total collection trend for last 7 days
3. **vw_reccnt_last7dys** - Receipt count for last 7 days
4. **vw_prabhagwise_summary** - Summary statistics by Prabhag
5. **yearwise_comparison** - Year-over-year comparison data
6. **aoms_rec_mas** - Receipt master table for count queries

---

## Database Queries

### Today's Total Collection
```sql
SELECT SUM(num_rec_amount) as todays_total 
FROM aoms_rec_mas 
WHERE TRUNC(date_rec_receiptdt) = TRUNC(SYSDATE)
```

### Offline Amount (Payment Types: 0, 1, 3)
```sql
SELECT SUM(NVL(num_rec_amount, 0)) as offline_amt
FROM aoms_rec_mas
WHERE num_rec_amttype IN (0, 1, 3)
```

### Online Amount (Payment Types: 6, 5, 2, 9)
```sql
SELECT SUM(num_rec_amount) as online_amt
FROM aoms_rec_mas
WHERE num_rec_amttype IN (6, 5, 2, 9)
```

### Total Collection Amount
```sql
SELECT SUM(NVL(num_rec_amount, 0)) as total_amt
FROM aoms_rec_mas
```

### Total Receipt Count
```sql
SELECT COUNT(var_rec_recno) as total_receipt
FROM aoms_rec_mas
```

---

## Authentication

The endpoint requires authentication. Include the authentication token in the request header.

## Error Handling

API follows standard HTTP status codes:
- `200` - Success
- `400` - Bad Request / Data Fetch Failed
- `401` - Unauthorized
- `500` - Internal Server Error
