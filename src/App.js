import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import JournalTracker from "./pages/JournalTracker";
import PCLreview from "./pages/PCLreview";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-md py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
                </li>
                <li>
                  <Link to="/journal-tracker" className="text-gray-700">Journal Tracker</Link>
                </li>
                <li>
                  <Link to="/pcl-review" className="text-gray-700">PCL Review</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-700">Logout</button>
                </li>
              </>
            ) : (
              <div className="flex items-center space-x-4">
              <img src="JGI-logo.png" alt="JGI" className=" w-1/12" />
              <p>Please Login with Student USN -All caps</p>
              </div>
            )}
          </ul>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-3">
        <Routes>
          <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/journal-tracker" element={isAuthenticated ? <JournalTracker /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/pcl-review" element={isAuthenticated ? <PCLreview /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
