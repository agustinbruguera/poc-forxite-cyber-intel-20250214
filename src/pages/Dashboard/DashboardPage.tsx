import { Card, Col, List, Row, Timeline, Typography } from 'antd';
import { StatsRow } from '../../components/molecules/StatsRow';
import { mockAlerts, mockTelegramMessages, mockWebhookDeliveries } from '../../data/mockData';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import { RoleTag } from '../../components/atoms/RoleTag';

export const DashboardPage = () => {
  const highSeverity = mockAlerts.filter((alert) => alert.severity === 'high').length;
  const openAlerts = mockAlerts.filter((alert) => alert.status !== 'closed').length;
  const closedRate = Math.round((mockAlerts.filter((alert) => alert.status === 'closed').length / mockAlerts.length) * 100);
  const webhookSuccess = Math.round(
    (mockWebhookDeliveries.filter((delivery) => delivery.status === 'success').length / mockWebhookDeliveries.length) * 100,
  );

  const metrics = [
    {
      key: 'alerts_total',
      label: 'Alertas activas',
      value: openAlerts,
      description: 'Pendientes de revisión / cierre',
      trend: 12,
    },
    {
      key: 'alerts_high',
      label: 'Severidad alta',
      value: highSeverity,
      description: 'Casos críticos que requieren atención',
      trend: 5,
    },
    {
      key: 'alerts_closed',
      label: 'Tasa de cierre 7d',
      value: closedRate,
      unit: '%',
      description: 'Productividad del equipo de respuesta',
      trend: 8,
    },
    {
      key: 'webhooks',
      label: 'Webhooks exitosos',
      value: webhookSuccess,
      unit: '%',
      description: 'Integraciones operativas',
      trend: -2,
    },
  ];

  const recentAlerts = mockAlerts.slice(0, 3);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <StatsRow metrics={metrics} />
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Alertas recientes" bordered hoverable>
          <List
            itemLayout="vertical"
            dataSource={recentAlerts}
            renderItem={(alert) => (
              <List.Item key={alert.id} extra={<StatusBadge status={alert.status} />}>
                <List.Item.Meta
                  title={alert.title}
                  description={
                    <Typography.Text type="secondary">
                      {alert.category.toUpperCase()} · {new Date(alert.createdAt).toLocaleString('es-AR')}
                    </Typography.Text>
                  }
                />
                <Typography.Paragraph ellipsis={{ rows: 2 }}>{alert.description}</Typography.Paragraph>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Actividad del equipo" bordered hoverable>
          <Timeline
            items={mockAlerts
              .flatMap((alert) =>
                alert.timeline.map((event) => ({
                  color: event.action.includes('closed') ? 'green' : 'blue',
                  children: (
                    <Typography.Text>
                      <strong>{event.actor}</strong> · {event.action.replace('alert.', '')}
                      <br />
                      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(event.timestamp).toLocaleString('es-AR')}
                      </Typography.Text>
                    </Typography.Text>
                  ),
                })),
              )
              .slice(0, 6)}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Mensajes destacados en Telegram" bordered hoverable>
          <List
            dataSource={mockTelegramMessages.slice(0, 3)}
            renderItem={(message) => (
              <List.Item key={message.id}>
                <List.Item.Meta
                  title={message.text}
                  description={`Canal ${message.chatId} · ${new Date(message.capturedAt).toLocaleString('es-AR')}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Equipo" bordered hoverable>
          <List
            dataSource={recentAlerts.map((alert) => alert.assignedTo ?? 'Sin asignar')}
            renderItem={(assignee, index) => (
              <List.Item key={`${assignee}-${index}`}>
                <List.Item.Meta
                  title={assignee}
                  description={<RoleTag role={index === 0 ? 'admin' : 'analyst'} />}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};
