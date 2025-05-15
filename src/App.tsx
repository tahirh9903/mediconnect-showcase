import React, { useEffect, useRef, useState } from "react";
import "./index.css";

export default function App() {
  // tracking all elements viewability
  const [footerVisible, setFooterVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [techStackVisible, setTechStackVisible] = useState(false);
  
  // tracking slide effect
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [overscrollDirection, setOverscrollDirection] = useState(null); 

  const [expandedMember, setExpandedMember] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ref for animated elements
  const footerRef = useRef(null);
  const teamRef = useRef(null);
  const featuresRef = useRef(null);
  const techStackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let overscrollTimeout = null;
    
    const checkElementVisibility = (element, setVisibleFn) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        // if you want footer to be seen earlier, increase number from "10"
        const isVisible = rect.top < window.innerHeight - 10 && rect.bottom > 0;
        setVisibleFn(isVisible);
      }
    };
    
    const handleWheel = (e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // overscroll detection (top)
      if (scrollTop === 0 && e.deltaY < 0) {
        setIsOverscrolling(true);
        setOverscrollDirection('top');
        
        if (overscrollTimeout) clearTimeout(overscrollTimeout);
        overscrollTimeout = setTimeout(() => {
          setIsOverscrolling(false);
        }, 800);
      }
      
      // overscroll detection (bottom)
      if (scrollTop + clientHeight >= scrollHeight - 10 && e.deltaY > 0) {
        setIsOverscrolling(true);
        setOverscrollDirection('bottom');
        
        if (overscrollTimeout) clearTimeout(overscrollTimeout);
        overscrollTimeout = setTimeout(() => {
          setIsOverscrolling(false);
        }, 800); 
      }
    };
    
    const handleScroll = () => {
      checkElementVisibility(featuresRef.current, setFeaturesVisible);
      checkElementVisibility(techStackRef.current, setTechStackVisible);
      checkElementVisibility(teamRef.current, setTeamVisible);
      checkElementVisibility(footerRef.current, setFooterVisible);
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (!isOverscrolling || overscrollDirection !== 'bottom') {
          setIsOverscrolling(true);
          setOverscrollDirection('bottom');
          
          if (overscrollTimeout) clearTimeout(overscrollTimeout);
          overscrollTimeout = setTimeout(() => {
            setIsOverscrolling(false);
          }, 800);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel);

    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (overscrollTimeout) clearTimeout(overscrollTimeout);
    };
  }, [isOverscrolling, overscrollDirection]);

  const slideClass = isOverscrolling 
    ? overscrollDirection === 'top' 
      ? 'slide-from-top' 
      : 'slide-from-bottom'
    : '';


  // expanded state for team member
  const toggleMember = (name) => {
    if (expandedMember === name) {
      setExpandedMember(null);
    } else {
      setExpandedMember(name);
    }
  };
  
    // team members data details
  const teamMembers = [
    {
      name: "Tahir Hossain",
      points: [
        "Upcoming graduate at NYIT with a strong interest in full stack software engineering, DevOps, and scalable system design. I’ve created and contributed to projects where I developed and maintained web applications using React, Node.js, and Firebase, while also setting up CI/CD pipelines with GitHub Actions to streamline testing and deployment. I’m passionate about building efficient, user-friendly applications and aim to pursue a career in software engineering that bridges development and deployment through modern DevOps practices."
      ]
    },
    {
      name: "Muntashir Hossain",
      points: [
        "Upcoming graduate at NYIT with a strong interest in front-end development, mobile applications, and user experience design. I have experience working on cross-platform mobile apps using React Native and improved UI responsiveness across devices. I’m passionate about building intuitive, visually appealing interfaces and plan to pursue a career focused on front-end engineering and mobile-first application development."
      ]
    },
    {
      name: "Sadman Shipar",
      points: [
        "A senior Computer Science student at NYIT in the 4+1 program, with a strong interest in cybersecurity, cloud computing, and software development. I’ve interned twice at Constellation, where I worked on vulnerability management and application security using tools like Tenable and Wireshark."
      ]
    },
    {
      name: "Mohammed Tanjid",
      points: [
        "Upcoming graduate at NYIT with a strong interest in systems administration, networking, and IT support. I’ve interned at WebMD, where I managed user accounts, configured network hardware, and supported cloud-based infrastructure using tools like Active Directory and AWS. I’m passionate about keeping systems running efficiently and securely, and I aim to pursue a career in IT operations, infrastructure management, and cloud services."
      ]
    },
    {
      name: "Rajansher Khera",
      points: [
        "Upcoming graduate at NYIT with a strong interest in databases, data engineering, and backend development. I enjoy working on optimizing SQL queries, managing ETL pipelines, and designing relational schemas for enterprise reporting."
      ]
    }
  ];
  
    return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gray-100 p-6 ${slideClass}`}
    >
      <div className="max-w-4xl mx-auto text-center fade-up">
        <img
          src="/assets/mediconnect.png"
          alt="App Logo"
          className="w-[400px] mx-auto mb-4 shadow-none bg-transparent"
        />
        <h1 className="text-4xl font-bold mb-4">MediConnect</h1>
        <p className="text-lg text-gray-600 mb-6">
          Our mobile medical app empowers patients to seamlessly connect with doctors and pharmacies, book appointments, and manage their healthcare from one convenient platform.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://github.com/tahirh9903/firebase-auth-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            GitHub
          </a>
          <a
            href="https://your-app-demo-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Demo
          </a>
        </div>

        <div 
          ref={featuresRef}
          className={`grid md:grid-cols-2 gap-6 mb-8 ${featuresVisible ? 'content-visible' : 'content-hidden'} ${slideClass}`}
        >
          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-left text-gray-700">
              <li>Communicate with doctors and pharmacists</li>
              <li>Schedule appointments</li>
              <li>Manage prescriptions</li>
            </ul>
          </div>

          <div 
            ref={techStackRef}
            className={`bg-white p-4 shadow rounded-xl ${techStackVisible ? 'content-visible' : 'content-hidden'} ${slideClass}`}
          >
            <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
            <ul className="list-disc list-inside text-left text-gray-700">
              <li>React Native</li>
              <li>Firebase</li>
              <li>Expo</li>
              <li>Typescript</li>
            </ul>
          </div>
        </div>

        <div 
          ref={teamRef}
          className={`bg-white p-4 shadow rounded-xl ${teamVisible ? 'content-visible' : 'content-hidden'} ${slideClass}`}
        >
          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <ul className="text-gray-700">
            {teamMembers.map((member, index) => (
              <li key={index} className="mb-2">
                <div className="flex items-center justify-center">
                  <strong>{member.name}</strong>
                  <button 
                    onClick={() => toggleMember(member.name)}
                    className="ml-2 focus:outline-none transition-transform duration-300 ease-in-out"
                    aria-label={`Toggle details for ${member.name}`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transform ${expandedMember === member.name ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                {expandedMember === member.name && (
                  <div className="mt-2 px-4 py-2 bg-gray-50 rounded-lg text-center animate-dropdown">
                    <p className="text-sm text-gray-700">
                      {member.points.join(' ')}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ height: "10px" }}></div>
        
        <footer 
          ref={footerRef} 
          className={`mt-10 text-gray-500 text-sm ${footerVisible ? 'content-visible' : 'content-hidden'} ${slideClass}`}
        >
          &copy; {new Date().getFullYear()} MediConnect. Built for our senior project.
        </footer>
      </div>
    </div>
  );
}