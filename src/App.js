import './App.css';
import '@assets/styles/GlobalCSS.css';
import { Analytics } from '@vercel/analytics/react';
 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import { useEffect, lazy, Suspense } from 'react';
import { setNavigate } from '@utils/navigator';
import PageSkeletonLoader from '@pages/PageSkeletonLoader';
import LandingPage from '@pages/LandingPage';
import ProtectedRoute from '@components/ProtectedRoute';
import { NotificationProvider } from '@components/Common/Notification';

const EmailVerification = lazy(() => import('@pages/EmailVerification'));
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/SignUp'));
const Dashboard = lazy(() => import('@pages/DashboardPage'));
const NotFound = lazy(() => import('@pages/NotFound'));
const PasswordSetReset = lazy(() => import('@pages/ResetPasword'));
const FeedbackSurvey = lazy(() => import('@pages/UninstallSurvey'));
const UpdateInfoScreen = lazy(() => import('@pages/UpdatesInfo'));
const GoogleLoginRedirect = lazy(() => import('@pages/LoggingInPage'));
const Upgrade = lazy(() => import('@pages/Upgrade'));


const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Suspense
      fallback={
        <div className="text-center p-6">
          <PageSkeletonLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<PasswordSetReset />} />
        <Route path="/auth/google/callback" element={<GoogleLoginRedirect />} />
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <Upgrade/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/survey"
          element={
            <ProtectedRoute>
              <FeedbackSurvey />
            </ProtectedRoute>
          }
        />
        <Route path="/update-info" element={<UpdateInfoScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <NotificationProvider position="bottom-right" maxNotifications={5}>
          <AppRoutes />
        </NotificationProvider>
          <Analytics />
      </div>
    </Router>
  );
};

export default App;
