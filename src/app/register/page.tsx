'use client';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: 'Registro exitoso',
                    description: 'Redirigiendo al dashboard...',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right', // 👈 asegurate visibilidad
                });

                setForm({ username: '', email: '', password: '' });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            }
        } catch {
            toast({
                title: 'Error de red',
                description: 'Verificá tu conexión',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }

        setLoading(false);
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
        >
            <Box
                bg="black"
                p={8}
                rounded="2xl"
                shadow="md"
                width="100%"
                border="1px"
                borderColor="blue.300"
                maxW="md"
            >
                <Heading as="h2" size="lg" mb={6} color="blue.200">
                    Crear cuenta
                </Heading>

                <form onSubmit={handleSubmit}>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Nombre de usuario</FormLabel>
                        <Input
                            name="username"
                            type="text"
                            placeholder="Nombre de usuario"
                            value={form.username}
                            onChange={handleChange}
                            border="1px"
                            borderColor="blue.600"
                        />
                    </FormControl>
                    <Button onClick={() => toast({ title: 'Test Toast', description: 'Probando...', status: 'info' })}>
                        Probar toast
                    </Button>

                    <FormControl mb={4} isRequired>
                        <FormLabel>Correo electrónico</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            border="1px"
                            borderColor="blue.600"
                        />
                    </FormControl>

                    <FormControl mb={4} isRequired>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            border="1px"
                            borderColor="blue.600"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        width="full"
                        isLoading={loading}
                        loadingText="Registrando..."
                    >
                        Registrarme
                    </Button>
                </form>

                <Flex mt={4} justify="center" align="center" gap={2}>
                    <Text fontSize="sm">¿Ya tenés cuenta?</Text>
                    <Link href="/login" passHref>
                        <Text
                            as="span"
                            color="blue.400"
                            _hover={{ color: 'red.300', textDecoration: 'underline' }}
                        >
                            Iniciá sesión acá
                        </Text>
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
}