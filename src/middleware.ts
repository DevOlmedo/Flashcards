import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 🟢 Rutas que no requieren autenticación
const PUBLIC_PATHS = ['/login', '/register', '/', '/unauthorized'];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 🔓 Permitir acceso libre a rutas públicas
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    // 🚫 Si no hay token, redirigir a /unauthorized
    if (!token) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    try {
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jwt.verify(token, secret) as { role: string };

        // 🔐 Si intenta acceder a /admin sin rol admin, redirigir
        if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
}

// 🔧 Matcher define qué rutas intercepta el middleware
export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*']
};