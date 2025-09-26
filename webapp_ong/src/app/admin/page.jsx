"use client";

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Row, Col, Card, Spin, Typography, Badge, Collapse, List, message } from "antd";
import { FileTextOutlined, RollbackOutlined, MedicineBoxOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Rodape from "./../components/rodape/rodape";
import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin";
import styles from "./admin.module.css";

const { Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;

export default function AdminHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  const [resumo, setResumo] = useState({
    solicitacoes: 0,
    devolucoes: 0,
    vacinas: 0,
    resgates: 0,
  });
  const [detalhes, setDetalhes] = useState({
    solicitacoes: [],
    devolucoes: [],
    vacinas: [],
    resgates: [],
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Acesso negado. Por favor, faça o login.");
      router.replace("/admin/login");
    } else {
      setAutenticado(true);
      fetchResumo(token);
    }
  }, [router]);

  const fetchResumo = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/resumo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          message.error("Sua sessão expirou. Faça o login novamente.");
          sessionStorage.removeItem("token");
          router.replace("/admin/login");
          return;
        }
        throw new Error("Erro ao buscar dados");
      }

      const data = await res.json();

      setResumo({
        solicitacoes: data.solicitacoes?.length || 0,
        devolucoes: data.devolucoes?.length || 0,
        vacinas: data.vacinas?.length || 0,
        resgates: data.resgates?.length || 0,
      });

      setDetalhes({
        solicitacoes: data.solicitacoes || [],
        devolucoes: data.devolucoes || [],
        vacinas: data.vacinas || [],
        resgates: data.resgates || [],
      });
    } catch (err) {
      console.error(err);
      message.error("Não foi possível carregar os dados do painel.");
    } finally {
      setLoading(false);
    }
  };

  if (!autenticado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor:'#fff' }}>
        <Spin size="large" spinning={true} />
        <p style={{ marginTop: '16px', color: '#666666' }}>Verificando autenticação...</p>
      </div>
    );
  }

  const notificacoes = [
    {
      key: "solicitacoes",
      titulo: "Solicitações de Adoção",
      valor: resumo.solicitacoes,
      descricao: "Aguardando aprovação",
      cor: "blue",
      icone: <FileTextOutlined className={`${styles.cardIcon} ${styles.cardIconBlue}`} />,
    },
    {
      key: "devolucoes",
      titulo: "Devoluções",
      valor: resumo.devolucoes,
      descricao: "Ocorreram recentemente",
      cor: "red",
      icone: <RollbackOutlined className={`${styles.cardIcon} ${styles.cardIconRed}`} />,
    },
    {
      key: "vacinas",
      titulo: "Vacinas Pendentes",
      valor: resumo.vacinas,
      descricao: "Gatos precisam atualizar",
      cor: "orange",
      icone: <MedicineBoxOutlined className={`${styles.cardIcon} ${styles.cardIconOrange}`} />,
    },
    {
      key: "resgates",
      titulo: "Novos Resgates",
      valor: resumo.resgates,
      descricao: "Precisam avaliação inicial",
      cor: "green",
      icone: <PlusCircleOutlined className={`${styles.cardIcon} ${styles.cardIconGreen}`} />,
    },
  ];

  const handleItemClick = (item) => {
    message.info(`Você clicou em: ${item.nome || item.descricao}`);
  };

  return (
    <Layout className={styles.layout}>
      <SidebarAdmin />
      <Layout className={styles.contentLayout}>
        <Content className={styles.content}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" tip="Carregando notificações..." fullscreen />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {notificacoes.map((item) => (
                <Col xs={24} sm={12} md={6} key={item.key}>
                  <Card variant="outlined" className={styles.cardContainer}>
                    {item.icone}
                    <Text strong className={styles.cardTitle}>{item.titulo}</Text>
                    <Badge 
                      count={item.valor} 
                      className={`${styles.cardBadge} ${styles[`cardBadge${item.cor.charAt(0).toUpperCase() + item.cor.slice(1)}`]}`} 
                    />
                    <Text type="secondary" className={styles.cardDescription}>{item.descricao}</Text>
                    {detalhes[item.key]?.length > 0 && (
                      <Collapse className={styles.collapseContainer} ghost expandIconPosition="end">
                        <Panel header={`Detalhes (${detalhes[item.key].length})`} key="1">
                          <List
                            size="small"
                            bordered
                            dataSource={detalhes[item.key]}
                            renderItem={(registro) => (
                              <List.Item className={styles.listItem} onClick={() => handleItemClick(registro)}>
                                {registro.nome || registro.descricao}
                              </List.Item>
                            )}
                          />
                        </Panel>
                      </Collapse>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
        <Rodape />
      </Layout>
    </Layout>
  );
}