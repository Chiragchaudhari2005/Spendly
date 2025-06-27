import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function WeeklyExpensesChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:3000/get-weekly-expenses')
      .then(res => res.json())
      .then(d => {
        setData({
          labels: d.map(row => `Week ${row.week}th`),
          datasets: [{
            label: 'Weekly Expenses',
            data: d.map(row => row.total),
            backgroundColor: '#fcca3e',
            borderColor: '#e7b01f',
            borderWidth: 1
          }]
        });
      });
  }, []);

  return (
    <div className="p-4 bg-spendly-gray shadow rounded">
      <h2 className="text-lg font-bold text-spendly-yellow">📅 Weekly Expenses</h2>
      <Bar data={data} />
    </div>
  );
}