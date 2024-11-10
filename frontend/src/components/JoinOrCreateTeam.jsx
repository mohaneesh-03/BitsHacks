import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const JoinOrCreateTeam = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState('join');
  const [teams, setTeams] = useState([
    // { id: 1, name: 'Team Alpha' },
    // { id: 2, name: 'Team Beta' },
    // { id: 3, name: 'Team Gamma' },
  ]);
  const [newTeam, setNewTeam] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  fetch(`http://localhost:5000/api/teams/${eventId}`)
    .then(async function(res){
      const json = await res.json();
      setTeams(json);
    })


  const handleJoinTeam = async (teamId) => {
    const response = fetch('http://localhost:5000/api/students/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentid: student._id,
          hackathon: eventId,
          team: teamId
        })
    })

    const response1 = await fetch('http://localhost:5000/api/events/team', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idteam: teamId
        })
    })

    const data = await response1.json();
    const team = await data.team;
    console.log(team);

    navigate(`/event/${eventId}`, {
      state: {
        team: team
      }
    });

    alert(`Joined team with ID: ${teamId}`);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (newTeam.trim() === '') {
      alert('Please enter a valid team name');
      return;
    }
    const newTeamObject = { id: teams.length + 1, name: newTeam };
    setTeams([...teams, newTeamObject]);
    setNewTeam('');
    fetch(`http://localhost:5000/api/teams/create`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName: newTeamObject.name,
        hackathonId: eventId,
        members: [{name: student.name}]
      })
    })
    
    const response = await fetch('http://localhost:5000/api/teams/getid', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: newTeamObject.name
        })
    })

    const data = await response.json();
    console.log(await data.team);
    const id = await data.team._id;
    console.log(id);
    // const id = await data.team._id;
    // console.log(id);
    // setIsFormOpen(false);
    // alert(`Team "${newTeamObject.name}" created successfully!`);
    handleJoinTeam(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Event {eventId} - Team Management</h2>

        {/* Tabs Navigation */}
        <div className="flex mb-8 border-b-2 border-gray-300">
          <button
            className={`w-1/2 py-3 ${activeTab === 'join' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('join')}
          >
            Join a Team
          </button>
          <button
            className={`w-1/2 py-3 ${activeTab === 'create' ? 'border-b-4 border-green-500 text-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('create')}
          >
            Create a Team
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'join' && (
          <div>
            {/* Join a Team Tab */}
            <h3 className="text-2xl font-semibold mb-4">Available Teams</h3>
            <ul className="space-y-4">
              {teams.map((team) => (
                <li key={team.id} className="p-4 bg-gray-200 rounded-lg shadow flex justify-between items-center">
                  <span className="text-lg font-medium">{team.teamName}</span>
                  <p className="text-sm font-thin">No. of members: {team.members.length}</p>
                  <button
                    onClick={() => handleJoinTeam(team._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            {/* Create a Team Tab */}
            {!isFormOpen ? (
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create New Team
              </button>
            ) : (
              <form onSubmit={handleCreateTeam} className="mt-6 space-y-4">
                <input
                  type="text"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  placeholder="Enter Team Name"
                  className="w-full p-3 border rounded"
                  required
                />
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create Team
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinOrCreateTeam;
