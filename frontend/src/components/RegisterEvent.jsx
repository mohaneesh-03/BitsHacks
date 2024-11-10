import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
  });
  const location = useLocation();
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      // console.log("mohaneesh", location.state); 
      if (location.state) {
        // If location.state is a Promise, await it
        const resolvedState = (location.state);
        // console.log(location.state, "asd");
        setStudent(resolvedState);
      }
    };

    fetchStudentData();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Registration Successful!');
    navigate(`/hackathon/${eventId}`, {state: student});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register for Event {eventId}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full p-3 border rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full p-3 border rounded" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full p-3 border rounded" required />
          <select name="expertise" value={formData.expertise} onChange={handleInputChange} className="w-full p-3 border rounded" required>
            <option value="">Select Expertise</option>
            <option value="web">Web</option>
            <option value="app">App</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="design">Design</option>
          </select>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;
