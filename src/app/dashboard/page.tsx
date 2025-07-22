import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
    const cookieStore = await cookies(); // ✅ agregamos await
    const token = cookieStore.get("token")?.value;

    let username = "usuario";

    try {
        const secret = process.env.JWT_SECRET || "fallback-secret";
        const decoded = jwt.verify(token!, secret) as { username: string };
        username = decoded.username;
    } catch {
        username = "Desconocido";
    }

    return <DashboardContent username={username} />;
}
