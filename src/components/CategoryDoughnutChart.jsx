import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function CategoryDoughnutChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:3000/get-category-expenses')
      .then(res => res.json())
      .then(d => {
        setData({
          labels: d.map(row => row.category),
          datasets: [{
            label: 'Category Expenses',
            data: d.map(row => row.total),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
              '#9966FF', '#FF9F40', '#2ea9b8', '#fcca3e'
            ]
          }]
        });
      });
  }, []);

  return (
    <div className="p-4 bg-spendly-gray shadow rounded w-[864px] h-[496px]">
      <h2 className="text-lg font-bold text-spendly-yellow">🧾 Expenses by Category</h2>
      <div className='w-[864px] h-[436px] flex justify-center'>
      <Doughnut data={data} />
      </div>
    </div>
  );
}