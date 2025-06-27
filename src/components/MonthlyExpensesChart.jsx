import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function MonthlyExpensesChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:3000/get-monthly-expenses')
      .then(res => res.json())
      .then(d => {
        setData({
          labels: d.map(row => row.month),
          datasets: [{
            label: 'Monthly Expenses',
            data: d.map(row => row.total),
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.3
          }]
        });
      });
  }, []);

  return (
    <div className="p-4 bg-spendly-gray shadow rounded">
      <h2 className="text-lg font-bold text-spendly-yellow">📈 Monthly Expenses</h2>
      <Line data={data} />
    </div>
  );
}
