import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPasword';
import './assets/styles/GlobalCSS.css';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
