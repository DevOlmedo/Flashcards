import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function DashboardPage() {
    const cookieStore = await cookies(); // ✅ Await agregado
    const token = cookieStore.get('token')?.value;

    let username = 'usuario';

    try {
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jwt.verify(token!, secret) as { username: string };
        username = decoded.username;
    } catch {
        username = 'Desconocido';
    }

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-start justify-start p-8">
            <h1 className="text-2xl font-semibold text-blue-400 mb-4">Hola, {username} 👋</h1>
            <p className="text-white/70 text-base">
                Bienvenido a tu dashboard. Desde acá podés gestionar tus datos, revisar tu actividad y configurar tu cuenta.
            </p>
        </main>
    );
}