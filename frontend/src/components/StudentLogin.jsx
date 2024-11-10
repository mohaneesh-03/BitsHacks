import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data.student, "std")
      const studentid = data.student._id;

      if (response.status === 200) {
        console.log("navigating...")
        navigate(`/student/${studentid}`, {state: data.student}); // Navigate to Student Dashboard
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
