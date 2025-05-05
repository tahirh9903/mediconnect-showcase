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
            <li><strong>Tahir Hossain</strong></li>
            <li><strong>Muntashir Hossain</strong></li>
            <li><strong>Sadman Shipar</strong></li>
            <li><strong>Mohammed Tanjid</strong></li>
            <li><strong>Rajansher Khera</strong></li>
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