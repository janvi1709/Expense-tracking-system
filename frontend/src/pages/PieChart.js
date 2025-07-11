import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ incomeAmt, expenseAmt }) {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [incomeAmt, expenseAmt],
        backgroundColor: ['#27ae60', '#c0392b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pie-chart-section">
      <h2>Spending Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
