import React from 'react';
import Link from 'next/link'; 


const SignUpPage = () => {
  return (
  
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="max-w-sm w-full">
      
        <div className="bg-black rounded-t-2xl shadow-lg">
          
          <div className="p-8 text-center">
            <h1 className="text-white text-3xl font-bold">Sign Up</h1>
          </div>

         
          <div className="bg-white px-8 pt-10 pb-8 rounded-tl-[3.5rem] rounded-b-2xl">
            <form noValidate>
              
         
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Wasim Bari"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

         
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Bari"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

           
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Hello@dream.com"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

            
              <div className="mb-6">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

        
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  Sign Up
                </button>
              </div>

        
              <p className="text-center text-sm text-gray-500">
                Already have a account?{' '}
                <Link href="/login" className="font-bold text-black hover:underline">
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;