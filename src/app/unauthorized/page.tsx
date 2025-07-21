'use client';

import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <Box
            minH="100vh"
            bg="black"
            color="whiteAlpha.900"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            px={6}
            gap={6}
        >
            <Heading size="xl" color="red.400" display="flex" alignItems="center" gap={2}>
                <WarningIcon boxSize={6} />
                Acceso no autorizado
            </Heading>

            <Text fontSize="lg">
                No tenés permiso para ver esta página. Iniciá sesión para continuar.
            </Text>

            <Button
                colorScheme="blue"
                size="md"
                onClick={() => router.push('/login')}
                _hover={{ bg: 'blue.600' }}
            >
                Iniciar sesión
            </Button>
        </Box>
    );
}