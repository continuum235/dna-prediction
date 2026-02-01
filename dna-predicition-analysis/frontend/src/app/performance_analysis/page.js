"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const ModelPerformance = () => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);

  const handleViewPerformance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch actual performance data from backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/performance_analysis`);
      setPerformanceData(response.data);
      setShowMetrics(true);
    } catch (err) {
      setError('Failed to fetch performance data. Make sure the backend server is running.');
      console.error('Error fetching performance data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">  
    <div className='p-8 w-full'>
    <h1 className="text-4xl font-bold mb-4 text-blue-500 text-justify">
    Model Performance Analysis
  </h1>
      <div className="mb-4">
        <button 
          onClick={handleViewPerformance}
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View Model Performance'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showMetrics && !isLoading && performanceData && (
        <div>
          {/* Model Information */}
          <div className="mb-6 bg-blue-50 p-4 rounded">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Model Information</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-900">
              <p><strong className="text-gray-900">Algorithm:</strong> {performanceData.model_info?.algorithm}</p>
              <p><strong className="text-gray-900">Feature Extraction:</strong> {performanceData.model_info?.feature_extraction}</p>
              <p><strong className="text-gray-900">Training Samples:</strong> {performanceData.model_info?.training_samples}</p>
              <p><strong className="text-gray-900">Test Samples:</strong> {performanceData.model_info?.test_samples}</p>
              <p><strong className="text-gray-900">Total Features:</strong> {performanceData.model_info?.total_features}</p>
            </div>
          </div>

          {/* Dataset Information */}
          <div className="mb-6 bg-green-50 p-4 rounded">
            <h3 className="text-xl font-bold mb-3 text-green-700">Dataset Information</h3>
            <div className="grid grid-cols-3 gap-2 text-gray-900">
              <p><strong className="text-gray-900">Total Sequences:</strong> {performanceData.dataset_info?.total_sequences}</p>
              <p><strong className="text-gray-900">Mutations:</strong> {performanceData.dataset_info?.mutation_count}</p>
              <p><strong className="text-gray-900">Normal:</strong> {performanceData.dataset_info?.normal_count}</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-purple-100 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-purple-700">{(performanceData.accuracy * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-blue-100 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Precision</p>
                <p className="text-2xl font-bold text-blue-700">{(performanceData.precision * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-green-100 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Recall</p>
                <p className="text-2xl font-bold text-green-700">{(performanceData.recall * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-orange-100 p-4 rounded text-center">
                <p className="text-sm text-gray-600">F1 Score</p>
                <p className="text-2xl font-bold text-orange-700">{(performanceData.f1_score * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>

          {/* Confusion Matrix */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Confusion Matrix</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-gray-800">Actual / Predicted</th>
                    {performanceData.confusion_matrix.map((_, idx) => (
                      <th key={idx} className="border border-gray-300 px-4 py-2 text-gray-800">Class {idx}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {performanceData.confusion_matrix.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Class {rowIdx}</td>
                      {row.map((value, colIdx) => (
                        <td 
                          key={colIdx} 
                          className={`border border-gray-300 px-4 py-2 text-center text-gray-900 ${
                            rowIdx === colIdx ? 'bg-green-100 font-bold' : ''
                          }`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              * Diagonal values (highlighted in green) represent correct predictions
            </p>
          </div>

          {/* Top Features */}
          {performanceData.model_info?.top_features && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Top 10 Most Important Features (4-grams)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Rank</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Feature (4-gram)</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Coefficient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.model_info.top_features.reverse().map((feature, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 px-4 py-2 text-center text-gray-900 font-semibold">{idx + 1}</td>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900 font-bold">{feature[0]}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">{feature[1].toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Classification Report Details */}
          {performanceData.classification_report && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Detailed Classification Report</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Class</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Precision</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Recall</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">F1-Score</th>
                      <th className="border border-gray-300 px-4 py-2 text-gray-800">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(performanceData.classification_report).map(([key, value]) => {
                      if (typeof value === 'object' && value.precision !== undefined) {
                        return (
                          <tr key={key} className="bg-white">
                            <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">{key}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">{(value.precision * 100).toFixed(2)}%</td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">{(value.recall * 100).toFixed(2)}%</td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">{(value['f1-score'] * 100).toFixed(2)}%</td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">{value.support}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default ModelPerformance;