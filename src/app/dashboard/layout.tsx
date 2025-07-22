import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.warn('DashboardLayout: token ausente');
    redirect('/unauthorized');
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, secret) as { role: string };

    // ✅ Si quisieras proteger por rol:
    if (decoded.role !== 'user' && decoded.role !== 'admin') {
      redirect('/unauthorized');
    }

    return <>{children}</>;
  } catch (err) {
    console.error('DashboardLayout: token inválido →', err);
    redirect('/unauthorized');
  }
}