import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        // Validación básica
        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        // Normaliza el email
        const normalizedEmail = email.toLowerCase().trim();

        await dbConnect();

        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { username }],
        });

        if (existingUser) {
            return NextResponse.json({ message: 'El usuario o email ya existe' }, { status: 409 });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el usuario
        const newUser = await User.create({
            username,
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Genera el token JWT
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, secret, {
            expiresIn: '2d',
        });

        // Crea respuesta con cookie
        const response = NextResponse.json({ message: 'Usuario registrado correctamente' });
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}