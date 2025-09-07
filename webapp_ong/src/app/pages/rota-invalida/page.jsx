"use client";

import Style from "./rotaInvalida.module.css";
import React from "react";
import Link from "next/link";
import { Layout, Typography, Empty, Button } from "antd";

const { Content } = Layout;
const { Paragraph } = Typography;

function RotaInvalida() {
  return (
    <Content className={Style.conteudo}>
      <Empty />
      <Paragraph>
        Você está tentando uma rota que não conheço.<br/>
        Volte para a página de home clicando em{" "}
        <Link href="/">
          <Button type="link">Home</Button>
        </Link>
      </Paragraph>
    </Content>
  );
}

export default RotaInvalida;