// components/SalaryChart.tsx
'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SalaryChartProps {
  labels: string[];
  salaries: number[];
}

export default function SalaryChart({ labels, salaries }: SalaryChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Salario',
        data: salaries,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tendencia de Salarios',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: number | string) {
            if (typeof tickValue === 'number') {
              return `$${tickValue}`;
            }
            return tickValue;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
