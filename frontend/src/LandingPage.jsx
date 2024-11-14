import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope,FaPlus,FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './App.css';

// Import local images for each section
import homeImage from './assets/home-page.jpeg';
import exploreHackathonsImage from './assets/explore-hackathons-image.jpeg';
import aboutUsImage from './assets/about-us-image.jpg';
import howItWorksImage from './assets/how-it-works-image.jpeg';
import faqHelpCenterImage from './assets/faq-help-center-image.jpeg';
import blogsResourcesImage from './assets/blogs-resources-image.jpeg';
import contactUsImage from './assets/contact-us-image.jpeg';

const sections = [
  { id: 'home', text: 'Home' },
  { id: 'explore-hackathons', text: 'Explore Hackathons' },
  { id: 'about-us', text: 'About Us' },
  { id: 'how-it-works', text: 'How it Works' },
  { id: 'faq-help-center', text: 'FAQ / Help Center' },
  { id: 'blogs-resources', text: 'Blogs / Resources' },
  { id: 'contact-us', text: 'Contact Us' },
];

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [activeQuestion, setActiveQuestion] = useState(null);
    // const [isIntroDone, setIsIntroDone] = useState(false);
  // Smooth scrolling and active link update
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.clientHeight > scrollPos) {
          setActiveSection(section.id);
        }
      });
    };
   
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
//   useEffect(() => {
//     // Set timeout for the intro section animation
//     const timer = setTimeout(() => {
//       setIsIntroDone(true);
//     }, 5000); // Assuming animation time is 5 seconds

//     return () => clearTimeout(timer);
//   }, []);
  const toggleAnswer = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null); // Close answer if it's already open
    } else {
      setActiveQuestion(index); // Open new answer
    }
  };
  
  return (
    <div className="relative text-white font-sans min-h-screen scroll-smooth">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-indigo-800 shadow-xl sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-white hover:text-yellow-300 cursor-pointer">
          BITS Hacks
        </h1>
        <button
          className="text-3xl text-white md:hidden focus:outline-none hover:text-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className="hidden md:flex space-x-5">
          {sections.map((section) => (
            <NavLink
              key={section.id}
              id={section.id}
              text={section.text}
              isActive={activeSection === section.id}
            />
          ))}
          <NavLink text="Login" highlight />
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col bg-indigo-700 text-center py-6 space-y-4 md:hidden">
          {sections.map((section) => (
            <NavLink
              key={section.id}
              id={section.id}
              text={section.text}
              isActive={activeSection === section.id}
            />
          ))}
          <NavLink text="Login" highlight />
        </div>
      )}
      <motion.section
        className="intro-section h-screen flex justify-center items-center bg-gradient-to-b from-indigo-900 to-indigo-700 text-center z-50"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="intro-content text-center">
          {/* Animated BITS Hacks with Framer Motion */}
          <motion.h1
            className="text-8xl font-extrabold text-yellow-300"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{fontSize:"150px"}}
          >
            BITS Hacks
          </motion.h1>
          {/* Animated Tagline with Framer Motion */}
          <motion.p
            className="text-2xl text-white mt-4"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          >
            Where ideas meet innovation
          </motion.p>
        </div>
      </motion.section>
      {/* Page Content with Divider Sections */}
      <main className="">
        <Section
          id="home"
          title="Home"
          content="Discover and participate in exciting hackathons designed for every skill level. Whether you're passionate about AI, web development, or blockchain, our platform offers events that let you innovate, connect, and grow."
          additionalContent="Get ready to join a global community of developers, designers, and creators. Explore our hackathons and find the perfect match for your skills and interests."
          image={homeImage} // Use local image
          bgColor="bg-gradient-to-b from-indigo-900 to-indigo-700"
          imageLeft={false}
        />
        <Section
          id="explore-hackathons"
          title="Explore Hackathons"
          content="Browse a range of hackathons across various categories. Our platform connects you with top organizations hosting events focused on real-world challenges, skill-building, and networking opportunities."
          additionalContent="Find hackathons by category, skill level, and theme. Stay updated with real-time deadlines and team information so you never miss an opportunity to showcase your talent."
          image={exploreHackathonsImage} // Use local image
          bgColor="bg-gradient-to-b from-purple-800 to-indigo-600"
          imageLeft={true}
        />
        <Section
          id="about-us"
          title="About Us"
          content="We are a passionate team focused on bridging the gap between talent and innovation. By hosting hackathons with industry leaders, we aim to cultivate a thriving tech community where ideas turn into impactful solutions."
          additionalContent="Partnered with leading tech companies, our platform connects you with experts, mentors, and potential collaborators, providing a holistic hackathon experience."
          image={aboutUsImage} // Use local image
          bgColor="bg-gradient-to-t from-indigo-600 to-purple-800"
          imageLeft={false}
        />
        <Section
  id="how-it-works"
  title="How it Works"
  content={
    <div>
      <p className="text-lg mb-4">Getting started is easy! Follow these simple steps:</p>
      <ol className="list-decimal pl-8 text-lg">
        <li>Create an account on the platform.</li>
        <li>Browse the list of upcoming hackathons.</li>
        <li>Register for an event that interests you.</li>
        <li>Start forming a team or join an existing one and start working!.</li>
      </ol>
      <p className="mt-4 text-lg">We ensure a smooth, engaging experience for participants and organizers alike. Whether you're joining as an individual or forming a team, our platform supports your journey from start to finish.</p>
    </div>
  }
  image={howItWorksImage} // Use local image
  bgColor="bg-gradient-to-b from-indigo-700 to-indigo-500"
  imageLeft={true}
