// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header'; // Update with your Header component path
import Home from './components/Home/Home'; // Update with your Home component path
import Signup from './components/Signup/Signup'; // Update with your Signup component path
import Login from './components/Login/Login'; // Update with your Login component path
import MovieDetails from './components/MovieDetails/MovieDetails'; // Update with your MovieDetails component path
import Profile from './components/Profile/Profile'; // Import the Profile component
import './App.css';

const App = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="App">
      {showHeader && <Header />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
