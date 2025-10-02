import { Routes, Route } from 'react-router-dom';
import Home from '@components/Dashboard/Home/Home';
import Sidebar from '@components/Dashboard/Sidebar/Sidebar';
import Settings from '@components/Dashboard/Settings/Settings';
import PostScheduler from '@components/Dashboard/QuickPost/PostScheduler';
import LinkedInPostGenerator from '@components/Dashboard/GeneratePost/GeneratePost';
import ProtectedRoute from '@components/ProtectedRoute';
import PostDetails from '@components/Dashboard/PostHistory/PostQueue';
import HiringPostsPage from '@components/Dashboard/HiringPosts/HiringPostsPage';
import MemberSettings from '@components/Dashboard/Settings/MemberSettings/MemberSettings';
import ContentCalendarPage from '@components/Dashboard/ContentCalender/ContentCalender';
import EmailTemplateManager from '@components/Dashboard/EmailTemplates/EmailTemplatesPage';
import AutomationManager from '@components/Dashboard/Automation/AutomationManager';

function Dashboard() {
  return (
    <div className="flex lg:flex-row scrollbar-hide p-0 flex-col h-screen">
      <Sidebar />
      <div className="flex-1 scrollbar-hide h-[100vh] overflow-auto">
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
          <Route
            path="/post-history"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-leads"
            element={
              <ProtectedRoute>
                <HiringPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/content-calendar"
            element={
              <ProtectedRoute>
                <ContentCalendarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member-settings/:memberId"
            element={
              <ProtectedRoute>
                <MemberSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads-automation"
            element={
              <ProtectedRoute>
                <AutomationManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/email-templates"
            element={
              <ProtectedRoute>
                <EmailTemplateManager />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
