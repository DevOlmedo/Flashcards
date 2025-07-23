// src/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });

            if (res.ok) {
                toast.info('Sesión cerrada. Redirigiendo al login...');
                router.push('/login');
            } else {
                toast.error('Error al cerrar sesión');
            }
        } catch {
            toast.error('Error de red. No se pudo comunicar con el servidor');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded"
        >
            Cerrar sesión
        </button>
    );
}
