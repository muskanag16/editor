import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage'; // (Next step mein banayenge)
import WorkspacePage from './pages/WorkspacePage'; // (Next step mein banayenge)
import InvitationsPage from './pages/InvitationsPage';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d1117] text-gray-200 font-sans selection:bg-[#00a65a]/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workspace/:roomId" element={<WorkspacePage />} />
          <Route path="/invitations" element={<InvitationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;