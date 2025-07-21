import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jwt.verify(token, secret) as { id: string };

        await dbConnect();

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        // 🔐 Incluye rol explícitamente en la respuesta
        return NextResponse.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error al validar token:', error);
        return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
    }
}