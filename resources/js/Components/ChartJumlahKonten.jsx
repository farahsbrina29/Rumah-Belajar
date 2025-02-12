import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartJumlahKonten() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/jumlah-konten")
            .then(response => {
                const defaultLabels = [
                    'Kelas 10 SMA',
                    'Kelas 11 SMA',
                    'Kelas 12 SMA',
                    'Kelas 10 SMK',
                    'Kelas 11 SMK',
                    'Kelas 12 SMK',
                    'Kelas 10 SLB',
                    'Kelas 11 SLB',
                    'Kelas 12 SLB',
                ];

                const counts = defaultLabels.map(label => {
                    const found = response.data.find(item => item.nama_jenjang === label);
                    return found ? found.jumlah : 0;
                });

                const data = {
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
                        },
                    ],
                };

                setChartData(data);
            })
            .catch(err => {
                console.error("Error fetching chart data:", err);
                setError("Gagal memuat data grafik.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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

    if (loading) return <div>Memuat grafik...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white rounded-lg p-6 shadow-lg border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-center">
                Jumlah Konten Berdasarkan Jenjang
            </h2>
            <div className="h-80">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}