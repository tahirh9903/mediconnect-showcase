import React, { useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0); //this ensure page is auto scrolled to top during launch, if you find another way to complete this, then that is fine too.
  }, []);

  // ref for the footer animation
  const footerRef = useRef(null);

  // observing the footer 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, 
        rootMargin: "0px 0px -20px 0px" // this will adjust timing of the footer scroll down. The higher the negative value is, the more you have to scroll down to be in view.
      }
    );

    
    const setupObserver = () => {
      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
    };

    // main observer
    setupObserver();
    
    // delayed oberver as a backup
    const timer = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timer);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
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

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-left text-gray-700">
              <li>Communicate with doctors and pharmacists</li>
              <li>Schedule appointments</li>
              <li>Manage prescriptions</li>
            </ul>
          </div>

          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
            <ul className="list-disc list-inside text-left text-gray-700">
              <li>React Native</li>
              <li>Firebase</li>
              <li>Expo</li>
              <li>Typescript</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <ul className="text-gray-700">
            <li><strong>Tahir Hossain</strong></li>
            <li><strong>Muntashir Hossain</strong></li>
            <li><strong>Sadman Shipar</strong></li>
            <li><strong>Mohammed Tanjid</strong></li>
            <li><strong>Rajansher Khera</strong></li>
          </ul>
        </div>

      
        <div style={{ height: "25px" }}></div> 
        <footer 
          ref={footerRef} 
          className="mt-10 text-gray-500 text-sm scroll-fade-up" 
        >
          &copy; {new Date().getFullYear()} MediConnect. Built for our senior project.
        </footer>
      </div>
    </div>
  );
}