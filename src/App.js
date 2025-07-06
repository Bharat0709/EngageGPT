import './App.css';
import '@assets/styles/GlobalCSS.css';

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

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/SignUp'));
const Dashboard = lazy(() => import('@pages/DashboardPage'));
const NotFound = lazy(() => import('@pages/NotFound'));
const ResetPassword = lazy(() => import('@pages/ResetPasword'));
const FeedbackSurvey = lazy(() => import('@pages/UninstallSurvey'));
const UpdateInfoScreen = lazy(() => import('@pages/UpdatesInfo'));

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
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
