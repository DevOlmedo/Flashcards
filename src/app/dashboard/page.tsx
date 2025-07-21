'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

interface User {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/current');
                const data = await res.json();

                if (!res.ok || !data.user) {
                    // ⏳ Espera breve para evitar redirecciones instantáneas
                    setTimeout(() => router.push('/unauthorized'), 500);
                } else {
                    setUser(data.user);
                }
            } catch {
                setTimeout(() => router.push('/unauthorized'), 500);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <Box
                minH="100vh"
                bg="black"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="xl" color="blue.300" />
            </Box>
        );
    }

    if (!user) return null;

    return (
        <Box minH="100vh" bg="black" color="whiteAlpha.900" p={8}>
            <Heading size="lg" mb={4}>
                Hola, {user.username} 👋
            </Heading>

            <Text fontSize="lg" mb={2}>
                <strong>Rol:</strong> {user.role}
            </Text>

            {user.role === 'admin' ? (
                <Text mt={6} color="blue.300">
                    ✨ Acceso completo al panel de administración
                </Text>
            ) : (
                <Text mt={6} color="green.300">
                    🧠 ¡Listo para aprender con tus tarjetas!
                </Text>
            )}
        </Box>
    );
}