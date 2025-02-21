import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import url from "./domain";

const Dashboard = () => {
  const { id } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    // Fetch user data
    axios.get(`${url}/dashboard/${id}`)
      .then(res =>{
        console.log(res.data); setUserData(res.data)})
      
      .catch(err => console.error("Error fetching user data:", err));

    
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-400 p-6 flex flex-col items-center pt-24">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 mt-8 h-[72vh]">
        {/* Profile Section */}
        <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col items-center w-full md:w-1/3 h-full">
          <img
            src={ "https://i.pravatar.cc/150"}
            alt="User Avatar"
            className="w-52 h-52 rounded-full border-4 border-yellow-400"
          />
          <h2 className="text-5xl font-bold text-gray-800 mt-6">
            {userData?.usr.name} 🎉
          </h2>
          <p className="text-gray-500 mt-3 text-lg">{userData?.usr.email}</p>
          <p className="text-gray-700 font-semibold mt-3 text-2xl">
            Karma Points: <span className="text-yellow-500">{userData?.usr.karmaPoints}</span>
          </p>
        </div>

        {/* Flatmate Problem of the Week */}
        <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col justify-between w-full md:w-1/3 h-full">
          <div>
            <h2 className="text-4xl font-semibold text-gray-800">
              🏠 Flatmate Problem of the Week
            </h2>
            <p className="text-gray-600 mt-6 text-2xl">
              {userData ? `"${userData.complaint.title}" - Vote to decide the action!` : "Loading..."}
            </p>
            <p className="text-gray-500 mt-6 text-xl">
              {userData ? userData.complaint.category : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to="/voting"
              className="bg-red-500 text-white px-5 py-3 rounded-lg text-center text-2xl font-semibold hover:bg-red-600 transition"
            >
              🎲 Random Punishment
            </Link>
            <Link
              to="/complaints"
              className="bg-pink-500 text-white px-5 py-3 rounded-xl shadow-lg text-center text-2xl font-semibold hover:bg-pink-600 transition"
            >
              📝 File a Complaint
            </Link>
          </div>
        </div>

        {/* Flatmate of the Month */}
        <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col justify-between w-full md:w-1/3 h-full">
          <div>
            <h2 className="text-4xl font-semibold text-gray-800">
              🏆 Flatmate of the Month
            </h2>
            <p className="text-gray-600 mt-6 text-2xl">
              {userData ? 
                `🎖️ ${userData.topFlatmate.name} - The most responsible flatmate!` 
                : "Loading..."}
            </p>
            <p className="text-gray-500 mt-6 text-xl">
              {userData ? userData.topFlatmate.email : "Loading..."}
            </p>
          </div>
          <div>
            <Link
              to="/leaderboard"
              className="bg-blue-500 text-white px-10 py-4 rounded-xl shadow-lg text-center text-xl font-semibold hover:bg-blue-600 transition"
            >
              🏆 View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
