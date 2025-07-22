'use client';

import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
            px={6}
        >
            <Box
                bg="gray.900"
                p={8}
                rounded="xl"
                shadow="xl"
                border="1px"
                borderColor="red.500"
                textAlign="center"
                maxW="lg"
            >
                <Heading size="lg" mb={4} color="red.400">
                    🔒 Acceso denegado
                </Heading>

                <Text fontSize="md" mb={6} color="whiteAlpha.800">
                    No tenés permiso para ver esta página. Puede que tu sesión haya expirado
                    o no tengas el rol adecuado.
                </Text>

                <Stack spacing={3}>
                    <Button onClick={() => router.push('/login')} colorScheme="blue" variant="solid">
                        Iniciar sesión
                    </Button>

                    <Button onClick={() => router.push('/')} colorScheme="red" variant="outline">
                        Volver al inicio
                    </Button>
                </Stack>
            </Box>
        </MotionBox>
    );
}