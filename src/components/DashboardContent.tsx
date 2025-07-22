// src/components/DashboardContent.tsx
"use client";


import { Box, Heading } from "@chakra-ui/react";

export default function DashboardContent({ username }: { username: string }) {
    return (
        <Box minH="100vh" bg="black" color="whiteAlpha.900" p={8}>
            <Heading size="lg" mb={4}>Hola, {username} 👋</Heading>

        </Box>
    );
}
