import React, { useEffect, useState } from 'react';

const OrganiserDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/hackathons")
    .then(async function(res){
      const json = await res.json();
      setEvents(json)
    })
  })

  const Events = events;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    duration: '',
    type: '',
    teamsize: '',
    prizes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEventObject = {
      id: events.length + 1,
      ...newEvent,
    };
    setEvents([...events, newEventObject]);
    setNewEvent({ name: '', duration: '', type: '', teamsize: '', prizes: ''});
    setIsFormOpen(false);
    alert('Event created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Organiser Dashboard</h2>

        {/* Existing Events List */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Your Events</h3>
          {Events.length > 0 ? (
            <ul className="space-y-6">
            {Events.map((event) =>(
              <li key={event.id} className="p-6 bg-gray-200 rounded-lg shadow flex flex-col space-y-2">
                <h4 className="text-xl font-medium">{event.name}</h4>
                <p><strong>Duration:</strong> {event.duration}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Team Size:</strong> {event.teamsize}</p>
                <p><strong>Prize Pool:</strong> {event.prizes}</p>
              </li>
            ))}
          </ul>
          ) : (
            <p className="text-gray-500">No events created yet.</p>
          )}
        </div>

        {/* Button to Create a New Event */}
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create New Event
          </button>
        )}

        {/* Form to Create a New Event */}
        {isFormOpen && (
          <form onSubmit={handleCreateEvent} className="mt-8 space-y-6">
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="text"
              name="duration"
              value={newEvent.duration}
              onChange={handleInputChange}
              placeholder="Duration (e.g., 3 Days)"
              className="w-full p-3 border rounded"
              required
            />
            <select
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
            <input
              type="number"
              name="teamsize"
              value={newEvent.teamsize}
              onChange={handleInputChange}
              placeholder="Max Team Size"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="text"
              name="prizes"
              value={newEvent.prizes}
              onChange={handleInputChange}
              placeholder="Prize Pool (e.g., $1000)"
              className="w-full p-3 border rounded"
              required
            />

            <button
              onClick={()=>{
                console.log(newEvent.name);
                fetch("http://localhost:5000/api/hackathons/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // Set the correct content type
                  },
                  body: JSON.stringify({
                    name: newEvent.name,
                    duration: newEvent.duration,
                    teamsize: newEvent.teamsize,
                    type: newEvent.type,
                    prizes: newEvent.prizes
                  })
                })
              }}
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Create Event
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrganiserDashboard;
