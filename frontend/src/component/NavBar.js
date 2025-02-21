import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu
import url from "./domain";

const Navbar = () => {
  const { isAuthenticated, checkAuthStatus, setIsAuthenticated, id } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    checkAuthStatus();
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(url+"/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg px-6 z-50 py-6 flex justify-between items-center rounded-b-lg fixed w-full top-0">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-yellow-400 flex items-center">
        🏠 QuirkyRoomie
      </Link>

      {/* Hamburger Menu Button for Mobile */}
      <button className="lg:hidden text-white text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-500 transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/dashboard/${id}`}>
              <button className="px-4 py-2 text-white hover:text-yellow-300 transition">Dashboard</button>
            </Link>
            <Link to="/complaints">
              <button className="px-4 py-2 text-white hover:text-yellow-300 transition">Complaints</button>
            </Link>
            <Link to="/leaderboard">
              <button className="px-4 py-2 text-white hover:text-yellow-300 transition">Leaderboard</button>
            </Link>
            <button
              className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
        {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center gap-6 py-8 shadow-lg lg:hidden transition-transform duration-300">
            {!isLoggedIn ? (
            <>
                <Link to="/login">
                <button className="w-40 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition">
                    Login
                </button>
                </Link>
                <Link to="/signup">
                <button className="w-40 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-500 transition">
                    Sign Up
                </button>
                </Link>
            </>
            ) : (
            <>
                <Link to={`/dashboard/${id}`} className="text-white text-xl font-semibold hover:text-yellow-300 transition">
                Dashboard
                </Link>
                <Link to="/complaints" className="text-white text-xl font-semibold hover:text-yellow-300 transition">
                Complaints
                </Link>
                <Link to="/leaderboard" className="text-white text-xl font-semibold hover:text-yellow-300 transition">
                Leaderboard
                </Link>
                <button
                className="w-40 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition"
                onClick={handleLogout}
                >
                Logout
                </button>
            </>
            )}
        </div>
        )}

    </nav>
  );
};

export default Navbar;
