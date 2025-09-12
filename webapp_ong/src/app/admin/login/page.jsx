"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, message } from "antd";
import styles from "./login.module.css";

export default function LoginPage() {
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${URL_API}/api/usuario/login-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        message.success("Login feito com sucesso!");
        router.push("/admin");
      } else {
        message.error(data.message || "Usuário ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      message.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/recuperar-senha");
  };

  return (
    <>
      <div className={styles.container}>
        <Card title="Login Admin" className={styles.card}>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Digite seu email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[{ required: true, message: "Digite sua senha" }]}
            >
              <Input.Password />
            </Form.Item>

            <div className={styles.forgot} onClick={handleForgotPassword}>
              Esqueci minha senha
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}