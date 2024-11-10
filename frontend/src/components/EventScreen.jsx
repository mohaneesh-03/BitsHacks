import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const EventScreen = () => {
  const { eventId } = useParams();
  const location = useLocation();

  const [eventDetails, setEventDetails] = useState({});
  const [teamDetails, setTeamDetails] = useState({});
  const [members, setMembers] = useState([]);


  // Get event and team details passed from the previous screen
  useEffect(() => {

    const fetchsome = async () => {
      const response = await fetch('http://localhost:5000/api/events/hackathon', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventid: eventId,
          })
      });
      const data = await response.json();
      const event = await data.hackathon;
      setEventDetails(event);
      if (location.state) {
        setTeamDetails(location.state.team);
      }
    }
    fetchsome();
  }, [location]);

  console.log(teamDetails);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Page</h1>
      {/* Team Details */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Team Name: {teamDetails?.teamName}</h2>
        {/* <p className="text-lg text-gray-600">Members: {members.length}</p> */}
      </div>
      {/* Event Details */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Name: {eventDetails.name}</h2>
        <p className="text-lg text-gray-600">Duration: {eventDetails.duration}</p>
        <p className="text-lg text-gray-600">Type: {eventDetails.type}</p>
        <p className="text-lg text-gray-600">Team Size: {eventDetails.teamsize}</p>
        <p className="text-lg text-gray-600">Prizes: {eventDetails.prizes}</p>
        <p className="text-lg text-gray-600">Status: {eventDetails.status}</p>
      </div>

      
        
      
      {/* {teamDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Team</h3>
          <p className="text-lg text-gray-600">Team Name: {teamDetails.teamName}</p>
          <p className="text-lg text-gray-600">Team ID: {teamDetails._id}</p>
          {teamDetails.members && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Members:</h4>
              <ul className="list-disc ml-6">
                {teamDetails.members.map((member, index) => (
                  <li key={index} className="text-gray-600">{member}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default EventScreen;
