"use client"

import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onSubmit }) => {
  const [sequence, setSequence] = useState("");
  const [classificationResult, setClassificationResult] = useState(null);
  const [accuracy, setAccuracy] = useState("");
  const [confMatrix, setConfMatrix] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setSequence(fileContent);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/detect_mutations",
        {
          sequence,
        }
      );
      console.log(response.data);
      setAccuracy(response.data.accuracy);
      setConfMatrix(response.data.confusion_matrix);
      setClassificationResult(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error("Error detecting mutations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="m-8 items-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500 text-left">
          What is Mutation Detection?
        </h1>
        <p className="text-xl">
          Mutation detection is the process of identifying changes or
          alterations in the genetic material (DNA) of an organism. These
          changes can occur spontaneously or as a result of external factors
          like radiation or chemicals. By detecting mutations, scientists can
          understand how genetic diseases develop, track the evolution of
          organisms, and identify potential targets for treatments or
          interventions.
        </p>

        <div className="flex">
          <div className="w-2/3 ">
            <br />
            <h1 className="text-3xl font-bold text-blue-500 text-left">
              How to use our Mutation Detection Model?
            </h1>
            <p className="text-xl">
              <div class="flex flex-col md:flex-row items-center justify-center">
                <div class="w-full text-center md:text-justify m-6">

                  <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
                    1. Find a Human DNA Sequence File:
                  </h1>
                  <p>
                    You can obtain human DNA sequence data from various sources
                    such as public databases like NCBI GenBank or Ensembl.
                    Alternatively, you can generate your own DNA sequence data
                    using laboratory techniques like PCR amplification and
                    sequencing.
                  </p>
                  <br></br>

                  <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
                    2. Ensure the File Format and Format Validation:
                  </h1>

                  <p>
                    Once you have the DNA sequence file, ensure that it is in a
                    compatible format, such as FASTA or plain text. Check that
                    the file is well-formatted and does not contain any errors
                    or inconsistencies.
                  </p>
                  <br></br>

                  <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
                    3. Load the File by Browsing Your System:
                  </h1>
                  <p>
                    Click on the button to open a file browsing dialog on your
                    system. Browse to the location where the DNA sequence file
                    is stored on your computer. Select the file by clicking on
                    it and then click "Open". The logistic regression model is
                    then trained on these transformed feature vectors.
                  </p>
                  <br></br>
                  <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
                    4. Implement the Predict Functionality:
                  </h1>
                  <p>
                    Once you uploads the DNA sequence file, click on the
                    "Predict" button that triggers the model. After the
                    prediction is complete, the results are displayed.
                  </p>
                </div>
              </div>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 border rounded-xl w-1/3"
          >
            <h1 className="text-4xl font-bold p-4 text-center shadow-xl">
              Mutation Detection
            </h1>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="w-full mt-4 p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
            />

            <button
              type="submit"
              className="block w-full mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-600 border rounded-md"
            >
              {isLoading ? "Processing..." : "Predict"}
            </button>

            {classificationResult && (
              <div className="mt-4 text-gray-300 font-semibold border rounded-3xl p-8 text-xl">
                <h1>Results:</h1>
                <h3>
                  Mutation Detected:{" "}
                  {String(classificationResult.mutation_detected)}
                </h3>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="flex flex-initial">
        <div className="w-2/5 p-12">
          <img src="mutation.jpg" className="rounded-xl shadow-2xl" />
          <figcaption className="text-lg text-gray-300 mt-2 text-center">
            Fig. Mutation Detected
          </figcaption>
        </div>

        <div className="w-3/5 m-6">
          <h1 class="text-5xl font-bold text-blue-400 shadow-xl">
            The Process Behind Mutation Detection{" "}
          </h1>
          <br />

          <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
            1. Data Loading and Preprocessing
          </h1>
          <p>
            The dataset containing DNA sequences and their associated labels is
            loaded from a CSV file. Each sequence is represented as a string,
            while the labels are converted to a string data type for
            consistency.
          </p>
          <br></br>

          <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
            2. Data Splitting
          </h1>

          <p>
            The dataset is split into training and testing sets using the{" "}
            <code>train_test_split</code> function from scikit-learn. This
            splitting is essential for evaluating the model's performance on
            unseen data.{" "}
          </p>
          <br></br>

          <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
            3. Model Training
          </h1>
          <p>
            The <code class="font-bold">'train_model'</code> function is
            employed to train a logistic regression model using the training
            data. This function utilizes the CountVectorizer to transform the
            sequences into feature vectors suitable for model training. The
            logistic regression model is then trained on these transformed
            feature vectors.
          </p>
          <br></br>
          <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
            4. Mutation Detection Process
          </h1>
          <p>
            The <code>classify_gene_sequence</code> route facilitates mutation
            detection. Upon receiving a DNA sequence via a POST request, this
            route re-trains the model on the updated dataset. The new sequence
            is appended to the training data, and the mode of existing labels is
            appended to the target labels to maintain consistency.
          </p>

          <br></br>
          <h1 class="text-2xl font-bold text-blue-500 shadow-xl">
            5. Classification of DNA Sequences
          </h1>
          <p>
            The model classifies the provided DNA sequence using the{" "}
            <code>classify_gene</code> function. This function predicts the
            class or label of the sequence based on the trained logistic
            regression model.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputForm;