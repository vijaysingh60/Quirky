import React, { useEffect, useState } from "react";
import url from "./domain";
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(url + "/leaderboard")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  // Rank Colors
  const rankColors = {
    1: "bg-yellow-400 text-gray-900", // Gold
    2: "bg-gray-300 text-gray-900", // Silver
    3: "bg-orange-400 text-gray-900", // Bronze
  };

  // Punishment Generator
  const punishments = [
    "Do all the dishes for a week 🍽️",
    "Take out the trash for 3 days 🚮",
    "Clean the living room 🧹",
    "Cook dinner for everyone 🍲",
    "Buy snacks for the flat 🍿",
    "Be the designated driver for a weekend 🚗",
    "No TV for a week 📺❌",
  ];

  const [randomPunishment, setRandomPunishment] = useState("");

  const generatePunishment = () => {
    const punishment = punishments[Math.floor(Math.random() * punishments.length)];
    setRandomPunishment(punishment);
  };

  return (
    <div className="sm:flex w-full gap-6 pt-24 px-3 sm:px-24 h-screen">
      {/* Leaderboard - Left Section */}
      <div className="sm:w-2/3 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          ⚠️ Most Complained Flatmates
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Flatmate</th>
                <th className="py-3 px-4 text-right">Complaints</th>
                <th className="py-3 px-4 text-right">Karma Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b ${rankColors[user.rank] || "bg-gray-100"}`}
                >
                  <td className="py-4 px-6 text-lg">{idx + 1}️⃣</td>
                  <td className="py-4 px-6 text-lg font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-lg text-right">
                    {10 - (user.karmaPoints > 10 ? 10 : user.karmaPoints)} 🚨
                  </td>
                  <td className="py-4 px-6 text-lg text-right">
                    {user.karmaPoints} ⭐
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Punishment Generator - Right Section */}
      <div className="sm:w-1/3 sm:h-5/6 relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 p-8 rounded-xl shadow-lg text-white text-center">
        <h3 className="sm:text-3xl text-2xl font-bold mb-12">🎲 Random Punishment</h3>
        <p className="sm:mt-4 mt-2 text-3xl sm:text-5xl font-bold">
          {randomPunishment || "Click below to generate"}
        </p>
        <button
          onClick={generatePunishment}
          className="sm:mt-6 absolute sm:bottom-10 sm:left-1/2 -translate-x-1/2  bg-black text-white px-6 py-3 text-lg sm:text-2xl rounded-lg shadow-md hover:bg-gray-800 transition transform hover:scale-105"
        >
          Generate Punishment ⚖️
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
