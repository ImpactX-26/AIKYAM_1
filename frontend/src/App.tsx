import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ApplicationForm from './pages/ApplicationForm';
import UniversityRequirements from './pages/UniversityRequirements';
import AdvisorDashboard from './pages/AdvisorDashboard';
import CVAgent from './pages/CVAgent';
import VisaGuide from './pages/VisaGuide';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/requirements" element={<UniversityRequirements />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
          <Route path="/cv-builder" element={<CVAgent />} />
          <Route path="/visa-guide" element={<VisaGuide />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
