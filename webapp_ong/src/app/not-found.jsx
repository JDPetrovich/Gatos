"use client";

import Style from "./App.module.css";
import React from "react";
import Link from "next/link";
import { Layout, Typography, Empty, Button } from "antd";

const { Content } = Layout;
const { Paragraph } = Typography;

export default function NotFound() {
  return (
    <Layout className={Style.layout}>
      <Layout>
        <Content style={{ 
          margin: "16px",
          backgroundColor: "white",
          border: "1px solid lightgray",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          padding: "24px"
        }}>
          <Empty />
          <Paragraph>
            Você está tentando uma rota que não conheço.<br/>
            Volte para a página de home clicando em{" "}
            <Link href="/">
              <Button type="link">Home</Button>
            </Link>
          </Paragraph>
        </Content>
      </Layout>
    </Layout>
  );
}