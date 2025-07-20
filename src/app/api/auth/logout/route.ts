import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Sesión cerrada correctamente' });

    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Expira inmediatamente
        path: '/',
    });

    return response;
}