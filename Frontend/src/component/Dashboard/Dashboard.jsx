import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [questions, setQuestions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseName, courseCode, questions }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'question_paper.pdf';
      a.click();
    } else {
      console.error('Failed to generate PDF');
    }
  };

  return (
    <div className="container">
      <form className='dashboard_form' onSubmit={handleSubmit}>
        <div className="dashboard_container">
        <div className="label">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="label">
          <label>Course Code:</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className="label">
          <label>Questions:</label>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Generate PDF</button>

        </div>
        
      </form>
      <div className="dashboard">
        <h1>Welcome Back Chief</h1>
        <button onClick={() => navigate('/register')}>Sign Out</button>
      </div>
    </div>
  );
}

export default Dashboard;
