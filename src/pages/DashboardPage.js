import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Dashboard/Home';
import Sidebar from '../components/Dashboard/Sidebar';
import People from '../components/Dashboard/People';
import Settings from '../components/Dashboard/Settings';
function Dashboard() {
  return (
    <div className="flex lg:flex-row flex-col h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto bg-sky-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiles" element={<People />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
