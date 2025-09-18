"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function AdminHome() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Card style={{ maxWidth: 600, width: "100%", textAlign: "center" }} variant="outlined">
                <Title level={2}>Bem-vindo ao Painel do Admin 🐱</Title>
                <Paragraph>
                    Aqui você vai gerenciar gatos, usuários e informações da ONG.
                </Paragraph>
            </Card>
        </div>
    );
}