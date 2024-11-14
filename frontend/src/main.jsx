import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx'
import OrganizerDashboard from './components/OrganizerDashboard';
import StudentDashboard from './components/StudentDashboard';
import JoinOrCreateTeam from './components/JoinOrCreateTeam';
import RegisterEvent from './components/RegisterEvent';
import StudentLogin from './components/StudentLogin';
import EventScreen from './components/EventScreen';


function Root() {
  // State to manage user type
  const [userType, setUserType] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        {/* Pass setUserType to the Login component */}
        <Route path="/app" element={<Login setUserType={setUserType} />} />

        {/* Conditionally render routes based on userType */}
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
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Root/>
  </StrictMode>,
)
