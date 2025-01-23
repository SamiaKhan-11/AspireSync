'use client';

import React, { useState } from 'react';
import ResumeUpload from '@/components/ResumeUpload';
// import ParsedResumeCard from '@/components/ParsedResumeCard';

const ResumePage = () => {
  const [parsedData, setParsedData] = useState(null); // To store parsed resume data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/resume/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse resume');
      }

      const result = await response.json();
      setParsedData(result.data); // Store parsed data in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload and Parse Resumes</h1>
      {/* Resume Upload Component */}
      <ResumeUpload onFileUpload={handleFileUpload} />

      {/* Display loading, error, or parsed data */}
      {loading && <p className="text-gray-600 mt-4">Uploading and analyzing...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {parsedData && (
        <div className="mt-6">
          <ParsedResumeCard data={parsedData} />
        </div>
      )}
    </div>
  );
};

export default ResumePage;
