import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/register', '/']; // Rutas que no requieren autenticación

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Permitir acceso libre a rutas públicas
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    try {
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        jwt.verify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
}