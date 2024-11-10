import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './components/login';
import OrganizerDashboard from './components/OrganizerDashboard';
import StudentDashboard from './components/StudentDashboard';
import JoinOrCreateTeam from './components/JoinOrCreateTeam';
import RegisterEvent from './components/RegisterEvent';
import './App.css'
import StudentLogin from './components/StudentLogin';
import EventScreen from './components/EventScreen';

function App() {
  const [userType, setUserType] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setUserType={setUserType} />} />
          {userType === 'organizer' && (
            <Route path="/organizer" element={<OrganizerDashboard />} />
          )}
          {userType === 'student' && (
            <Route path="/student-login" element={<StudentLogin />} />
          )}
          <Route path="/event/:eventId" element={<EventScreen />} />
          <Route path="/student/:studentid" element={<StudentDashboard />} />
          <Route path="/hackathon/:eventId" element={<JoinOrCreateTeam />} />
          <Route path="/register/:eventId" element={<RegisterEvent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
