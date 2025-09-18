import Style from "./home.module.css";
import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Paragraph, Title, Text } = Typography;

function Home() {
  const fontes = [
    "gloria",
    "rocksalt",
    "indieflower",
    "shadows",
    "amatic",
    "patrick",
    "caveat",
    "covered",
    "reenie",
    "handlee",
    "architects",
    "sueellen",
    "chewy",
  ];

  return (
    <Content className={Style.conteudo}>
      <div className={Style.gridPreview}>
        {fontes.map((fonte) => (
          <div key={fonte} className={Style.gridItem}>
            <Paragraph className={`${Style[fonte]} ${Style.fontPreview}`}>
              Patinhas Unidas
            </Paragraph>
            <Text className={Style.fontName}>{fonte}</Text>
          </div>
        ))}
      </div>
    </Content>
  );
}

export default Home;