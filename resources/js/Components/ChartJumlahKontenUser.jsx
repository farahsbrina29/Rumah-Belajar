import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Konten() {

  const [dataChart, setDataChart] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultLabels = [
    'Kelas 10 SMA',
    'Kelas 11 SMA',
    'Kelas 12 SMA',
    'Kelas 10 SMK',
    'Kelas 11 SMK',
    'Kelas 12 SMK',
    'SDLB',
    'SMPLB',
    'SMALB',
  ];

  useEffect(() => {
    axios.get('/api/jumlah-konten')
      .then(response => {
        setDataChart(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const counts = defaultLabels.map(label => {
    const found = dataChart.find(item => item.nama_jenjang === label);
    return found ? Number(found.jumlah) : 0;
  });

  const chartData = {
    labels: defaultLabels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FFCD94', '#33FF99', '#FF6666',
        ],
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FFCD94', '#33FF99', '#FF6666',
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-lg p-6 shadow-lg border border-white/10 backdrop-blur-sm">

          <h2 className="text-xl font-bold mb-4 text-center">
            Jumlah Konten Berdasarkan Jenjang
          </h2>

          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : (
            <div className="h-80">
              <Bar data={chartData} options={options} />
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
