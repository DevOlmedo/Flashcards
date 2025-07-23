// src/app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function HomeRedirect() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'fallback-secret';
      jwt.verify(token, secret);
      return redirect('/dashboard');
    } catch {
      return redirect('/login'); // Token inválido
    }
  }

  return redirect('/login'); // No hay token
}
