'use client';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <Box
            minH="100vh"
            bg="black"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            px={6}
        >
            <Heading size="xl" mb={4} color="red.400">
                Acceso no autorizado
            </Heading>

            <Text fontSize="lg" mb={6}>
                No tenés permiso para ver esta página. Iniciá sesión para continuar.
            </Text>

            <Button
                colorScheme="blue"
                onClick={() => router.push('/login')}
                _hover={{ bg: 'blue.600' }}
            >
                Iniciar sesión
            </Button>
        </Box>
    );
}