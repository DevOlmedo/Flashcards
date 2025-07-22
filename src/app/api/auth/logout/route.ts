import { NextResponse } from 'next/server';

export async function POST() {
    // ✅ Redireccionamos al login después de cerrar sesión
    const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));

    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Elimina la cookie
    });

    return response;
}