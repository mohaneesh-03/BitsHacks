import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination, Autoplay } from 'swiper';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StudentDashboard = () => {
  const {studentid} = useParams();
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();
  const [events, setEvent] = useState([]);
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
  

  fetch("http://localhost:5000/api/hackathons")
    .then(async function(res){
      const json = await res.json();
      setEvent(json);
    })

  // Hardcoded data for the carousel and event lists
  const featuredEvents = [
    { id: 1, name: 'Hackathon A', description: 'An exciting 48-hour hackathon.', image: 'https://via.placeholder.com/800x400' },
    { id: 2, name: 'Hackathon B', description: 'Solve real-world problems.', image: 'https://via.placeholder.com/800x400' },
    { id: 3, name: 'Hackathon C', description: 'Build innovative solutions.', image: 'https://via.placeholder.com/800x400' },
  ];

  const upcomingEvents = events;


  const participatedEvents = [
    { id: 3, name: 'Web3 Hackathon', date: 'Oct 5, 2024' },
    { id: 4, name: 'Data Science Sprint', date: 'Sep 10, 2024' },
  ];

  const handleEventClick = (eventId) => {
    navigate(`/register/${eventId}`, {state : student});
  };

  if (!student) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Carousel for Featured Events */}
      {/* <div className="mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-lg shadow-lg"
        >
          {featuredEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative h-64 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-2xl font-bold">{event.name}</h2>
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div>
        <h1 className="font-semibold text-3xl py-10">Welcome {student?.name}</h1>  
      </div>

      {/* Tabs for Upcoming and Participated Events */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex border-b-2 mb-6">
          <button
            className={`w-1/2 py-3 text-lg ${activeTab === 'upcoming' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`w-1/2 py-3 text-lg ${activeTab === 'participated' ? 'border-b-4 border-green-500 text-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('participated')}
          >
            Participated Events
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'upcoming' && (
          <div>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  
                  <li
                    key={event._id || index} // Use event._id if available, otherwise fallback to index
                    className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer" //handleEventClick(event._id)
                    onClick={() => handleEventClick(event._id)}
                  > 
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="text-gray-600">Duration: {event.duration}</p>
                    {/* <p className="text-gray-600">Team Size: {event.teamsize}</p>
                    <p className="text-gray-600">Prize: {event.prizes}</p> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming events</p>
            )}
          </div>
        )}

        {activeTab === 'participated' && (
          <div>
            {participatedEvents.length > 0 ? (
              <ul className="space-y-4">
                {participatedEvents.map((event) => (
                  <li key={event.id} className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="text-gray-600">Date: {event.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No participated events</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
