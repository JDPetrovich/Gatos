"use client";

import Style from "./App.module.css";
import React from "react";
import Link from "next/link";
import { Layout, Typography, Empty, Button, Card } from "antd";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export default function NotFound() {
  return (
    <Layout className={Style.layout}>
      <Layout>
        <Content style={{ 
          margin: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh"
        }}>
          <Card 
            style={{ 
              maxWidth: 500, 
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Empty 
              description={false}
              style={{ marginBottom: "24px" }}
            />
            <Title level={3} style={{ color: "#595959", marginBottom: "16px" }}>
              Página não encontrada
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#8c8c8c", marginBottom: "24px" }}>
              Você está tentando acessar uma rota que não existe.  

              Volte para a página inicial para continuar navegando.
            </Paragraph>
            <Link href="/">
              <Button type="primary" size="large">
                Voltar para Home
              </Button>
            </Link>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}