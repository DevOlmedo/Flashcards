import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        await dbConnect();

        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { username }],
        });

        if (existingUser) {
            return NextResponse.json({ message: 'El usuario o email ya existe' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user',
        });

        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
            },
            secret,
            { expiresIn: '2d' }
        );

        // ✅ Redirección automática al dashboard
        const response = NextResponse.redirect(new URL('/dashboard', req.url));

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 48,
        });

        return response;
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ message: 'Email o usuario ya registrado' }, { status: 409 });
        }

        console.error('Error al registrar usuario:', error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}