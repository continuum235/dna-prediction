import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onSubmit }) => {
  const [sequence, setSequence] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSequence(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', sequence);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await axios.post(
        `${apiUrl}/classify`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true // Include credentials for cross-origin requests
        }
      );
      setClassificationResult(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error("Error classifying sequence:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
    <h1 className="text-4xl font-bold p-3 text-center">Mutation Detection</h1>
      <form onSubmit={handleSubmit}>
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
          Predict
        </button>

      </form>

      {classificationResult && (
        <div className="mt-4 text-gray-300">
          <h3>
            Mutation Detected: {String(classificationResult.predicted_class)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default InputForm;