import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css';

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
    <div className="pie-chart-box">
      <h2>💹 Spending Breakdown</h2>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default PieChart;
