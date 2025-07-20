import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Falta la variable MONGODB_URI en el archivo .env');
}

// Cache global para evitar múltiples conexiones en desarrollo
let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = (global as any)._mongooseCache;

if (!cached) {
    cached = { conn: null, promise: null };
    (global as any)._mongooseCache = cached;
}

async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al conectar a MongoDB:', error.message);
        }
        throw new Error('No se pudo conectar a la base de datos');
    }
}

export default dbConnect;