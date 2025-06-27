import Home from './pages/Home';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import TransacLogger from './components/TransacLogger';
import DashboardPage from './pages/Dashboard';
import HistoryPage from './pages/History';
// chartSetup.js or top of ChartTabs.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  TimeScale
);


function App() {

  return (
    <div className='w-screen bg-spendly-gray'>
    <Router>
      <Navbar /> {/* Navbar will be rendered on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Dashboard page */}
        <Route path="/history" element={<HistoryPage />} /> {/* History page */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
    </div>
  )
}

export default App
