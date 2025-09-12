"use client";

import Style from "./App.module.css";
import { Layout } from "antd";
import Cabecalho from "./components/cabecalho/cabecalho";
import Rodape from "./components/rodape/rodape";
import Home from "./home/home";

export default function Page() {
  return (
    <Layout className={Style.leiaute}>
      <Layout>
        <Cabecalho/>
        <Home />
        <Rodape />
      </Layout>
    </Layout>
  );
}