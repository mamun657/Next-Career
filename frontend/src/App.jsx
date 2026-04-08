import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import CareerBotPage from './pages/CareerBotPage';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import RoadmapView from './pages/RoadmapView';

// Admin pages
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import AdminResources from './pages/admin/AdminResources';
import AdminSettings from './pages/admin/AdminSettings';

// Route guards
import AdminRoute, { SuperAdminRoute } from './components/AdminRoute';

/**
 * PrivateRoute - Protects routes that require authentication
 * Redirects to /login if not authenticated
 */
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1526] to-[#1a1033] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

/**
 * PublicRoute - Routes accessible only when NOT logged in
 * Redirects to /dashboard if already authenticated
 */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1526] to-[#1a1033] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes - redirect to dashboard if logged in */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Protected routes - require authentication */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
          <Route path="/jobs/:id" element={<PrivateRoute><Jobs /></PrivateRoute>} />
          <Route path="/careerbot" element={<PrivateRoute><CareerBotPage /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/roadmap/:id" element={<PrivateRoute><RoadmapView /></PrivateRoute>} />
          
          {/* Admin routes - require admin or super_admin role */}
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/jobs" element={<AdminRoute><AdminJobs /></AdminRoute>} />
          <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
          
          {/* Super Admin only routes */}
          <Route path="/admin/settings" element={<SuperAdminRoute><AdminSettings /></SuperAdminRoute>} />
          
          {/* Catch-all - redirect to landing or dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
