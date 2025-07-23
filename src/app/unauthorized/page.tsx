'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <section
            className="max-w-lg mx-auto mt-20 bg-gray-900 border border-red-500 rounded-xl shadow-xl p-8 text-center"
            role="alert"
            aria-live="assertive"
        >
            <h1 className="text-2xl font-bold text-red-400 mb-4">🔒 Acceso denegado</h1>

            <p className="text-base text-white/80 mb-6">
                No tenés permiso para ver esta página. Puede que tu sesión haya expirado o no tengas el rol adecuado.
            </p>

            <div className="flex flex-col gap-3">
                <button
                    onClick={() => router.push('/login')}
                    className="rounded px-4 py-2 bg-blue-600 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Iniciar sesión
                </button>

                <button
                    onClick={() => router.push('/')}
                    className="rounded px-4 py-2 border border-red-500 text-red-500 transition-colors hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Volver al inicio
                </button>
            </div>
        </section>
    );
}