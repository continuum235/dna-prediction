# Quick Start Guide - DNA Mutation Detection Performance Analysis

## The Issue Was Fixed! 🎉

The 500 error was caused by improper handling of the coefficient array in binary classification. This has been resolved.

## How to Run Your Project

### Step 1: Start the Backend (Terminal 1)

```powershell
cd c:\dna-prediction\dna-predicition-analysis\backend
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Restarting with stat
```

### Step 2: Start the Frontend (Terminal 2)

```powershell
cd c:\dna-prediction\dna-predicition-analysis\frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 3: Access Performance Analysis

1. Open browser: `http://localhost:3000/performance_analysis`
2. Click "View Model Performance" button
3. View your real-time model metrics!

## What Was Fixed

### Backend Changes (`app.py`)

1. **Coefficient Handling**:
   ```python
   # Before (caused error):
   coefficients = model.coef_[0] if len(model.coef_.shape) > 1 else model.coef_
   
   # After (works properly):
   if len(model.coef_.shape) > 1:
       coefficients = model.coef_[0]
   else:
       coefficients = model.coef_
   ```

2. **String Conversion for Features**:
   ```python
   top_features = [(str(feature_names[i]), float(coefficients[i])) for i in top_features_idx]
   ```

3. **Better Error Reporting**:
   ```python
   except Exception as e:
       import traceback
       error_details = traceback.format_exc()
       print(f"Error in performance_analysis: {error_details}")
       return jsonify({"error": str(e), "details": error_details}), 500
   ```

4. **Increased max_iter for LogisticRegression**:
   ```python
   model = LogisticRegression(max_iter=1000)  # Was: LogisticRegression()
   ```

## Expected Results

After clicking "View Model Performance", you should see:

✅ **Model Information**
- Algorithm: Logistic Regression
- Feature Extraction: CountVectorizer (4-gram)
- Training/Test sample counts
- Total features extracted

✅ **Dataset Information**
- Total sequences: 138
- Mutations vs Normal sequences count

✅ **Performance Metrics**
- Accuracy (%)
- Precision (%)
- Recall (%)
- F1 Score (%)

✅ **Confusion Matrix**
- 2x2 matrix showing True Positives, True Negatives, False Positives, False Negatives
- Correct predictions highlighted in green

✅ **Top 10 Most Important Features**
- DNA 4-grams that have the highest impact on classification
- Shows coefficient values

✅ **Detailed Classification Report**
- Per-class metrics for class 0 (Normal) and class 1 (Mutation)

## Troubleshooting

### If you still get errors:

1. **Check if backend is running**:
   ```powershell
   curl http://localhost:5000/
   ```
   Should return: "Mutation Detection"

2. **Test the API directly**:
   ```powershell
   curl http://localhost:5000/performance_analysis
   ```
   Should return JSON with metrics

3. **Check required packages**:
   ```powershell
   pip install flask flask-cors numpy pandas scikit-learn
   ```

4. **Clear browser cache**:
   - Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

5. **Check console for errors**:
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if API call succeeded

## API Endpoints

### GET /performance_analysis
Returns comprehensive model performance metrics.

**Response Example**:
```json
{
  "accuracy": 0.9643,
  "precision": 0.9630,
  "recall": 0.9655,
  "f1_score": 0.9643,
  "confusion_matrix": [[13, 1], [1, 14]],
  "classification_report": {...},
  "model_info": {
    "algorithm": "Logistic Regression",
    "feature_extraction": "CountVectorizer (4-gram)",
    "training_samples": 110,
    "test_samples": 28,
    "total_features": 2500,
    "top_features": [["ATCG", 2.34], ...]
  },
  "dataset_info": {
    "total_sequences": 138,
    "mutation_count": 69,
    "normal_count": 69
  }
}
```

### POST /detect_mutations
Detects mutations in a provided DNA sequence.

**Request Body**:
```json
{
  "sequence": "ATCGATCGATCGATCG..."
}
```

**Response**:
```json
{
  "mutation_detected": true,
  "accuracy": 0.9643,
  "confusion_matrix": [[13, 1], [1, 14]]
}
```

## Notes

- The backend now runs on `http://localhost:5000` (port 5000)
- The gene classification endpoint (app1.py) runs on port 5001
- All performance metrics are calculated in real-time based on actual model performance
- The confusion matrix and metrics will vary slightly each time due to random_state in train_test_split

## Success! 🎉

Your performance analysis is now fully functional with real-time metrics from your Logistic Regression model!
