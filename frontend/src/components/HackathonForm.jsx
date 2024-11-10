import React, { useState } from 'react';

const HackathonForm = ({ addHackathon }) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    type: '',
    teamSize: '',
    prizePool: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHackathon(formData);
    setFormData({ name: '', duration: '', type: '', teamSize: '', prizePool: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Hackathon Name" onChange={handleChange} value={formData.name} required />
      <input name="duration" placeholder="Duration" onChange={handleChange} value={formData.duration} required />
      <input name="type" placeholder="Type" onChange={handleChange} value={formData.type} required />
      <input name="teamSize" placeholder="Team Size" onChange={handleChange} value={formData.teamSize} required />
      <input name="prizePool" placeholder="Prize Pool" onChange={handleChange} value={formData.prizePool} required />
      <button type="submit">Create Hackathon</button>
    </form>
  );
};

export default HackathonForm;
