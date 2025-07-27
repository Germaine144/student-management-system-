"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; 

type UserType = 'admin' | 'student';

const HomePage: React.FC = () => {
  const router = useRouter(); 

 
  const handleUserTypeClick = (type: UserType) => {
    if (type === 'admin') {
     
      router.push('/login');
    } else if (type === 'student') {
     
      router.push('/signup');
    }
  };

  return (
  
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
    
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-20 h-20 bg-white bg-opacity-5 rounded-full top-1/4 left-1/12 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-white bg-opacity-10 rounded-full top-3/5 right-1/12 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute w-24 h-24 bg-white bg-opacity-5 rounded-full bottom-1/4 left-1/5 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
      
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            EduPortal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Your gateway to seamless learning and administration
          </p>
        </div>

      
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
          <div 
            onClick={() => handleUserTypeClick('admin')}
            className="group bg-black bg-opacity-5 backdrop-blur-lg border border-l-white border-opacity-20 rounded-3xl p-8 w-full max-w-sm cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-opacity-40 hover:scale-105 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🔐
              </div>
              <h3 className="text-2xl font-semibold mb-4">Admin Portal</h3>
              <p className="text-gray-400 leading-relaxed">
                Access administrative dashboard, manage users, and oversee system operations
              </p>
            </div>
          </div>

          <div 
            onClick={() => handleUserTypeClick('student')}
            className="group bg-black bg-opacity-5 backdrop-blur-lg border border-l-white border-opacity-20 rounded-3xl p-8 w-full max-w-sm cursor-pointer transition-all duration-300 hover:bg-opacity-10 hover:border-opacity-40 hover:scale-105 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🎓
              </div>
              <h3 className="text-2xl font-semibold mb-4">Student Portal</h3>
              <p className="text-gray-400 leading-relaxed">
                Access your courses, assignments, grades, and learning materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;