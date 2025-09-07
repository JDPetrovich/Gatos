import React, { useState } from "react";
import Style from "./cabecalho.module.css";
import { Layout, Typography, Drawer, Menu, Button } from "antd";
import { HeartOutlined, MenuOutlined, SmileOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

function Cabecalho() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const menuItems = [
    { label: "Adote", key: "adote", icon: <SmileOutlined /> },
    { label: "Faça uma Doação", key: "doacao", icon: <HeartOutlined /> },
    { label: "Quem Somos", key: "quem-somos", icon: <SmileOutlined /> },
    { label: "Contato", key: "contato", icon: <HeartOutlined /> },
  ];

  return (
    <Header className={Style.cabecalho}>
      <div className={Style.logoSection}>
        <HeartOutlined className={Style.logoIcon} />
        <Title level={3} className={Style.title}>
          Patinhas Unidas
        </Title>
      </div>

      {/* Desktop menu */}
      <div className={Style.desktopMenu}>
        {menuItems.map((item) => (
          <span key={item.key} className={Style.menuItem}>
            {item.icon} {item.label}
          </span>
        ))}
      </div>

      {/* Mobile menu icon */}
      <Button className={Style.mobileMenu} type="text" onClick={showDrawer}>
        <MenuOutlined />
      </Button>

      {/* Drawer for mobile */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className={Style.drawerMenu}
      >
        <Menu
          items={menuItems}
          mode="vertical"
          onClick={closeDrawer}
        />
      </Drawer>
    </Header>
  );
}

export default Cabecalho;
