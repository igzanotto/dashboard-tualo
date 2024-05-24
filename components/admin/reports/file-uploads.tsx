"use client"
import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/file/upload', { fileUrl });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      setResult({ error: 'Failed to upload file' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="Enter file URL"
          required
        />
        <button type="submit">Upload File</button>
      </form>
      {result && (
        <div>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
