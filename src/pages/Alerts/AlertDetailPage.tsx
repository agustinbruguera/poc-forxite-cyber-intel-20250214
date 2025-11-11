import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertTimelineEntry } from '../../types';
import { mockAlerts, mockAssets } from '../../data/mockData';
import {
  Alert as AntdAlert,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Flex,
  Row,
  Space,
  Steps,
  Tag,
  Typography,
  message,
} from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { StatusBadge } from '../../components/atoms/StatusBadge';

const severityColor = {
  high: 'red',
  medium: 'orange',
  low: 'blue',
};

const timelineToSteps = (timeline: AlertTimelineEntry[]) =>
  timeline.map((entry) => ({
    title: entry.action.replace('alert.', ''),
    description: (
      <Space direction="vertical" size={0}>
        <Typography.Text>{entry.actor}</Typography.Text>
        {entry.note && <Typography.Text type="secondary">{entry.note}</Typography.Text>}
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {new Date(entry.timestamp).toLocaleString('es-AR')}
        </Typography.Text>
      </Space>
    ),
  }));

export const AlertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const alert = useMemo<Alert | undefined>(() => mockAlerts.find((item) => item.id === id), [id]);

  if (!alert) {
    return <Empty description="Alerta no encontrada" />;
  }

  const handleStatusChange = (status: Alert['status']) => {
    message.success(`Estado actualizado a ${status} (simulado)`);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    message.success(`Exportación ${format.toUpperCase()} lista (simulada)`);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      <Flex justify="space-between" align="center">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Volver
        </Button>
        <Space>
          <Button icon={<FileTextOutlined />} onClick={() => handleExport('pdf')}>
            Exportar PDF
          </Button>
          <Button icon={<FileTextOutlined />} onClick={() => handleExport('csv')}>
            Exportar CSV
          </Button>
        </Space>
      </Flex>

      <AntdAlert
        message={alert.title}
        description={alert.description}
        type={alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info'}
        showIcon
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card title="Resumen" bordered>
            <Descriptions column={1} colon={false} labelStyle={{ fontWeight: 600 }}>
              <Descriptions.Item label="Estado">
                <StatusBadge status={alert.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Severidad">
                <Tag color={severityColor[alert.severity]}>{alert.severity.toUpperCase()}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Fuente">{alert.source}</Descriptions.Item>
              <Descriptions.Item label="Creación">
                {new Date(alert.createdAt).toLocaleString('es-AR')}
              </Descriptions.Item>
              <Descriptions.Item label="Última actualización">
                {new Date(alert.updatedAt).toLocaleString('es-AR')}
              </Descriptions.Item>
              <Descriptions.Item label="Activos relacionados">
                <Space wrap>
                  {alert.relatedAssets.map((assetId) => {
                    const asset = mockAssets.find((item) => item.id === assetId);
                    return asset ? <Tag key={asset.id}>{asset.label}</Tag> : null;
                  })}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Indicadores">
                <Space direction="vertical">
                  {alert.indicators.map((indicator) => (
                    <Typography.Text key={indicator}>{indicator}</Typography.Text>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Responsable">{alert.assignedTo ?? 'No asignada'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Acciones rápida" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="default"
                icon={<CheckCircleOutlined />}
                onClick={() => handleStatusChange('in_review')}
              >
                Marcar en revisión
              </Button>
              <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleStatusChange('closed')}>
                Cerrar alerta
              </Button>
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => message.warning('Marcado como falso positivo (simulado)')}
              >
                Falso positivo
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Timeline" bordered>
        <Steps
          direction="vertical"
          items={timelineToSteps(alert.timeline)}
        />
      </Card>
    </Space>
  );
};
