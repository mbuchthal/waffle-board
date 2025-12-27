import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { IntroPage } from './pages/IntroPage';
import { LicensePage } from './pages/LicensePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/license" element={<LicensePage />} />
        {/* Redirect unknown routes to Intro */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
