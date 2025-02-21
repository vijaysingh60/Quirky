import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import url from "./domain";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {checkAuthStatus,setId} = useContext(AuthContext)
    const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signing up with", email, password);
    const formData = {email,password}
    const responce = await axios.post(url+"/login",formData,{
        headers:{
            "Content-Type":"application/json"
        } ,
        withCredentials:true
    })
    console.log(responce.data)

    if(responce.data == "404")toast.error("User Not Exist")
    else{
        await checkAuthStatus();
        setId(responce.data.id)
        toast.success("Login success")
        navigate("/dashboard/"+responce.data.id)
    }
        
  };

  return (
    <div className="flex  items-center min-h-screen justify-center  bg-gradient-to-br from-blue-300 via-purple-300 to-pink-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Welcome Back!</h2>
        <p className="text-gray-500 mb-6">Log in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="w-full bg-pink-500 text-white font-semibold py-2 rounded-full shadow-md hover:bg-pink-600 transition">
            Login
          </button>
        </form>

        <p className="text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export default Login;