/>

        <Section
          id="faq-help-center"
          title="FAQ / Help Center"
          content="Have questions? Our Help Center provides answers to common queries"
          additionalContent=""
          image={faqHelpCenterImage} // Use local image
          bgColor="bg-gradient-to-b from-indigo-800 to-blue-600"
          imageLeft={false}
        >
          {/* FAQ Section */}
          <div className="space-y-4">
            <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(0)}
              >
                <h3 className="text-md font-semibold">What is BITS Hacks?</h3>
                <div className="text-xl">
                  {activeQuestion === 0 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {activeQuestion === 0 && (
                <p className="mt-4 text-md text-gray-800">
                  BITS Hacks is a platform where developers, designers, and creators come together to participate in hackathons and innovate on exciting challenges.
                </p>
              )}
            </div>

            <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(1)}
              >
                <h3 className="text-md font-semibold">How do I register for a hackathon?</h3>
                <div className="text-xl">
                  {activeQuestion === 1 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {activeQuestion === 1 && (
                <p className="mt-4 text-md text-gray-800">
                  You can register for a hackathon by creating an account on the platform, browsing through the available events, and then signing up for the one you’re interested in.
                </p>
              )}
            </div>

            <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(2)}
              >
                <h3 className="text-md font-semibold">Do I need a team to participate?</h3>
                <div className="text-xl">
                  {activeQuestion === 2 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {activeQuestion === 2 && (
                <p className="mt-4 text-md text-gray-800">
                  No, you can participate as an individual, or you can form a team with other participants to collaborate on a project.
                </p>
              )}
            </div>

            <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(3)}
              >
                <h3 className="text-md font-semibold">Are there any prizes?</h3>
                <div className="text-xl">
                  {activeQuestion === 3 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {activeQuestion === 3 && (
                <p className="mt-4 text-md text-gray-800">
                  Yes, many hackathons offer exciting prizes for the winners. These can include cash prizes, internships, and sponsorships from leading companies.
                </p>
              )}
            </div>
          </div>
        </Section>

        <Section
          id="blogs-resources"
          title="Blogs / Resources"
          content="Stay updated with the latest trends in technology, hackathons, and innovation. Our blog features articles on topics like coding tips, industry news, and success stories from previous events."
          additionalContent="Explore resources that will help you grow your skills and prepare for upcoming hackathons. Our platform offers free educational materials and tools for all participants."
          image={blogsResourcesImage} // Use local image
          bgColor="bg-gradient-to-b from-blue-700 to-indigo-700"
          imageLeft={true}
        />
        <Section
          id="contact-us"
          title="Contact Us"
          content="Have suggestions or feedback? Reach out to us, and we’d love to hear from you! Our team is here to assist with any inquiries you have regarding hackathons, the platform, or partnership opportunities."
          image={contactUsImage} // Use local image
          bgColor="bg-gradient-to-b from-indigo-800 to-indigo-600"
          imageLeft={false}
        >
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Email Card */}
            <div className="bg-white text-indigo-900 p-6 rounded-xl shadow-md flex items-center space-x-4">
              <FaEnvelope className="text-4xl" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-md">contact@bitshacks.com</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white text-indigo-900 p-6 rounded-xl shadow-md flex items-center space-x-4">
              <FaPhone className="text-4xl" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-md">+1 (123) 456-7890</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-6 mt-8">
            <a href="https://www.facebook.com/BITSHacks" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-yellow-300" />
            </a>
            <a href="https://twitter.com/BITSHacks" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-yellow-300" />
            </a>
            <a href="https://www.linkedin.com/company/bitshacks" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl hover:text-yellow-300" />
            </a>
            <a href="https://www.instagram.com/bitshacks" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-yellow-300" />
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
};

// NavLink Component with active state style
const NavLink = ({ id, text, isActive, highlight }) => {
  const navigate = useNavigate();

  // Handle navigation for the "Login" button
  const handleClick = () => {
    if (text === "Login") {
      navigate('/app');
    }
  };

  // Conditional rendering for the "Login" button
  if (text === "Login") {
    return (
      <button
        onClick={handleClick}
        className={`text-lg p-2 rounded transition-all duration-300 ease-in-out hover:bg-yellow-300 hover:text-indigo-900 ${
          highlight ? 'bg-yellow-300 text-indigo-900 px-4 py-2 rounded-md shadow-lg' : ''
        }`}
      >
        {text}
      </button>
    );
  }

  // For other links, render as usual with anchor tags
  return (
    <a
      href={`#${id}`}
      className={`text-lg p-2 rounded transition-all duration-300 ease-in-out hover:bg-yellow-300 hover:text-indigo-900 ${
        isActive ? 'bg-yellow-300 text-indigo-900 font-bold' : ''
      } ${highlight ? 'bg-yellow-300 text-indigo-900 px-4 py-2 rounded-md shadow-lg' : ''}`}
    >
      {text}
    </a>
  );
};

// Section Component
const Section = ({ id, title, content, additionalContent, image, bgColor, children, imageLeft }) => (
  <section id={id} className={`${bgColor} text-white px-8 text-center md:text-left flex flex-col md:flex-row items-center py-12`} style={{ marginBottom: '0' }}>
    <div className={`md:w-1/2 space-y-6 py-20 px-6 ${imageLeft ? 'md:order-2' : ''}`}>
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-lg">{content}</p>
      {additionalContent && <p className="text-md">{additionalContent}</p>}
      {children}
    </div>
    <img
      src={image}
      alt={title}
      className="md:w-1/2 w-full rounded-lg shadow-md mt-8 md:mt-0 object-contain"
      style={{ height: '350px' }}
    />
  </section>
);

export default LandingPage;
