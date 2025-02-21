import logo from './logo.svg';
import './App.css';
import HomePage from './component/HomePage';
import { Route, Routes } from 'react-router-dom';
import Signup from './component/SignUp';
import Login from './component/Login';
import NavBar from './component/NavBar';

import Dashboard from './component/DashBoard';
import Complaint from './component/Complaint';
import Leaderboard from './component/LeaderBoard';
import { AuthProvider } from './component/context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <div className="App ">
        <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='complaints' element={<ProtectedRoute><Complaint/></ProtectedRoute>}/>
        <Route path='leaderboard' element={<ProtectedRoute><Leaderboard/></ProtectedRoute>}/>
        <Route path='/dashboard/:id' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
     
    </div>
    </AuthProvider>
  );
}

export default App;
