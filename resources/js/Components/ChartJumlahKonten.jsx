import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartJumlahKonten() {
    const data = {
        labels: [
            'Kelas 10 SMA',
            'Kelas 11 SMA',
            'Kelas 12 SMA',
            'Kelas 10 SMK',
            'Kelas 11 SMK',
            'Kelas 12 SMK',
            'Kelas 10 SLB',
            'Kelas 11 SLB',
            'Kelas 12 SLB',
        ], // Label jenjang
        datasets: [
            {
                data: [15, 20, 25, 10, 18, 22, 12, 17, 14], // Jumlah konten untuk setiap jenjang
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Menyembunyikan label/legenda
            },
            tooltip: {
                enabled: true, // Tooltip tetap diaktifkan
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 10, // Mengecilkan ukuran font untuk label sumbu X
                    },
                    maxRotation: 45, // Memiringkan teks untuk mencegah tumpang tindih
                    minRotation: 45, // Memastikan teks tetap miring
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
            },
        },
        maintainAspectRatio: false, // Membuat grafik lebih responsif
        layout: {
            padding: {
                bottom: 20, // Tambahkan ruang di bawah grafik
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-md mx-auto max-w-full md:max-w-2xl" style={{ height: '400px' }}>
            <h2 className="text-xl font-bold mb-4 text-center">
                Jumlah Konten Berdasarkan Jenjang
            </h2>
            <div style={{ height: '100%', width: '100%' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
