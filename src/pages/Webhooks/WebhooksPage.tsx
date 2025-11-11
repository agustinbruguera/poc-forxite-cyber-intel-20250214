import { useState } from 'react';
import { Button, Card, Checkbox, Form, Input, Space, Switch, Table, Tag, Typography, message } from 'antd';
import { SendOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { mockWebhookConfigs, mockWebhookDeliveries } from '../../data/mockData';

const eventOptions = [
  { label: 'Alerta creada', value: 'alert.created' },
  { label: 'Alerta actualizada', value: 'alert.updated' },
  { label: 'Alerta cerrada', value: 'alert.closed' },
];

export const WebhooksPage = () => {
  const [form] = Form.useForm();
  const [selectedWebhook, setSelectedWebhook] = useState(mockWebhookConfigs[0]);

  const handleSubmit = (values: unknown) => {
    console.log('Webhook actualizado (mock):', values);
    message.success('Configuración guardada (simulada)');
  };

  const handleTestDelivery = () => {
    message.loading('Probando webhook...');
    setTimeout(() => message.success('Entrega enviada (mock)'), 1000);
  };

  const deliveries = mockWebhookDeliveries.filter((delivery) => delivery.webhookId === selectedWebhook.id);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={16}>
      <Card title="Configuración de Webhook" bordered>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            name: selectedWebhook.name,
            targetUrl: selectedWebhook.targetUrl,
            secret: selectedWebhook.secret,
            events: selectedWebhook.events,
            isActive: selectedWebhook.isActive,
          }}
          onFinish={handleSubmit}
        >
          <Space size={24} direction="vertical" style={{ width: '100%' }}>
            <Form.Item name="name" label="Nombre" rules={[{ required: true }]}> 
              <Input placeholder="Canal o integración" />
            </Form.Item>
            <Form.Item name="targetUrl" label="URL" rules={[{ required: true, type: 'url' }]}> 
              <Input placeholder="https://" />
            </Form.Item>
            <Form.Item name="secret" label="Secreto" rules={[{ required: true }]}> 
              <Input.Password placeholder="Secreto para firmar payload (HMAC)" />
            </Form.Item>
            <Form.Item name="events" label="Eventos">
              <Checkbox.Group options={eventOptions} />
            </Form.Item>
            <Form.Item name="isActive" label="Activo" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>
                Guardar cambios
              </Button>
              <Button onClick={handleTestDelivery} icon={<SendOutlined />}>
                Enviar prueba
              </Button>
            </Space>
          </Space>
        </Form>
      </Card>

      <Card title="Historial de entregas" bordered>
        <Table
          rowKey="id"
          dataSource={deliveries}
          pagination={false}
          columns={[
            {
              title: 'Fecha',
              dataIndex: 'deliveredAt',
              render: (value: string) => new Date(value).toLocaleString('es-AR'),
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              render: (status: string) => (
                <Tag color={status === 'success' ? 'green' : 'red'}>{status}</Tag>
              ),
            },
            {
              title: 'Intentos',
              dataIndex: 'attempts',
            },
            {
              title: 'Payload',
              dataIndex: 'payloadPreview',
              render: (preview: string) => (
                <Typography.Text ellipsis={{ tooltip: preview }} style={{ maxWidth: 320 }}>
                  {preview}
                </Typography.Text>
              ),
            },
          ]}
        />
      </Card>
    </Space>
  );
};
