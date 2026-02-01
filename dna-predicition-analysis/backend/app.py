from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score, f1_score, classification_report

app = Flask(__name__)
CORS(app)

# Load the dataset from a CSV file
df = pd.read_csv("dna.csv")

# Clean the data: remove sequences with invalid characters or too short
def is_valid_sequence(seq):
    """Check if sequence is valid DNA (only contains A, T, C, G and is at least 4 chars)"""
    if not isinstance(seq, str) or len(seq) < 4:
        return False
    return all(c in 'ATCG' for c in seq.upper())

# Filter valid sequences
df['Sequence'] = df['Sequence'].astype(str).str.upper()
valid_mask = df['Sequence'].apply(is_valid_sequence)
df = df[valid_mask].reset_index(drop=True)

print(f"Loaded {len(df)} valid DNA sequences")

# Extract features and labels
X = df["Sequence"]
y = df["Mutation"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


def get_kmers(sequence, k=4):
    """Generate k-mers from a DNA sequence"""
    return [sequence[i:i+k] for i in range(len(sequence) - k + 1)]


def train_model(X_train, y_train):
    """Train logistic regression model with CountVectorizer"""
    if len(X_train) == 0:
        raise ValueError("No training data available")
    
    # Check if sequences are long enough for 4-grams
    min_length = min(len(seq) for seq in X_train)
    if min_length < 4:
        raise ValueError(f"Sequences too short for 4-grams. Minimum length: {min_length}")
    
    # Use custom analyzer to generate k-mers (4-grams) from DNA sequences
    cv = CountVectorizer(analyzer=lambda x: get_kmers(x, 4))
    X_train_transformed = cv.fit_transform(X_train)
    
    if X_train_transformed.shape[1] == 0:
        raise ValueError("No features extracted. Check if sequences contain valid characters.")

    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train_transformed, y_train)

    return model, cv


def detect_mutations(sequence, model, cv):
    sequence_transformed = cv.transform([sequence])
    prediction = model.predict(sequence_transformed)

    if prediction[0] == 1:
        return {"mutation_detected": True}
    else:
        return {"mutation_detected": False}


@app.route("/")
def index():
    return "Mutation Detection"


@app.route("/detect_mutations", methods=["POST"])
def detect_sequence_mutations():
    data = request.json
    if "sequence" in data:
        sequence = data["sequence"]
        # Train the model on the updated dataset (with the new sequence)
        X_train_updated = np.append(X_train, sequence)
        y_train_updated = np.append(y_train, 1)  # Assuming the sequence is a mutation

        model, cv = train_model(X_train_updated, y_train_updated)

        # Calculate accuracy and confusion matrix on the test set
        X_test_transformed = cv.transform(X_test)
        y_pred = model.predict(X_test_transformed)
        accuracy = accuracy_score(y_test, y_pred)
        conf_matrix = confusion_matrix(y_test, y_pred).tolist()

        # Detect mutations for the provided sequence
        result = detect_mutations(sequence, model, cv)
        result["accuracy"] = accuracy
        result["confusion_matrix"] = conf_matrix

        return jsonify(result), 200
    else:
        return jsonify({"error": "Sequence not provided."}), 400


@app.route("/performance_analysis", methods=["GET"])
def get_performance_analysis():
    try:
        # Train the model
        model, cv = train_model(X_train, y_train)
        
        # Make predictions on test set
        X_test_transformed = cv.transform(X_test)
        y_pred = model.predict(X_test_transformed)
        
        # Calculate metrics
        accuracy = float(accuracy_score(y_test, y_pred))
        
        # For binary classification
        precision = float(precision_score(y_test, y_pred, average='binary', zero_division=0))
        recall = float(recall_score(y_test, y_pred, average='binary', zero_division=0))
        f1 = float(f1_score(y_test, y_pred, average='binary', zero_division=0))
        
        # Confusion matrix
        conf_matrix = confusion_matrix(y_test, y_pred).tolist()
        
        # Classification report
        class_report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        
        # Additional model information
        # Get feature importance (top 10 features)
        feature_names = cv.get_feature_names_out()
        
        # Handle coefficients properly for binary classification
        if len(model.coef_.shape) > 1:
            coefficients = model.coef_[0]
        else:
            coefficients = model.coef_
        
        # Get top features
        top_features_idx = np.argsort(np.abs(coefficients))[-10:]
        top_features = [(str(feature_names[i]), float(coefficients[i])) for i in top_features_idx]
        
        result = {
            "accuracy": round(accuracy, 4),
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "f1_score": round(f1, 4),
            "confusion_matrix": conf_matrix,
            "classification_report": class_report,
            "model_info": {
                "algorithm": "Logistic Regression",
                "feature_extraction": "CountVectorizer (4-gram)",
                "training_samples": len(X_train),
                "test_samples": len(X_test),
                "total_features": len(feature_names),
                "top_features": top_features
            },
            "dataset_info": {
                "total_sequences": len(df),
                "mutation_count": int(df["Mutation"].sum()),
                "normal_count": int(len(df) - df["Mutation"].sum())
            }
        }
        
        return jsonify(result), 200
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in performance_analysis: {error_details}")
        return jsonify({"error": str(e), "details": error_details}), 500


if __name__ == "__main__":
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)