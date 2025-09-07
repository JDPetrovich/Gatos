import Style from "./home.module.css";
import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

function Home() {
  return (
    <Content className={Style.conteudo}>
      <Title level={2}>Bem-vindo ao Patinhas Unidas v1.0.0</Title>
      <Paragraph>
        Você pode Adotar e Resgatar um gatinho aqui.
      </Paragraph>
      <Paragraph>
        Se quiser também pode nos ajudar a manter toda essa operação.
      </Paragraph>
    </Content>
  );
}

export default Home;