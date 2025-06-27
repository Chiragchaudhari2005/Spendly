import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function DailyExpensesChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:3000/get-daily-expenses')
      .then(res => res.json())
      .then(d => {
        setData({
          labels: d.map(row => row.date),
          datasets: [{
            label: 'Daily Expenses',
            data: d.map(row => row.total),
            borderColor: '#2ea9b8',
            backgroundColor: 'rgba(46, 169, 184, 0.2)',
            tension: 0.3,
            fill: true,
          }]
        });
      });
  }, []);

  return (
    <div className="p-4 bg-spendly-gray shadow rounded ">
      <h2 className="text-lg font-bold text-spendly-yellow">🗓️ Daily Expenses</h2>
      <Line data={data} />
    </div>
  );
}
