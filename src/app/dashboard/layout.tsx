import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies(); // ✅ Uso correcto de 'await'
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.warn('DashboardLayout: token ausente');
    redirect('/unauthorized');
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, secret) as { role: string };

    const allowedRoles = ['user', 'admin'];
    if (!allowedRoles.includes(decoded.role)) {
      console.warn('DashboardLayout: rol no autorizado →', decoded.role);
      redirect('/unauthorized');
    }

    return <>{children}</>;
  } catch (err) {
    console.error('DashboardLayout: token inválido →', err);
    redirect('/unauthorized');
  }
}