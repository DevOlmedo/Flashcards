import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email y contraseña requeridos' }, { status: 400 });
        }

        await dbConnect();
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role // 🚀 incluye el rol en el JWT
            },
            secret,
            { expiresIn: '2d' }
        );

        const response = NextResponse.json({ message: 'Inicio de sesión exitoso' });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 48 // 2 días
        });

        return response;
    } catch (err: any) {
        console.error('Error en login:', err);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}