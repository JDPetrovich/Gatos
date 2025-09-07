import Style from "./rodape.module.css";
import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

function Rodape() {
  return (
    <Footer className={Style.rodape}>
      ©2025/{new Date().getFullYear()} Jaum! Todos os direitos reservados para João David Petrovich.
    </Footer>
  );
}

export default Rodape;

