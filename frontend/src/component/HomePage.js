import React, { useContext } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function HomePage() {
    const {id,isAuthenticated} = useContext(AuthContext)
  return (
    <div className="relative w-full h-screen bg-[url('./component/images/home.webp')] bg-cover bg-center">
 

      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-75"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in">
          Resolve Conflicts, Live Happily! 😊
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl animate-slide-up">
          A smart platform to manage and resolve flatmate conflicts fairly.
        </p>
        <Link to={isAuthenticated?"/dashboard/"+id:"/login"}><button className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition transform hover:scale-105">
          Get Started 🚀
        </button></Link>
      </div>

    </div>
  );
}

export default HomePage;
