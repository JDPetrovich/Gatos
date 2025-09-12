"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
    const router = useRouter();

   /*  useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin/login");
        }
    }, []); */

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Bem-vindo ao Painel do Admin 🐱</h1>
            <p>Aqui você vai gerenciar gatos, usuários e informações da ONG.</p>
        </div>
    );
}
