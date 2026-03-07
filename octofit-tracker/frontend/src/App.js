

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from '../public/octofitapp-small.png';


function AppNavbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/octofitapp-small.png" alt="OctoFit Logo" className="App-logo" />
          OctoFit Tracker
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className={`nav-link${location.pathname==='/activities' ? ' active' : ''}`} to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className={`nav-link${location.pathname==='/leaderboard' ? ' active' : ''}`} to="/leaderboard">Leaderboard</Link></li>
            <li className="nav-item"><Link className={`nav-link${location.pathname==='/teams' ? ' active' : ''}`} to="/teams">Teams</Link></li>
            <li className="nav-item"><Link className={`nav-link${location.pathname==='/users' ? ' active' : ''}`} to="/users">Users</Link></li>
            <li className="nav-item"><Link className={`nav-link${location.pathname==='/workouts' ? ' active' : ''}`} to="/workouts">Workouts</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Activities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
