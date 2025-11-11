import { useMemo, useState } from 'react';
import { Button, Card, List, Space, Table, Tag, Typography, message } from 'antd';
import { PlayCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { mockTelegramMessages, mockTelegramRules, mockTelegramSources } from '../../data/mockData';
import type { TelegramMessage } from '../../types';

export const TelegramAutomationPage = () => {
  const [lastExecution, setLastExecution] = useState<Date | null>(null);
  const [matches, setMatches] = useState<TelegramMessage[]>(mockTelegramMessages.slice(0, 1));
  const [loading, setLoading] = useState(false);

  const activeRules = useMemo(() => mockTelegramRules.filter((rule) => rule.active), []);

  const handleRunJob = () => {
    setLoading(true);
    message.loading('Ejecutando búsqueda en fuentes registradas...');
    setTimeout(() => {
      const deduped = mockTelegramMessages.filter((message, index, arr) => arr.findIndex((item) => item.id === message.id) === index);
      setMatches(deduped);
      setLastExecution(new Date());
      setLoading(false);
      message.success('Alertas creadas a partir de coincidencias (mock)');
    }, 1200);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={16}>
      <Card
        title="Automatización Telegram"
        extra={
          <Space>
            <Button icon={<SyncOutlined />} onClick={() => message.info('Actualización de fuentes (mock)')}>
              Sincronizar fuentes
            </Button>
            <Button type="primary" icon={<PlayCircleOutlined />} loading={loading} onClick={handleRunJob}>
              Ejecutar búsqueda
            </Button>
          </Space>
        }
      >
        <Typography.Paragraph type="secondary">
          Se registran canales confiables para monitorear menciones críticas. Las reglas de keywords generan alertas automáticas y evitan duplicados por message_id.
        </Typography.Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text strong>Fuentes registradas</Typography.Text>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={mockTelegramSources}
            renderItem={(source) => (
              <List.Item>
                <Card size="small" bordered>
                  <Typography.Text>{source.label}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {source.type.toUpperCase()} · Última sync: {new Date(source.lastSync).toLocaleString('es-AR')}
                  </Typography.Text>
                </Card>
              </List.Item>
            )}
          />
        </Space>
      </Card>

      <Card title="Reglas activas">
        <Table
          rowKey="id"
          dataSource={activeRules}
          pagination={false}
          columns={[
            { title: 'Keyword', dataIndex: 'keyword' },
            {
              title: 'Severidad',
              dataIndex: 'severity',
              render: (severity: string) => <Tag color={severity === 'high' ? 'red' : severity === 'medium' ? 'gold' : 'blue'}>{severity}</Tag>,
            },
            {
              title: 'Exclusiones',
              dataIndex: 'exclusions',
              render: (exclusions: string[]) => exclusions.length ? exclusions.join(', ') : '—',
            },
          ]}
        />
      </Card>

      <Card
        title="Resultados de la última búsqueda"
        extra={lastExecution && <Typography.Text type="secondary">Última ejecución: {lastExecution.toLocaleString('es-AR')}</Typography.Text>}
      >
        <List
          dataSource={matches}
          renderItem={(match) => (
            <List.Item key={match.id}>
              <List.Item.Meta
                title={match.text}
                description={`Fuente ${match.chatId} · ${new Date(match.capturedAt).toLocaleString('es-AR')}`}
              />
              {match.link && (
                <Button type="link" href={match.link} target="_blank">
                  Ver mensaje
                </Button>
              )}
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
};
