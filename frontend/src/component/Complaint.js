import React, { useEffect, useState } from "react";
import url from "./domain";
import axios from 'axios'
import { FaUser, FaExclamationTriangle, FaTags, FaBullhorn, FaCheckCircle } from "react-icons/fa";


const categoryIcons = {
  cleaning: <FaBullhorn className="text-green-600 text-4xl" />,
  noise: <FaBullhorn className="text-red-600 text-4xl" />,
  bills: <FaBullhorn className="text-yellow-600 text-4xl" />,
  other: <FaBullhorn className="text-blue-600 text-4xl" />,
};

const severityColors = {
  High: "bg-red-300 text-red-800",
  Medium: "bg-yellow-300 text-yellow-800",
  Low: "bg-green-300 text-green-800",
};

function ComplaintCard({ complaint }) {
  const [isVoted, setIsVoted] = useState(false);
  const [numVote,setnumVote] = useState(0)
  const [isResolved, setIsResolved] = useState(false);

  const handleVote = () => {
    setIsVoted(!isVoted);
    setnumVote((prev)=>isVoted?prev-1:prev+1);
    console.log(`Vote changed: ${!isVoted ? "Upvoted" : "Downvoted"}`);
  };

  const handleResolve = () => {
    setIsResolved(true);
    console.log("Complaint resolved!");
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out bg-gradient-to-br from-white via-gray-100 to-gray-300 border border-gray-300 flex flex-col items-center">
      
      {/* Votes Display */}
      <div className="self-start text-black text-sm font-semibold">Votes: {numVote}
      </div>
      
      <div className="flex items-center w-full">
        {/* Left Side - Icon & Details */}
        <div className="flex flex-col items-center w-2/3 relative">
          {/* Icon */}
          {categoryIcons[complaint.category] || <FaBullhorn className="text-gray-600 text-4xl" />}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mt-2">{complaint.title}</h3>

          {/* Description */}
          <p className="text-gray-700 text-sm italic text-center mt-1">{complaint.description}</p>

          {/* Category & Severity */}
          <div className="flex justify-center gap-2 mt-3">
            {complaint.category && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800 flex items-center gap-1">
                <FaTags className="text-xs" />
                {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
              </span>
            )}
            {complaint.severity && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${severityColors[complaint.severity]}`}>
                <FaExclamationTriangle className="text-xs" />
                {complaint.severity}
              </span>
            )}
          </div>
        </div>

        {/* Right Side - Responsible Person & Voting */}
        <div className="w-1/3 flex flex-col items-center justify-center border-l-2 border-gray-300">
          <FaUser className="text-purple-600 text-5xl mb-2" />
          <span className="text-lg font-semibold text-gray-900">{complaint.responsible || "Unassigned"}</span>

          {/* Upvote/Downvote Button */}
          <button 
            onClick={handleVote} 
            className={`px-3 py-1 mt-2 rounded-full text-sm font-semibold flex items-center gap-1 transition ${
              isVoted ? "bg-gray-500 text-white" : "bg-red-700 text-white hover:bg-red-800"
            }`}
          >
            {isVoted ? "Downvote" : "Upvote"}
          </button>
        </div>
      </div>

      {/* Resolve Button - Full Width */}
      <button 
        onClick={handleResolve}
        disabled={isResolved}
        className={`w-full font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition ${
          isResolved ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        <FaCheckCircle />
        {isResolved ? "Resolved" : "Mark as Resolved"}
      </button>
    </div>
  );
}



function Complaint() {
  const [complaints, setComplaints] = useState([]);

  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    category: "",
    responsible: "",
    severity: "",
  });

  const handleChange = (e) => {
    setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    console.log("hello")
    axios.get(url+"/getComplaints").
    then((res)=>{
        setComplaints(res.data)
        console.log(res.data)
    })
  },[newComplaint])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // setComplaints([...complaints, { id: complaints.length + 1, ...newComplaint }]);
    // setNewComplaint({ title: "", description: "", category: "", responsible: "", severity: "" });
    const formData = newComplaint;
    console.log(newComplaint);
    const res = await axios.post(url+"/submitComplain",formData,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    }
    );
    setNewComplaint({
        title: "",
        description: "",
        category: "",
        responsible: "",
        severity: "",
    })
    console.log(res.data)

  };

  return (
    <div className="pt-20 max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 p-6 min-h-screen">
      
      <div className="sm:col-span-2 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-400 p-8 rounded-xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">📌 Complaints</h2>
        <div className="max-h-[75vh] overflow-y-auto scrollbar-hide grid grid-cols-2 gap-6">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <p className="text-gray-100">No complaints submitted yet.</p>
          )}
        </div>
      </div>


      <div className="bg-gradient-to-br from-blue-300 via-purple-300 to-pink-400 p-8 rounded-xl shadow-2xl text-white overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-4">📝 Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newComplaint.title}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 shadow-sm"
              placeholder="Enter complaint title..."
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Category</label>
            <select
              name="category"
              value={newComplaint.category}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="cleaning">Cleaning Issues</option>
              <option value="noise">Noise Complaints</option>
              <option value="bills">Unpaid Bills</option>
              <option value="other">Other</option>
            </select>
          </div>


          <div>
            <label className="block text-lg font-medium">Responsible Person</label>
            <input
              type="text"
              name="responsible"
              value={newComplaint.responsible}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 shadow-sm"
              placeholder="Enter responsible person's name..."
              required
            />
          </div>


          <div>
            <label className="block text-lg font-medium">Severity Level</label>
            <select
              name="severity"
              value={newComplaint.severity}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            >
              <option value="" disabled>Select severity level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={newComplaint.description}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 shadow-sm"
              rows="4"
              placeholder="Describe your complaint..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition transform hover:scale-105"
          >
            Submit Complaint 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
