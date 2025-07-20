'use client';
import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const toast = useToast();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });

            if (res.ok) {
                toast({
                    title: 'Sesión cerrada',
                    description: 'Redirigiendo al login...',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/login');
            } else {
                toast({
                    title: 'Error al cerrar sesión',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch {
            toast({
                title: 'Error de red',
                description: 'No se pudo comunicar con el servidor',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Cerrar sesión
        </Button>
    );
}