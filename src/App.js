import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPasword';
import './assets/styles/GlobalCSS.css';
import FeedbackSurvey from './pages/UninstallSurvey';
import UpdateInfoScreen from './pages/UpdatesInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/survey" element={<FeedbackSurvey />} />
          <Route path="/update-info" element={<UpdateInfoScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
