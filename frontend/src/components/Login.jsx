import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserType }) => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    setUserType(type);
    if (type === 'organizer') navigate('/organizer');
    else navigate('/student-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Bits Hacks</h2>
        <p className="text-center text-gray-600 mb-8">Please log in as:</p>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('organizer')}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Organizer
          </button>
          <button
            onClick={() => handleLogin('student')}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
