import pandas as pd

# Load your DataFrame
df = pd.read_csv('label_1.csv')  # Replace 'your_data.csv' with your actual file path

# Check column names
print(df.columns)

# Print DataFrame
print(df.head())

# Attempt to access the 'sequence' column
try:
    X = df['sequence']
    print(X.head())  # Print the first few rows of the 'sequence' column
except KeyError:
    print("Column 'sequence' does not exist in the DataFrame.")
