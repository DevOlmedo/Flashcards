import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jwt.verify(token, secret) as { id: string };

        await dbConnect();

        const userDoc = await User.findById(decoded.id).select('-password');
        if (!userDoc) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        const user = userDoc.toObject(); // objeto plano = sin métodos de Mongoose

        return NextResponse.json({
            user: {
                id: `${user._id}`,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error al validar token:', error);
        return NextResponse.json({ message: 'Token inválido o expirado' }, { status: 403 });
    }
}