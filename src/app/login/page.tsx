'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { LogIn, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AOS.init({ once: true, duration: 500 });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ email: '', password: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.status === 401 || res.status === 404) {
                const data = await res.json();
                toast.error(data.message || 'Credenciales inválidas', {
                    icon: <XCircle className="text-red-500" />,
                });
            } else if (res.redirected) {
                toast.success('Sesión iniciada. Redirigiendo al dashboard...', {
                    icon: <LogIn className="text-green-500" />,
                });
                resetForm();
                setTimeout(() => {
                    window.location.href = res.url;
                }, 1800);
                return;
            } else {
                toast.error('No se pudo completar el inicio de sesión', {
                    icon: <AlertTriangle className="text-yellow-500" />,
                });
            }
        } catch {
            toast.error('No se pudo conectar al servidor', {
                icon: <AlertTriangle className="text-yellow-500" />,
            });
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
            <div
                data-aos="zoom-in"
                className="w-full max-w-md bg-gray-950 border border-blue-500 rounded-2xl p-8 shadow-lg"
            >
                <h2 className="text-blue-400 text-3xl font-semibold mb-6 text-center">Iniciar sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-white/80 text-sm mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="nombre@email.com"
                            className="w-full rounded-md border border-blue-600 px-4 py-2 bg-gray-900 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white/80 text-sm mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full rounded-md border border-blue-600 px-4 py-2 bg-gray-900 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all ${loading
                                ? 'bg-blue-800 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin h-4 w-4" />
                                Iniciando...
                            </span>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/80 flex justify-center gap-2">
                    <span>¿No tenés cuenta?</span>
                    <Link href="/register">
                        <span className="text-blue-400 hover:text-red-300 hover:underline cursor-pointer">
                            Registrate acá
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}