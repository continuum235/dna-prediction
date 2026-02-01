# Performance Analysis Setup Guide

## What Was Changed

### Backend Changes (app.py)

#### 1. Added New Imports
```python
from sklearn.metrics import precision_score, recall_score, f1_score, classification_report
```

#### 2. Created New Endpoint: `/performance_analysis`
This endpoint provides comprehensive model performance metrics including:

- **Performance Metrics:**
  - Accuracy
  - Precision
  - Recall
  - F1 Score

- **Confusion Matrix:**
  - Shows actual vs predicted classifications

- **Model Information:**
  - Algorithm used (Logistic Regression)
  - Feature extraction method (CountVectorizer with 4-grams)
  - Training and test sample counts
  - Total features extracted
  - Top 10 most important features (4-grams with highest coefficients)

- **Dataset Information:**
  - Total sequences
  - Mutation count
  - Normal sequence count

- **Classification Report:**
  - Per-class precision, recall, F1-score, and support

### Frontend Changes (performance_analysis/page.js)

Completely redesigned the performance analysis page to:

1. **Fetch Real Data:** Uses axios to call the backend API at `http://localhost:5000/performance_analysis`

2. **Display Comprehensive Metrics:**
   - Model information card with algorithm details
   - Dataset statistics
   - Four key metrics in color-coded cards (Accuracy, Precision, Recall, F1 Score)
   - Dynamic confusion matrix based on actual data
   - Top 10 most important features table
   - Detailed classification report per class

3. **Error Handling:** Shows user-friendly error messages if backend is not running

4. **Loading States:** Provides visual feedback while fetching data

## How to Run

### 1. Start the Backend Server

```bash
cd c:\dna-prediction\dna-predicition-analysis\backend
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Start the Frontend Server

```bash
cd c:\dna-prediction\dna-predicition-analysis\frontend
npm run dev
```

The frontend will run on `http://localhost:3000` (or another port if 3000 is busy)

### 3. Access Performance Analysis

1. Open your browser to `http://localhost:3000/performance_analysis`
2. Click the "View Model Performance" button
3. The page will fetch and display real-time performance metrics from your model

## API Endpoint Details

### GET /performance_analysis

**Response Structure:**
```json
{
  "accuracy": 0.95,
  "precision": 0.94,
  "recall": 0.96,
  "f1_score": 0.95,
  "confusion_matrix": [[TP, FP], [FN, TN]],
  "classification_report": {...},
  "model_info": {
    "algorithm": "Logistic Regression",
    "feature_extraction": "CountVectorizer (4-gram)",
    "training_samples": 800,
    "test_samples": 200,
    "total_features": 5000,
    "top_features": [["ATGC", 2.34], ...]
  },
  "dataset_info": {
    "total_sequences": 1000,
    "mutation_count": 500,
    "normal_count": 500
  }
}
```

## Features

✅ **Real-time Analysis:** Calculates metrics on-demand based on actual model performance
✅ **Comprehensive Metrics:** Shows all standard ML classification metrics
✅ **Feature Importance:** Displays the most important 4-grams used for classification
✅ **Visual Design:** Color-coded cards and tables for easy reading
✅ **Error Handling:** User-friendly error messages
✅ **Responsive Design:** Works on different screen sizes

## For Deployment

When deploying to production:

1. **Update the API URL in frontend:**
   Replace `http://localhost:5000/performance_analysis` with your deployed backend URL
   
2. **Use Environment Variables:**
   Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```
   
   Then update the axios call:
   ```javascript
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/performance_analysis`);
   ```

3. **Enable CORS on Backend:**
   Already configured with `CORS(app)`, but you may need to specify allowed origins:
   ```python
   CORS(app, origins=["https://your-frontend-domain.com"])
   ```

## Troubleshooting

### Error: "Failed to fetch performance data"
- Make sure the backend server is running on port 5000
- Check that `dna.csv` exists in the backend directory
- Verify CORS is enabled in backend

### Frontend shows old hardcoded data
- Clear browser cache
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Backend returns 500 error
- Check if `dna.csv` is properly formatted
- Verify all required Python packages are installed:
  ```bash
  pip install flask flask-cors numpy pandas scikit-learn
  ```

## Next Steps

Consider adding:
- ROC curve visualization
- Precision-Recall curve
- Feature importance visualization (bar chart)
- Model comparison if you train multiple models
- Export functionality to download reports as PDF/CSV
