import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import url from "./domain";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flatCode, setflatCode] = useState("");
  const {checkAuthStatus,setId} = useContext(AuthContext)
    const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {name,email,password,flatCode}
    const responce = await axios.post(url+"/signup",formData,{
        headers:{
            "Content-Type":"application/json"
        } ,
        withCredentials:true
    })
    console.log(responce.data)
    if(responce.data == "404")toast.info('user exist')
    else{
        await checkAuthStatus();
        toast.success("User Created")
        navigate("/dashboard/"+responce.data.id)
        setId(responce.data.id)
    }
  };

  return (
    <div className="flex  items-center min-h-screen justify-center  bg-gradient-to-br from-blue-300 via-purple-300 to-pink-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Join QuirkyRoomie!</h2>
        <p className="text-gray-500 mb-6">Create an account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Room Id"
            value = {flatCode}
            onChange={(e)=>setflatCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-full shadow-md hover:bg-yellow-500 transition">
            Sign Up
          </button>
        </form>

        <p className="text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
      />
    </div>
  );
};

export default Signup;
