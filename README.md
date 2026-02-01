# DNA Sequence-Based Disease Prediction

This project uses machine learning to analyze DNA sequences and predict the likelihood of genetic diseases. It aims to assist early diagnostics by identifying patterns in DNA associated with various inherited conditions.

## Objective

- Analyze and process raw DNA sequence data.
- Extract key features from the sequences (e.g., nucleotide frequencies, k-mer analysis).
- Train and evaluate machine learning models for disease prediction.

## Technologies Used

- **Language**: Python  
- **Libraries**: 
  - [Biopython](https://biopython.org/) – for handling DNA sequences
  - Scikit-learn – for ML models
  - NumPy & Pandas – for data manipulation
  - Matplotlib – for visualization
- **Models Used**: SVM, Random Forest, CNN

## Dataset

- DNA sequence data obtained from public sources such as:
  - [NCBI GenBank](https://www.ncbi.nlm.nih.gov/genbank/)
  - [Kaggle Genetic Datasets](https://www.kaggle.com/)
  
Each sample was labeled as either **healthy** or **disease-prone**, based on genetic markers.

## Features Extracted

- K-mer frequency vectors (e.g., 3-mer, 4-mer counts)
- GC content percentage
- Sequence length
- Nucleotide distribution (A, T, C, G)

## Model Training & Evaluation

- Split data into training and test sets (80:20).
- Trained models: SVM, Random Forest, and a simple CNN.
- Evaluation metrics: Accuracy, Precision, Recall, F1-score

### Final Results

| Model        | Accuracy |
|--------------|----------|
| SVM          | 82%      |
| Random Forest| 85%      |
| CNN          | 87%      |

## Outcome

- Developed a pipeline to predict genetic disease risk using DNA sequences.
- Achieved high accuracy in classifying disease-prone vs. healthy samples.
- The project demonstrates the potential of using DNA for early disease prediction.

## Future Work

- Include more diverse datasets.
- Implement deep learning models (e.g., LSTM or transformers for sequential data).
- Deploy a web-based tool for user input and prediction.

