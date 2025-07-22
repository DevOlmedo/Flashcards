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

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ username: '', email: '', password: '' });
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

            if (res.status === 409) {
                const data = await res.json();
                toast({
                    title: 'Usuario duplicado',
                    description: data.message || 'Ya existe una cuenta con ese email o nombre de usuario',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } else if (res.redirected) {
                toast({
                    title: 'Registro exitoso',
                    description: 'Redirigiendo al dashboard...',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });

                resetForm();
                window.location.href = res.url; // 👈 fuerza la navegación
                return;
            } else {
                toast({
                    title: 'Error desconocido',
                    description: 'No se pudo completar el registro',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch {
            toast({
                title: 'Error de red',
                description: 'No se pudo conectar al servidor',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }

        setLoading(false);
    };

    return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="black">
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
                        <FormLabel color="whiteAlpha.800">Nombre de usuario</FormLabel>
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

                    <FormControl mb={4} isRequired>
                        <FormLabel color="whiteAlpha.800">Correo electrónico</FormLabel>
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
                        <FormLabel color="whiteAlpha.800">Contraseña</FormLabel>
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
                    <Text fontSize="sm" color="whiteAlpha.800">
                        ¿Ya tenés cuenta?
                    </Text>
                    <Link href="/login">
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