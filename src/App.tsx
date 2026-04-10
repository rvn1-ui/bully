/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, UserRole } from './lib/auth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import LaporPage from './pages/LaporPage';
import RiwayatLaporan from './pages/RiwayatLaporan';
import LaporanMasuk from './pages/LaporanMasuk';
import UserManagement from './pages/UserManagement';
import KategoriBullying from './pages/KategoriBullying';
import TindakLanjut from './pages/TindakLanjut';

function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: UserRole[] }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/app" />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/app" element={
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          } />
          
          <Route path="/app/lapor" element={
            <PrivateRoute>
              <AppLayout>
                <LaporPage />
              </AppLayout>
            </PrivateRoute>
          } />
          
          <Route path="/app/riwayat" element={
            <PrivateRoute>
              <AppLayout>
                <RiwayatLaporan />
              </AppLayout>
            </PrivateRoute>
          } />

          <Route path="/app/laporan" element={
            <PrivateRoute allowedRoles={['guru_bk', 'admin']}>
              <AppLayout>
                <LaporanMasuk />
              </AppLayout>
            </PrivateRoute>
          } />

          <Route path="/app/tindak-lanjut" element={
            <PrivateRoute allowedRoles={['guru_bk']}>
              <AppLayout>
                <TindakLanjut />
              </AppLayout>
            </PrivateRoute>
          } />

          <Route path="/app/users" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AppLayout>
                <UserManagement />
              </AppLayout>
            </PrivateRoute>
          } />

          <Route path="/app/kategori" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AppLayout>
                <KategoriBullying />
              </AppLayout>
            </PrivateRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

