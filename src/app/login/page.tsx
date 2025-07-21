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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [form, setForm] = useState({
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
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),

            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: 'Sesión iniciada',
                    description: 'Redirigiendo al dashboard...',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });

                resetForm();

                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);

            } else {
                toast({
                    title: 'Error al iniciar sesión',
                    description: data.message || 'Credenciales incorrectas',
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

    const resetForm = () => {
        setForm({
            email: '',
            password: '',
        });
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
                    Iniciar sesión
                </Heading>

                <form onSubmit={handleSubmit}>
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
                        loadingText="Iniciando..."
                    >
                        Iniciar sesión
                    </Button>
                </form>

                <Flex mt={4} justify="center" align="center" gap={2}>
                    <Text fontSize="sm">¿No tenés cuenta?</Text>
                    <Link href="/register" passHref>
                        <Text
                            as="span"
                            color="blue.400"
                            _hover={{ color: 'red.300', textDecoration: 'underline' }}
                        >
                            Registrate acá
                        </Text>
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
}   