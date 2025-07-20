import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        const usuarios = await User.countDocuments();

        return NextResponse.json({
            message: 'MongoDB conectada correctamente',
            usuarios,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error al conectar con la base de datos' },
            { status: 500 }
        );
    }
}