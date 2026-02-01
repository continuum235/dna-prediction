from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS from flask_cors module
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset from a CSV file
df = pd.read_csv('labels.csv')

# Convert label column to string data type
df['label'] = df['label'].astype(str)

# Extract features and labels
X = df['sequence']
y = df['label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def train_model(X_train, y_train):
    cv = CountVectorizer(ngram_range=(4, 4))
    X_train_transformed = cv.fit_transform(X_train)

    model = LogisticRegression()
    model.fit(X_train_transformed, y_train)

    return model, cv

def classify_gene(sequence, model, cv):
    sequence_transformed = cv.transform([sequence])
    prediction = model.predict(sequence_transformed)
    
    return prediction[0]

@app.route('/')
def index():
    return 'Gene Classification'

@app.route('/classify_gene', methods=['POST'])
def classify_gene_sequence():
    data = request.json
    if 'sequence' in data:
        sequence = data['sequence']
        # Train the model on the updated dataset (with the new sequence)
        X_train_updated = np.append(X_train, sequence)
        y_train_updated = np.append(y_train, y_train.mode()[0])  # Append the mode of existing labels

        model, cv = train_model(X_train_updated, y_train_updated)

        # Calculate accuracy and confusion matrix on the test set
        X_test_transformed = cv.transform(X_test)
        y_pred = model.predict(X_test_transformed)
        accuracy = accuracy_score(y_test, y_pred)
        conf_matrix = confusion_matrix(y_test, y_pred).tolist()

        # Classify gene for the provided sequence
        predicted_class = classify_gene(sequence, model, cv)
        result = {
            'predicted_class': predicted_class,
            'accuracy': accuracy,
            'confusion_matrix': conf_matrix
        }
        print("accuracy")
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Sequence not provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Specify port to run the Flask app on