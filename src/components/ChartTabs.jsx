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


// ChartTabs.jsx
import { useState } from 'react';
import WeeklyExpensesChart from './WeeklyExpensesChart';
import CategoryDoughnutChart from './CategoryDoughnutChart';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import DailyExpensesChart from './DailyExpensesChart';

const tabs = [
  { id: 'daily', label: '🗓️ Daily', component: <DailyExpensesChart /> },
  { id: 'weekly', label: '📅 Weekly', component: <WeeklyExpensesChart /> },
  { id: 'monthly', label: '📈 Monthly', component: <MonthlyExpensesChart /> },
  { id: 'category', label: '🧾 Category', component: <CategoryDoughnutChart /> }
];

export default function ChartTabs() {
  const [activeTab, setActiveTab] = useState('daily');

    return (
    <div className="p-4 bg-spendly-gray w-full">
      {/* <h1 className="text-4xl font-bold text-center text-[#2ea9b8] mb-8">📊 Spendly Insights</h1> */}
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg shadow font-semibold transition ${
              activeTab === tab.id
                ? 'bg-spendly-yellow text-white'
                : 'bg-spendly-gray text-spendly-yellow border border-spendly-yellow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl mx-auto"> {/* Centered container with max width */}
          <div className="grid grid-cols-1 gap-6">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  );
}
