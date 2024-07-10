import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JournalTracker = () => {
  const [student, setStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/student-info', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student info:', error);
      }
    };

    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/journals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchStudentInfo();
    fetchJournals();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/upload-journal', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('File uploaded successfully.');
      setFile(null);

     
      const response = await axios.get('/api/journals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJournals(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }
  };

  return (
    <div className="p-6 bg-background-blue">
    {student ? (
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Student Information</h2>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
      </div>
    ) : (
      <p>Loading student information...</p>
    )}
  
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4">Upload Journal</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-button-blue text-white px-4 py-2 rounded mt-2 hover:bg-opacity-75">
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  
    <div className="bg-white shadow-md rounded p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Uploaded Journals</h2>
      {journals.length > 0 ? (
        <ul>
          {journals.map((journal, index) => (
            <li key={index}>
              <a href={journal.url} download={journal.name} className="text-blue-500 hover:underline">
                {journal.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No journals uploaded yet.</p>
      )}
    </div>
  </div>
  
  );
};

export default JournalTracker;
