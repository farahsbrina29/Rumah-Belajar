import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Welcome from '@/Pages/user/Welcome'; // Pastikan path impor sesuai dengan struktur folder Anda

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Fullscreen */}
                <Welcome auth={auth} /> {/* Menampilkan komponen Welcome */}
            </div>
        </AuthenticatedLayout>
    );
}
