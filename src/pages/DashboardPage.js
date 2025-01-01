import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Dashboard/Home/Home';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import Settings from '../components/Dashboard/Settings/Settings';
import PostScheduler from '../components/Dashboard/QuickPost/PostScheduler';
import LinkedInPostGenerator from '../components/Dashboard/GeneratePost/GeneratePost';
import ProtectedRoute from '../components/ProtectedRoute';
function Dashboard() {
  return (
    <div className="flex lg:flex-row flex-col h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto bg-sky-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                {' '}
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quick-post"
            element={
              <ProtectedRoute>
                <PostScheduler />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <LinkedInPostGenerator />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
